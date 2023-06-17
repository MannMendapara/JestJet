// React imports
import React, { useState, useEffect } from "react";
// firebase imports
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const AuthContext = React.createContext(''); // Creating an context

export function AuthProvider({children}) {

    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(false);

    async function signup(email, password) {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    async function login(email, password) {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    async function logout() {
        await auth.signOut();
        setUser(null)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const Store = {
        user,
        signup,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={Store}>
          {!loading && children}
        </AuthContext.Provider>
    );
}
