import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { firebaseConfig } from './.config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// DOM Elements
const googleBtn = document.getElementById('googleSignIn');
const emailSignInBtn = document.getElementById('emailSignIn');
const emailSignUpBtn = document.getElementById('emailSignUp');
const signOutBtn = document.getElementById('signOut');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const userInfo = document.getElementById('userInfo');
const userData = document.getElementById('userData');

// Auth State Observer
onAuthStateChanged(auth, (user) => {
    if (user) {
        userInfo.style.display = 'block';
        userData.textContent = JSON.stringify(user, null, 2);
    } else {
        userInfo.style.display = 'none';
        userData.textContent = '';
    }
});

// Google Sign In
googleBtn.addEventListener('click', async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.error('Google sign in error:', error);
    }
});

// Email Sign In
emailSignInBtn.addEventListener('click', async () => {
    try {
        await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    } catch (error) {
        console.error('Email sign in error:', error);
    }
});

// Email Sign Up
emailSignUpBtn.addEventListener('click', async () => {
    try {
        await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    } catch (error) {
        console.error('Email sign up error:', error);
    }
});

// Sign Out
signOutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Sign out error:', error);
    }
});