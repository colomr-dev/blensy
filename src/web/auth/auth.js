// Importamos las funciones necesarias de Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { 
    getAuth, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';
import { firebaseConfig } from './.config.js';

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Función para iniciar sesión
export const loginWithEmail = async (email, password) => {
    console.log('Attempting login with:', email);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful:', userCredential.user);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
    }
};

// Función para registrar un nuevo usuario
export const registerWithEmail = async (email, password) => {
    console.log('Attempting registration with:', email);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Registration successful:', userCredential.user);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: error.message };
    }
};

// Función para cerrar sesión
export const logout = async () => {
    console.log('Attempting logout');
    try {
        await signOut(auth);
        console.log('Logout successful');
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error: error.message };
    }
};

// Función para observar cambios en el estado de autenticación
export const onAuthStateChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};