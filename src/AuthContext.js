// AuthContext.js (Optimized for faster loading)
import { createContext, useState, useEffect, useContext } from 'react';
import { 
  onAuthStateChanged, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { auth } from './firebase';
import { getUserProfile } from './components/firestoreUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 3000);

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        setUser(firebaseUser);
        
        // Fetch user profile from Firestore (don't block UI)
        getUserProfile(firebaseUser.uid)
          .then(profile => setUserProfile(profile))
          .catch(error => console.error("Error fetching user profile:", error));
      } else {
        // User is signed out
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
      clearTimeout(loadingTimeout);
    });

    // Cleanup subscription
    return () => {
      unsubscribe();
      clearTimeout(loadingTimeout);
    };
  }, []);

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    logout,
    isAuthenticated: !!user
  };

  // Show children immediately, don't wait for loading
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};