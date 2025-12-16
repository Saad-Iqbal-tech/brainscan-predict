import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getIdToken,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  idToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const token = await getIdToken(user);
        setIdToken(token);
        localStorage.setItem("idToken", token);
      } else {
        setIdToken(null);
        localStorage.removeItem("idToken");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const token = await getIdToken(result.user);
    setIdToken(token);
    localStorage.setItem("idToken", token);
  };

  const signup = async (email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const token = await getIdToken(result.user);
    setIdToken(token);
    localStorage.setItem("idToken", token);
  };

  const logout = async () => {
    await signOut(auth);
    setIdToken(null);
    localStorage.removeItem("idToken");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, idToken, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
