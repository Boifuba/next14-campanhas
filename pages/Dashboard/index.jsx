import mongoose from "mongoose";
import BlogPost from "../../src/utilidades/Schema";
import { useState, useEffect } from "react";
import Image from "next/image";
import dotenv from "dotenv";
///IMPORT DO REDIRECT
import { useRouter } from "next/router";
import { auth, db } from "../api/firebase"; // Importe o auth e db do seu arquivo firebase
import { collection, doc, getDoc } from "firebase/firestore";
///IMPORT DO REDIRECT
import "./dashboard.css";
import "@/components/globals.css";

dotenv.config();

export async function getServerSideProps() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const result = await BlogPost.find({});
  return {
    props: { data: JSON.parse(JSON.stringify(result)) }, // result needs to be serializable
  };
}

export default function Dashboard({ data }) {
  const [posts, setPosts] = useState(data);

  /// ESSSA MERDA REDIRECIONA
  /// ESSSA MERDA REDIRECIONA
  /// ESSSA MERDA REDIRECIONA
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // O usuário está logado
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        const userData = docSnap.data();

        if (userData && userData.role === "admin") {
          // O usuário é um administrador
          setIsAdmin(true);
        } else {
          // O usuário não é um administrador
          router.push("/");
        }
      } else {
        // O usuário não está logado
        router.push("/");
      }
    });
  }, [router]);
  if (!isAdmin) {
    return null;
  }
  //TERMINA AQUI VERIFICAR O ROUTE
  //TERMINA AQUI VERIFICAR O ROUTE
  //TERMINA AQUI VERIFICAR O ROUTE
  //TERMINA AQUI VERIFICAR O ROUTE
  //TERMINA AQUI VERIFICAR O ROUTE

  const deletePost = async (id, title) => {
    if (confirm(`Tem certeza que quer apagar o post "${title}"?`)) {
      const res = await fetch("/rpg/api/deletePost", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setPosts((currentPosts) =>
          currentPosts.filter((post) => post._id !== id)
        );
      } else {
        console.error("Error deleting blog post");
      }
    }
  };

  const updateShow = async (slug, show) => {
    const res = await fetch(`/rpg/api/put/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ show }),
    });

    if (res.ok) {
      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.slug === slug ? { ...post, show } : post
        )
      );
    } else {
      console.error("Error updating show");
    }
  };

  return (
    <>
      <div className="editor-wrapper">
        <div className="button-container">
          <button className="button verde" onClick={() => router.push(`/Novo`)}>
            Novo
          </button>
        </div>
        <div className="editor-grid">
          {posts.map((item, index) => (
            <div key={index} className="editor-grid-item">
              <div className="editor-grid-img">
                <Image
                  src={"/rpg/" + item.img}
                  alt="Blog"
                  width={200}
                  height={200}
                />
              </div>
              <div className="editor-grid-text">
                <h1>{item.title}</h1>
                <p>{item.smalltext}</p>
                <div className="button-container">
                  <button
                    className="button vermelho"
                    onClick={() => deletePost(item._id, item.title)}
                  >
                    Deletar
                  </button>
                  <button
                    className="button azul"
                    onClick={() => router.push(`/Editor/${item.slug}`)}
                  >
                    Editar
                  </button>
                  <button
                    className={item.show ? "button vermelho" : "button verde"}
                    onClick={() => updateShow(item.slug, !item.show)}
                  >
                    {item.show ? "Esconder" : "Mostrar"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
