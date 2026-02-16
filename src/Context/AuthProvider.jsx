import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import  auth  from './../Firebase/Firebase.config';
import axios from "axios";




const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('')
  const [userStatus,setUserStatus] = useState()

 
  const createUserWithEmailAndPasswordFunc = (email, password,) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password );
  };

 
  const updateProfileFunc = (displayName, mainphotoURL) => {
    return updateProfile(auth.currentUser, { displayName, mainphotoURL });
  };

  
  const signInWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  
  const googleLoginFunc = () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    return signInWithPopup(auth, provider);
  };


  const signoutUserFunc = () => {
    setLoading(true);
    return signOut(auth);
  };

  

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return
     axios.get(`http://localhost:3000/user/role/${user.email}`)
        .then(res => {
          setRole(res.data.role)
          setUserStatus(res.data.status)
        })
  }, [user])
  console.log(role)

  const authInfo = {
    user,
    loading,
    setUser,
    setLoading,
    createUserWithEmailAndPasswordFunc,
    updateProfileFunc,
    signInWithEmailAndPasswordFunc,
    googleLoginFunc,
    signoutUserFunc,
    role,
    userStatus
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
