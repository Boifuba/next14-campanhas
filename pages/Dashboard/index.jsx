import mongoose from "mongoose";
import BlogPost from "../../src/utilidades/Schema";
import { useState, useEffect } from "react";
import Image from "next/image";
import dotenv from "dotenv";
///IMPORT DO REDIRECT
import { getAuth } from "firebase/auth"; // Adicione esta linha

import { useRouter } from "next/router";
import { auth, db } from "../api/firebase"; // Importe o auth e db do seu arquivo firebase
import { collection, doc, getDoc } from "firebase/firestore";
///IMPORT DO REDIRECT
import "./dashboard.css";
import "@/components/globals.css";

dotenv.config();

export async function getServerSideProps() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlPrser: true,
  });

  const result = await BlogPost.find({});
  return {
    props: { data: JSON.parse(JSON.stringify(result)) }, // result needs to be serializable
  };
}

export default function Dashboard({ data }) {
  const [posts, setPosts] = useState(data);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // O usuário está logado
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        const userData = docSnap.data();

        if (userData) {
          if (userData.role === "admin") {
            // O usuário é um administrador
            setIsAdmin(true);

            // Mostrar todos os posts
            setFilteredPosts(posts);
          } else if (userData.role === "contributor") {
            // O usuário é um contribuidor

            // Filtrar posts para mostrar apenas aqueles onde o campo author é igual ao displayName do usuário
            const userPosts = posts.filter(
              (post) => post.author === user.displayName
            );
            setFilteredPosts(userPosts);
          } else {
            // O usuário não é um administrador nem um contribuidor
            router.push("/");
          }
        }
      } else {
        // O usuário não está logado
        router.push("/");
      }
    });
  }, [router, posts]);
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
      <div className="wrapper">
        <h1>Leia antes de postar</h1>
        <p>
          Aqui você encontrará uma lista de todos os posts feitos por você com
          título, descrição e uma imagem. Por enquanto por questões técnicas eu{" "}
          <strong>preciso que a imagem seja enviada para mim</strong>. Os botões
          são as ações disponíveis:
          <ul>
            <li>Novo: Cria uma nova postagem.</li>
            <li>Deletar: Apaga toda a sua postagem</li>
            <li>Editar: Redireciona você para a edição da postagem.</li>
            <li>
              Mostrar: Vai estar em verde e se você clicar você publicar a
              postagem. (por enquanto não deve estar liberado)
            </li>
            <li>
              Esconder: vai estar em vermelho e serve para retirar a postagem do
              ar somente e sem deletar (Por enquanto não está liberado)
            </li>

            <h2>
              Eu sei que o blog ainda tem problemas, qualquer coisa mesmoo que
              ache uma bobagem, por favor me avise.
            </h2>
          </ul>{" "}
        </p>
      </div>
      <div className="editor-wrapper">
        <div className="button-container">
          <button className="button verde" onClick={() => router.push(`/Novo`)}>
            Novo
          </button>
        </div>
        <div className="editor-grid">
          {filteredPosts.map((item, index) => (
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
