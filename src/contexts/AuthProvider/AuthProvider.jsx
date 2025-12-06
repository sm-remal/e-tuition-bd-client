import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { AuthContext } from '../AuthContext/AuthContext';
import { auth } from '../../firebase/firebase.init';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider();

    // Create User With Email & Password
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Sign-In With Email & Password 
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Google Sign-In
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    // Update Profile
    const updateUserProfile = (displayName, photoURL) => {
        // setLoading(true) 
        return updateProfile(auth.currentUser, { displayName, photoURL })
    }

    // Verification Email
    const verificationEmail = () => {
        setLoading(true);
        return sendEmailVerification()
    }

    // Forget Password
    const forgetPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    // Sign-Out User
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    // On Auth State Changed
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        setUser,
        createUser,
        signInUser,
        signOutUser,
        googleSignIn,
        updateUserProfile,
        verificationEmail,
        forgetPassword,
        loading,
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;