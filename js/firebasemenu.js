  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  import {getFirestore,collection, addDoc, getDocs,getCountFromServer, deleteDoc, 
    doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDagKY6yZKX9hUAOYIxsc3f39zS4W15M4Q",
    authDomain: "proyecto-lic-b5390.firebaseapp.com",
    projectId: "proyecto-lic-b5390",
    storageBucket: "proyecto-lic-b5390.appspot.com",
    messagingSenderId: "854176370000",
    appId: "1:854176370000:web:2092115f1b0be1ec4ef055"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //Trabajo 
  const db=getFirestore()

  export const saveProduct=(product)=>{
    addDoc(collection(db,'products'),product);
  }

  export const getProducts=()=>getDocs(collection(db,'products'))

  export const getProduct=(id)=>getDoc(doc(db,'products',id))

  export const getProductListSize=async()=>{
    const products = collection(db, "products");
    const snapshot = await getCountFromServer(products);
    return snapshot.data().count;
  }

export const deleteProduct=(id)=> deleteDoc(doc(db,'products',id))

export const updateProduct=(id, newFields)=>updateDoc(doc(db,'products',id), newFields)


