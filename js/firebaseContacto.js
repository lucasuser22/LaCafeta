const firebaseConfig = {
    apiKey: "AIzaSyAJtLHTRL5i9yNVhItX-QKRwZ9kn7-kgNw",
    authDomain: "prueba-contacto-5ad1d.firebaseapp.com",
    projectId: "prueba-contacto-5ad1d",
    storageBucket: "prueba-contacto-5ad1d.appspot.com",
    messagingSenderId: "68310738750",
    appId: "1:68310738750:web:ae0147b4fdf7b18239ee6f",
    measurementId: "G-6X5SCSGGN7"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
let db = firebase.firestore();