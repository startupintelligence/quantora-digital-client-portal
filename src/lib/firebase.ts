import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Web App configuration. This is public client configuration,
// not a service-account credential. Protect data with Authentication and Rules.
const firebaseConfig = {
  apiKey: "AIzaSyCTTQ1bpbBneOIxME8Y-7Yaux9q6tp9McM",
  authDomain: "quantora-digital-client-portal.firebaseapp.com",
  projectId: "quantora-digital-client-portal",
  storageBucket: "quantora-digital-client-portal.firebasestorage.app",
  messagingSenderId: "854762041996",
  appId: "1:854762041996:web:280a307aaf58599e3281a9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);