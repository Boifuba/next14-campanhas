import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "./usersAdmin.css";
import Image from "next/image";

import { auth } from "../../pages/api/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../pages/api/firebase";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((doc) => {
          if (doc.exists && doc.data().role === "admin") {
            // User is an admin, do nothing
          } else {
            // User is not an admin, redirect to home
            router.replace("/");
          }
        });
      } else {
        // User is not authenticated, redirect to home
        router.replace("/");
      }
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(userList);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="wrapper">
        <h1 className="title">Admins</h1>
        <div className="users">
          {users
            .filter((user) => user.role === "admin")
            .map((user) => (
              <Link
                className="user-box"
                href={`/usersAdmin/Painel/${user.id}`}
                key={user.id}
              >
                <Image
                  src={user.photoUrl}
                  height={100}
                  width={100}
                  alt={user.name}
                />
                <p>{user.name}</p>
              </Link>
            ))}
        </div>

        <h1 className="title">Contributors</h1>
        <div className="users">
          {users
            .filter((user) => user.role === "contributor")
            .map((user) => (
              <Link
                className="user-box"
                href={`/usersAdmin/Painel/${user.id}`}
                key={user.id}
              >
                <Image
                  src={user.photoUrl}
                  height={100}
                  width={100}
                  alt={user.name}
                />
                <p>{user.name}</p>
              </Link>
            ))}
        </div>

        <h1 className="title">Users</h1>
        <div className="users">
          {users
            .filter((user) => user.role === "user")
            .map((user) => (
              <Link
                className="user-box"
                href={`/usersAdmin/Painel/${user.id}`}
                key={user.id}
              >
                <Image
                  src={user.photoUrl}
                  height={100}
                  width={100}
                  alt={user.name}
                />
                <p>{user.name}</p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
export default UsersPage;
