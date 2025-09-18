// Firebase configuration
// Note: Replace these with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
let app;
let auth;

try {
    // Initialize Firebase app
    app = firebase.initializeApp(firebaseConfig);
    
    // Initialize Firebase Authentication
    auth = firebase.auth();
    
    console.log('Firebase initialized successfully');
    
    // Set up auth state listener
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('User is signed in:', user.email);
            // User is signed in, redirect to dashboard if needed
            // You can uncomment the line below when you have a dashboard page
            // window.location.href = 'dashboard.html';
        } else {
            console.log('User is signed out');
        }
    });
    
} catch (error) {
    console.error('Error initializing Firebase:', error);
    
    // Show error message to user
    const errorElement = document.getElementById('loginError');
    if (errorElement) {
        errorElement.textContent = 'Firebase configuration error. Please check the configuration.';
        errorElement.classList.add('show');
    }
}

// Export for use in other scripts
window.firebaseApp = app;
window.firebaseAuth = auth;