// Importamos las funciones necesarias de Firebase usando las URLs del CDN
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { 
    getAuth, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';
import { firebaseConfig } from './.config.js';

console.log('Initializing Firebase with config:', firebaseConfig);

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configurar el proveedor de Google
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Funciones de autenticación
const loginWithGoogle = async () => {
    console.log('Attempting Google login...');
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Google login successful:', result.user);
        return { 
            success: true, 
            user: result.user
        };
    } catch (error) {
        console.error('Google login error:', error);
        return { 
            success: false, 
            error: error.message
        };
    }
};

const loginWithEmail = async (email, password) => {
    console.log('Attempting email login...');
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Email login successful:', userCredential.user);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Email login error:', error);
        return { success: false, error: error.message };
    }
};

const registerWithEmail = async (email, password) => {
    console.log('Attempting registration...');
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Registration successful:', userCredential.user);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: error.message };
    }
};

const logout = async () => {
    console.log('Attempting logout...');
    try {
        await signOut(auth);
        console.log('Logout successful');
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error: error.message };
    }
};

const onAuthStateChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

// Exportar todas las funciones
export {
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
    onAuthStateChange
};

// Log para verificar que el módulo se cargó correctamente
console.log('Auth module loaded successfully');