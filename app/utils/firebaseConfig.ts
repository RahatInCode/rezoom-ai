// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
authDomain: process.env.NEXT_PUBLIC_FIREBASE_authDomain,
projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
storageBucket: process.env.NEXT_PUBLIC_FIREBASE_storageBucket,
messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
appId: process.env.NEXT_PUBLIC_FIREBASE_appId,
measurementId: process.env.NEXT_PUBLIC_FIREBASE_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export const  auth =  getAuth(app)
export { analytics };