import { getDatabase } from "firebase/database";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk8cjeDGQDjE62MUjUbcHUMQWvoY8FVSI",
  authDomain: "paani-41194.firebaseapp.com",
  databaseURL: "https://paani-41194-default-rtdb.firebaseio.com",
  projectId: "paani-41194",
  storageBucket: "paani-41194.appspot.com",
  messagingSenderId: "703676644394",
  appId: "1:703676644394:web:a04ed455ffb826ef6ed753",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
