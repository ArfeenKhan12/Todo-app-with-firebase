import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
 import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"


const firebaseConfig = {
    apiKey: "AIzaSyBMYEdIZ4w-Qp8mYcGVfd2cFgxkdpz3sTY",
    authDomain: "todoapp-with-firestore-12aef.firebaseapp.com",
    projectId: "todoapp-with-firestore-12aef",
    storageBucket: "todoapp-with-firestore-12aef.appspot.com",
    messagingSenderId: "70768424123",
    appId: "1:70768424123:web:a9d0ce62f2b4ae8a69a59e",
    measurementId: "G-X2MK17P5CF"
  };

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  