// firestoreUtils.js
import { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  updateDoc, 
  arrayUnion, 
  collection,
  serverTimestamp,
  query,
  where
} from "firebase/firestore";
import { db } from "../firebase";

// ==================== USER MANAGEMENT ====================

/**
 * Create user profile in Firestore after signup
 */
export const createUserProfile = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), {
      name: userData.name || userData.email.split('@')[0],
      email: userData.email,
      createdAt: serverTimestamp(),
      enrolledCourses: []
    });
    console.log("User profile created successfully");
    return true;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

/**
 * Get user profile data
 */
export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// ==================== COURSE ENROLLMENT ====================

/**
 * Enroll user in a course
 */
export const enrollInCourse = async (userId, courseId) => {
  try {
    // Add course to user's enrolled courses
    await updateDoc(doc(db, "users", userId), {
      enrolledCourses: arrayUnion(courseId)
    });

    // Initialize progress tracking for this course
    await setDoc(doc(db, "userProgress", userId, "courses", courseId), {
      completedLessons: [],
      percentComplete: 0,
      startedAt: serverTimestamp(),
      lastAccessedAt: serverTimestamp(),
      totalLessons: 0 // Will be updated when course structure is known
    });

    console.log("Enrolled in course successfully");
    return true;
  } catch (error) {
    console.error("Error enrolling in course:", error);
    throw error;
  }
};

/**
 * Check if user is enrolled in a course
 */
export const isEnrolledInCourse = async (userId, courseId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const enrolledCourses = userDoc.data().enrolledCourses || [];
      return enrolledCourses.includes(courseId);
    }
    return false;
  } catch (error) {
    console.error("Error checking enrollment:", error);
    return false;
  }
};

// ==================== COURSE PROGRESS ====================

/**
 * Get user's progress for a specific course
 */
export const getCourseProgress = async (userId, courseId) => {
  try {
    const progressDoc = await getDoc(
      doc(db, "userProgress", userId, "courses", courseId)
    );
    if (progressDoc.exists()) {
      return progressDoc.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting course progress:", error);
    throw error;
  }
};

/**
 * Get all enrolled courses with progress for a user
 */
export const getEnrolledCoursesWithProgress = async (userId) => {
  try {
    // Get user's enrolled course IDs
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      return [];
    }

    const enrolledCourseIds = userDoc.data().enrolledCourses || [];
    
    // Get progress for each course
    const coursesWithProgress = await Promise.all(
      enrolledCourseIds.map(async (courseId) => {
        const progressDoc = await getDoc(
          doc(db, "userProgress", userId, "courses", courseId)
        );
        return {
          courseId: parseInt(courseId),
          progress: progressDoc.exists() ? progressDoc.data() : null
        };
      })
    );

    return coursesWithProgress;
  } catch (error) {
    console.error("Error getting enrolled courses:", error);
    throw error;
  }
};

/**
 * Update lesson completion
 */
export const updateLessonCompletion = async (userId, courseId, lessonId, totalLessons) => {
  try {
    const progressRef = doc(db, "userProgress", userId, "courses", courseId);
    const progressDoc = await getDoc(progressRef);
    
    if (progressDoc.exists()) {
      const currentData = progressDoc.data();
      const completedLessons = currentData.completedLessons || [];
      
      // Add lesson if not already completed
      if (!completedLessons.includes(lessonId)) {
        const updatedLessons = [...completedLessons, lessonId];
        const percentComplete = Math.round((updatedLessons.length / totalLessons) * 100);
        
        await updateDoc(progressRef, {
          completedLessons: arrayUnion(lessonId),
          percentComplete: percentComplete,
          lastAccessedAt: serverTimestamp(),
          totalLessons: totalLessons
        });
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error updating lesson completion:", error);
    throw error;
  }
};

// ==================== QUIZ MANAGEMENT ====================

/**
 * Save quiz attempt
 */
export const saveQuizAttempt = async (userId, quizId, quizData) => {
  try {
    const quizRef = doc(db, "quizAttempts", userId, "quizzes", quizId);
    const quizDoc = await getDoc(quizRef);

    const attemptData = {
      score: quizData.score,
      totalQuestions: quizData.totalQuestions,
      answers: quizData.answers,
      attemptedAt: serverTimestamp()
    };

    if (quizDoc.exists()) {
      // Update existing quiz attempts
      const existingData = quizDoc.data();
      const attempts = existingData.attempts || [];
      const bestScore = Math.max(existingData.bestScore || 0, quizData.score);

      await updateDoc(quizRef, {
        attempts: [...attempts, attemptData],
        bestScore: bestScore,
        lastAttemptDate: serverTimestamp(),
        totalAttempts: attempts.length + 1
      });
    } else {
      // Create new quiz attempt record
      await setDoc(quizRef, {
        quizId: quizId,
        attempts: [attemptData],
        bestScore: quizData.score,
        lastAttemptDate: serverTimestamp(),
        totalAttempts: 1
      });
    }

    console.log("Quiz attempt saved successfully");
    return true;
  } catch (error) {
    console.error("Error saving quiz attempt:", error);
    throw error;
  }
};

/**
 * Get all quiz attempts for a user
 */
export const getUserQuizAttempts = async (userId) => {
  try {
    const quizzesRef = collection(db, "quizAttempts", userId, "quizzes");
    const querySnapshot = await getDocs(quizzesRef);
    
    const quizAttempts = [];
    querySnapshot.forEach((doc) => {
      quizAttempts.push({
        quizId: doc.id,
        ...doc.data()
      });
    });

    return quizAttempts;
  } catch (error) {
    console.error("Error getting quiz attempts:", error);
    throw error;
  }
};

/**
 * Get quiz attempts for a specific quiz
 */
export const getQuizAttempts = async (userId, quizId) => {
  try {
    const quizDoc = await getDoc(
      doc(db, "quizAttempts", userId, "quizzes", quizId)
    );
    if (quizDoc.exists()) {
      return quizDoc.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting quiz attempts:", error);
    throw error;
  }
};

// ==================== DASHBOARD DATA ====================

/**
 * Get complete dashboard data for a user
 */
export const getDashboardData = async (userId) => {
  try {
    const [userProfile, coursesWithProgress, quizAttempts] = await Promise.all([
      getUserProfile(userId),
      getEnrolledCoursesWithProgress(userId),
      getUserQuizAttempts(userId)
    ]);

    return {
      userProfile,
      coursesWithProgress,
      quizAttempts
    };
  } catch (error) {
    console.error("Error getting dashboard data:", error);
    throw error;
  }
};