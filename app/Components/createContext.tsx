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
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebaseConfig";
import { FirebaseError } from "firebase/app";

type AuthContextType = {
  user: User | null;
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
  };

  //reset password
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
      alert(`Welcome ${result.user.displayName || "User"}`);
    } catch (err) {
      const error = err as FirebaseError; // Type-safe
      console.error("Google login error:", error);
      alert("Google login failed: " + error.message);
    }
  };

  // Track user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <RootContext.Provider
      value={{ user, loading, signup, login, logout, setUser, sendVerificationEmail, googleLogin, resetPassword }}
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
