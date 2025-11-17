
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import { auth, db } from "../config/firebase";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";



import { useLoading } from "../context/LoadingContext";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const { showLoading, hideLoading } = useLoading();

    useEffect(() => {

        showLoading && showLoading("Checking authentication...");

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const userDocRef = doc(db, "users", firebaseUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();

                        setUser({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            displayName: firebaseUser.displayName,
                            photoURL: firebaseUser.photoURL,
                            ...userData,
                        });
                    } else {

                        setUser({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }

            setAuthLoading(false);
            hideLoading && hideLoading();
        });

        return () => unsubscribe();
    }, []);


    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const signup = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);


    const value = {
        user,
        authLoading,
        login,
        signup,
        logout,
    };


    if (authLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
