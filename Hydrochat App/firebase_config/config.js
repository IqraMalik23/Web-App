import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAk8cjeDGQDjE62MUjUbcHUMQWvoY8FVSI",
  authDomain: "paani-41194.firebaseapp.com",
  projectId: "paani-41194",
  storageBucket: "paani-41194.appspot.com",
  messagingSenderId: "703676644394",
  appId: "1:703676644394:web:a04ed455ffb826ef6ed753",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
const db = getDatabase();

export { auth, provider, storage, db };
