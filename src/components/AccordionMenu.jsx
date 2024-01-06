"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaHome, FaRegEdit } from "react-icons/fa";
import { SiDiscord } from "react-icons/si";
import { BsCalculator } from "react-icons/bs";
import { GrContact } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";

import { app, db } from "../../pages/api/firebase";

const AccordionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const menuRef = useRef();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        } else {
          await setDoc(userRef, {
            role: "user",
            name: user.displayName,
            fantasyName: "",
            photoUrl: user.photoURL,
            intro: "",
            email: user.email,
          });
          setUserRole("user");
        }
      } else {
        setUserRole(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);

      const docRef = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(`User role: ${docSnap.data().role}`);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="accordion-menu" ref={menuRef}>
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {user ? (
          <>
            <Image
              src={user.photoURL}
              alt="User profile"
              width={80}
              height={80}
              className="user-profile"
            />
            <span className="logged-name">{user.displayName}</span>
          </>
        ) : (
          <FaBars className="fa-bars" />
        )}
      </div>
      {isOpen && (
        <div className="menu-links">
          <Link href="/">
            <FaHome className="icon" />
            Página Inicial
          </Link>
          <Link href="/Bot">
            <SiDiscord className="icon" />
            Discord Bot
          </Link>
          <Link href="/Bot">
            <BsCalculator className="icon" />
            Calculadoras
          </Link>
          <Link href="/Contato">
            <GrContact className="icon" />
            Contatos
          </Link>

          {userRole === "admin" && (
            <Link href="/usersAdmin">
              <RiAdminFill className="icon" />
              Admin Page
            </Link>
          )}
          {userRole === "admin" && (
            <Link href="/Dashboard">
              <RiAdminFill className="icon" />
              Dashboard{" "}
            </Link>
          )}
          {user && (
            <Link href={`/usersAdmin/Painel/${user.uid}`}>
              <FaRegEdit className="icon" />
              Edit Profile
            </Link>
          )}
          {user ? (
            <a onClick={handleSignOut}>
              <VscSignOut className="icon" />
              Deslogar
            </a>
          ) : (
            <a onClick={handleLogin}>
              <VscSignOut className="icon" />
              Logar
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default AccordionMenu;
