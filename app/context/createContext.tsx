"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  getIdToken,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebaseConfig";
import { FirebaseError } from "firebase/app";

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  sendVerificationEmail: () => Promise<void>;
  googleLogin: () => Promise<void>;
   resetPassword: (email: string) => Promise<void>;
   
};

const RootContext = createContext<AuthContextType | undefined>(undefined);

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // signup
  const signup = async (email: string, password: string, name?: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
    if (name && auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name });
      setUser({ ...auth.currentUser });
    }

    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      alert("Verification email sent! Please check your inbox.");
    }
  };

  // Login
  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setAccessToken(null);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  // send verification email again
  const sendVerificationEmail = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      alert("Verification email sent again!");
    }
  };
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // set user in context
      const token = await getIdToken(result.user); // ✅ accessToken নেয়া হলো
      setAccessToken(token);
      alert(`Welcome ${result.user.displayName || "User"}`);
    } catch (err) {
      const error = err as FirebaseError; // Type-safe
      console.error("Google login error:", error);
      alert("Google login failed: " + error.message);
    }
  };

  // Track user state
  // ✅ Track user state & get accessToken
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const token = await getIdToken(currentUser);
        setAccessToken(token);
        
      } else {
        setAccessToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  return (
    <RootContext.Provider
      value={{accessToken, user, loading, signup, login, logout, setUser, sendVerificationEmail, googleLogin , resetPassword}}
    >
      {children}
    </RootContext.Provider>
  );
};

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error("useRootContext must be used within RootProvider");
  }
  return context;
};
