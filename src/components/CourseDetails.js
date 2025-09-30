import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetails.css';

const CourseDetails = () => {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(parseInt(id) || 1);
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  // Real course data from actual online platforms
  const realCourses = {
    1: {
      id: 1,
      title: "HTML, CSS & JavaScript Complete Course",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
      platform: "W3Schools + Mozilla MDN + FreeCodeCamp",
      duration: "Self-paced",
      level: "Beginner to Advanced",
      description:
        "Complete web development course combining resources from W3Schools tutorials, Mozilla MDN documentation, and FreeCodeCamp interactive lessons. Learn from the most trusted web development resources.",
      modules: [
        {
          title: "HTML5 Fundamentals (W3Schools)",
          platform: "W3Schools",
          url: "https://www.w3schools.com/html/",
          lessons: [
            {
              name: "HTML Introduction",
              url: "https://www.w3schools.com/html/html_intro.asp",
            },
            {
              name: "HTML Elements",
              url: "https://www.w3schools.com/html/html_elements.asp",
            },
            {
              name: "HTML Attributes",
              url: "https://www.w3schools.com/html/html_attributes.asp",
            },
            {
              name: "HTML Forms",
              url: "https://www.w3schools.com/html/html_forms.asp",
            },
            {
              name: "HTML5 Semantic Elements",
              url: "https://www.w3schools.com/html/html5_semantic_elements.asp",
            },
          ],
        },
        {
          title: "CSS3 Styling (W3Schools + CSS-Tricks)",
          platform: "W3Schools + CSS-Tricks",
          url: "https://www.w3schools.com/css/",
          lessons: [
            {
              name: "CSS Flexbox Guide",
              url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
            },
            {
              name: "CSS Grid Guide",
              url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
            },
            {
              name: "CSS Selectors",
              url: "https://www.w3schools.com/css/css_selectors.asp",
            },
            {
              name: "CSS Responsive",
              url: "https://www.w3schools.com/css/css_rwd_intro.asp",
            },
          ],
        },
        {
          title: "JavaScript Programming (Mozilla MDN)",
          platform: "Mozilla MDN",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
          lessons: [
            {
              name: "JavaScript Guide",
              url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
            },
            {
              name: "Functions",
              url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
            },
            {
              name: "Promises",
              url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
            },
            {
              name: "DOM API",
              url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
            },
          ],
        },
        {
          title: "Interactive Exercises (FreeCodeCamp)",
          platform: "FreeCodeCamp",
          url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
          lessons: [
            {
              name: "Responsive Web Design",
              url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
            },
            {
              name: "JavaScript Algorithms",
              url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
            },
          ],
        },
      ],
      practiceResources: [
        {
          name: "Codepen.io",
          description: "Online code editor",
          url: "https://codepen.io/",
        },
        {
          name: "JSFiddle",
          description: "Test JavaScript online",
          url: "https://jsfiddle.net/",
        },
      ],
    },
    2: {
      id: 2,
      title: "Python for Everybody Specialization",
      category: "Programming",
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop",
      platform: "GeeksforGeeks + Python.org + Real Python",
      duration: "Self-paced",
      level: "Beginner to Intermediate",
      description:
        "Comprehensive Python course using official Python documentation, GeeksforGeeks tutorials, and Real Python articles.",
      modules: [
        {
          title: "Python Basics (Python.org)",
          platform: "Python.org",
          url: "https://docs.python.org/3/tutorial/",
          lessons: [
            {
              name: "Python Tutorial",
              url: "https://docs.python.org/3/tutorial/",
            },
            {
              name: "Control Flow Tools",
              url: "https://docs.python.org/3/tutorial/controlflow.html",
            },
            {
              name: "Data Structures",
              url: "https://docs.python.org/3/tutorial/datastructures.html",
            },
          ],
        },
        {
          title: "Python Data Structures (GeeksforGeeks)",
          platform: "GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/python-data-structures/",
          lessons: [
            {
              name: "Python Lists",
              url: "https://www.geeksforgeeks.org/python-list/",
            },
            {
              name: "Python Dictionary",
              url: "https://www.geeksforgeeks.org/python-dictionary/",
            },
            {
              name: "Python Sets",
              url: "https://www.geeksforgeeks.org/python-sets/",
            },
          ],
        },
      ],
      practiceResources: [
        {
          name: "LeetCode Python",
          description: "Coding problems",
          url: "https://leetcode.com/problemset/all/",
        },
        {
          name: "HackerRank Python",
          description: "Python challenges",
          url: "https://www.hackerrank.com/domains/python",
        },
      ],
    },
    3: {
      id: 3,
      title: "Computer Networks & Protocols",
      category: "Computer Networking",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      platform: "Cisco Networking Academy + GeeksforGeeks",
      duration: "10 weeks",
      level: "Intermediate",
      description:
        "Comprehensive computer networking course covering TCP/IP, OSI model, routing protocols, and network security fundamentals.",
      modules: [
        {
          title: "Network Fundamentals",
          platform: "GeeksforGeeks + Cisco",
          url: "https://www.geeksforgeeks.org/computer-network-tutorials/",
          lessons: [
            {
              name: "OSI Model",
              url: "https://www.geeksforgeeks.org/layers-of-osi-model/",
            },
            {
              name: "TCP/IP Protocol Suite",
              url: "https://www.geeksforgeeks.org/tcp-ip-model/",
            },
            {
              name: "Network Topologies",
              url: "https://www.geeksforgeeks.org/types-of-network-topology/",
            },
            {
              name: "IP Addressing",
              url: "https://www.geeksforgeeks.org/ip-addressing-introduction-and-classful-addressing/",
            },
          ],
        },
        {
          title: "Routing and Switching",
          platform: "Cisco Networking Academy",
          url: "https://www.netacad.com/courses/networking",
          lessons: [
            {
              name: "Static Routing",
              url: "https://www.geeksforgeeks.org/static-routing/",
            },
            {
              name: "Dynamic Routing Protocols",
              url: "https://www.geeksforgeeks.org/dynamic-routing/",
            },
            {
              name: "VLAN Configuration",
              url: "https://www.geeksforgeeks.org/virtual-lan-vlan/",
            },
            {
              name: "Spanning Tree Protocol",
              url: "https://www.geeksforgeeks.org/spanning-tree-protocol-stp/",
            },
          ],
        },
        {
          title: "Network Security",
          platform: "GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/network-security/",
          lessons: [
            {
              name: "Firewalls",
              url: "https://www.geeksforgeeks.org/introduction-of-firewall-in-computer-network/",
            },
            {
              name: "VPN Technology",
              url: "https://www.geeksforgeeks.org/virtual-private-network-vpn-introduction/",
            },
            {
              name: "Network Attacks",
              url: "https://www.geeksforgeeks.org/types-of-network-attacks/",
            },
            {
              name: "Cryptography Basics",
              url: "https://www.geeksforgeeks.org/cryptography-introduction/",
            },
          ],
        },
        {
          title: "Wireless Networks",
          platform: "IEEE Standards + GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/wireless-communication/",
          lessons: [
            {
              name: "WiFi Standards",
              url: "https://www.geeksforgeeks.org/wifi-standards/",
            },
            {
              name: "Bluetooth Technology",
              url: "https://www.geeksforgeeks.org/bluetooth/",
            },
            {
              name: "Cellular Networks",
              url: "https://www.geeksforgeeks.org/cellular-network/",
            },
          ],
        },
      ],
      practiceResources: [
        {
          name: "Packet Tracer",
          description: "Cisco network simulator",
          url: "https://www.netacad.com/courses/packet-tracer",
        },
        {
          name: "GNS3",
          description: "Network emulation software",
          url: "https://www.gns3.com/",
        },
        {
          name: "Wireshark",
          description: "Network protocol analyzer",
          url: "https://www.wireshark.org/",
        },
      ],
    },
    4: {
      id: 4,
      title: "React JS Complete Tutorial",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      platform: "Official React Docs",
      duration: "Self-paced",
      level: "Intermediate",
      description: "Learn React from the official documentation and tutorial.",
      modules: [
        {
          title: "React Official Tutorial",
          platform: "React.dev",
          url: "https://react.dev/learn",
          lessons: [
            {
              name: "Quick Start",
              url: "https://react.dev/learn",
            },
            {
              name: "Thinking in React",
              url: "https://react.dev/learn/thinking-in-react",
            },
            {
              name: "Your First Component",
              url: "https://react.dev/learn/your-first-component",
            },
          ],
        },
      ],
      practiceResources: [
        {
          name: "CodeSandbox",
          description: "Online React environment",
          url: "https://codesandbox.io/s/react",
        },
        {
          name: "React DevTools",
          description: "Browser extension",
          url: "https://react.dev/learn/react-developer-tools",
        },
      ],
    },
    5: {
      id: 5,
      title: "Machine Learning Course",
      category: "AI & Machine Learning",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
      platform: "Andrew Ng's ML Course + Kaggle Learn",
      duration: "11 weeks",
      level: "Intermediate",
      description:
        "Learn machine learning from Andrew Ng's Stanford course and Kaggle Learn modules.",
      modules: [
        {
          title: "Machine Learning by Andrew Ng",
          platform: "Coursera",
          url: "https://www.coursera.org/learn/machine-learning",
          lessons: [
            {
              name: "Introduction",
              url: "https://www.coursera.org/learn/machine-learning",
            },
            {
              name: "Linear Regression",
              url: "https://www.coursera.org/learn/machine-learning",
            },
          ],
        },
      ],
      practiceResources: [
        {
          name: "Kaggle Competitions",
          description: "ML competitions",
          url: "https://www.kaggle.com/competitions",
        },
        {
          name: "Google Colab",
          description: "Free Jupyter notebooks",
          url: "https://colab.research.google.com/",
        },
      ],
    },
  };

  const currentCourse = realCourses[selectedCourse];

  useEffect(() => {
    setIsLoaded(true);
    if (id) {
      setSelectedCourse(parseInt(id));
    }
  }, [id]);

  const handleEnroll = () => {
    setShowEnrollModal(true);
  };

  const handleExternalLink = (url) => {
    window.open(url, "_blank");
  };

  if (!currentCourse) {
    return <div className="error-message">Course not found</div>;
  }

  return (
    <div className="course-details-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">MitrEdu</div>
          <nav className="nav">
            <ul className="nav-list">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/courses">Courses</a>
              </li>
              <li>
                <a href="#dashboard">Dashboard</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Course Selector */}
      <div className="course-selector">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(parseInt(e.target.value))}
          className="course-select"
        >
          <option value={1}>HTML, CSS & JavaScript Complete Course</option>
          <option value={2}>Python for Everybody Specialization</option>
          <option value={3}>Computer Networks & Protocols</option>
          <option value={4}>React JS Complete Tutorial</option>
          <option value={5}>Machine Learning Course</option>
        </select>
      </div>

      {/* Course Header */}
      <section className={`course-header ${isLoaded ? "loaded" : ""}`}>
        <div className="course-info">
          <h1 className="course-title">{currentCourse.title}</h1>
          <div className="platform-badge">{currentCourse.platform}</div>
          <div className="course-meta">
            <div className="meta-item">
              <div className="meta-label">Duration</div>
              <div className="meta-value">{currentCourse.duration}</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Level</div>
              <div className="meta-value">{currentCourse.level}</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Category</div>
              <div className="meta-value">{currentCourse.category}</div>
            </div>
          </div>
          <p className="course-description">{currentCourse.description}</p>
          <button className="enroll-button" onClick={handleEnroll}>
            Access Course Resources
          </button>
        </div>
        <div className="course-image-container">
          <img
            src={currentCourse.image}
            alt={currentCourse.title}
            className="course-image"
          />
        </div>
      </section>

      {/* Course Content */}
      <section className="course-content">
        {/* Modules Section */}
        <div className="modules-section">
          <h2 className="section-title">Course Modules & Resources</h2>
          <div className="module-tabs">
            {currentCourse.modules.map((module, index) => (
              <button
                key={index}
                className={`module-tab ${activeModule === index ? "active" : ""}`}
                onClick={() => setActiveModule(index)}
              >
                {module.title}
              </button>
            ))}
          </div>
          <div className="module-content">
            <div className="module-header">
              <h3 className="module-title">
                {currentCourse.modules[activeModule].title}
              </h3>
              <a
                href={currentCourse.modules[activeModule].url}
                target="_blank"
                rel="noopener noreferrer"
                className="platform-link"
              >
                Visit {currentCourse.modules[activeModule].platform}
              </a>
            </div>
            <div className="lessons-grid">
              {currentCourse.modules[activeModule].lessons.map(
                (lesson, index) => (
                  <div
                    key={index}
                    className="lesson-card"
                    onClick={() => handleExternalLink(lesson.url)}
                  >
                    <div className="lesson-name">{lesson.name}</div>
                    <div className="lesson-url">{lesson.url}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Practice Resources */}
        <div className="resources-section">
          <h2 className="section-title">Practice & Additional Resources</h2>
          <div className="resources-grid">
            {currentCourse.practiceResources.map((resource, index) => (
              <div
                key={index}
                className="resource-card"
                onClick={() => handleExternalLink(resource.url)}
              >
                <div className="resource-name">{resource.name}</div>
                <div className="resource-description">{resource.description}</div>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-link"
                >
                  Visit Resource →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Modal */}
      {showEnrollModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <span
                className="close-modal"
                onClick={() => setShowEnrollModal(false)}
              >
                &times;
              </span>
            </div>
            <h2 className="modal-title">Ready to Start Learning?</h2>
            <p className="modal-text">
              Click on any lesson or resource link to begin your learning journey
              with these trusted platforms!
            </p>
            <button
              className="modal-button"
              onClick={() => setShowEnrollModal(false)}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
