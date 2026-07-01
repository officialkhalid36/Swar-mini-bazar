/* ===========================
   FIREBASE CONFIGURATION
   =========================== */

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

// Initialize Firebase
let db = null;
let auth = null;
let storage = null;

function initializeFirebase() {
  try {
    // Load Firebase SDK from CDN
    if (!window.firebase) {
      console.error('Firebase SDK not loaded');
      return false;
    }
    
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
    storage = firebase.storage();
    
    console.log('Firebase initialized successfully');
    return true;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return false;
  }
}

// Export Firebase instances
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initializeFirebase, db, auth, storage };
}
