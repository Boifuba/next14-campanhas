import React, { useEffect, useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import Image from "next/image";
import outrosPosts from "../utilidades/outros.json";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default function PostsGroupedByMonth() {
  const [posts, setPosts] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    fetch("/rpg/api/get/get")
      .then((response) => response.json())
      .then((data) => {
        // Combina os posts da API com os posts do arquivo JSON
        const allPosts = [...data.data, ...outrosPosts.items];
        setPosts(allPosts);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  if (!posts || posts.length === 0) {
    return <div>Loading...</div>;
  }

  // Agrupar posts por mês e ano
  const groupedPosts = posts.reduce((groups, post) => {
    const date = new Date(post.date);
    const monthYearKey = `${date.getFullYear()}-${date.getMonth()}`;

    if (!groups[monthYearKey]) {
      groups[monthYearKey] = [];
    }

    groups[monthYearKey].push(post);

    return groups;
  }, {});

  // Converta o objeto em um array e ordene-o
  const sortedGroupedPosts = Object.entries(groupedPosts).sort((a, b) => {
    const dateA = new Date(a[0].split("-")[0], a[0].split("-")[1]);
    const dateB = new Date(b[0].split("-")[0], b[0].split("-")[1]);
    return dateA - dateB;
  });

  return (
    <div className="indice-por-mes">
      <h2>Arquivo</h2>
      {sortedGroupedPosts.map(([monthYear, posts]) => {
        // Converta a chave de volta para o formato de mês e ano
        const date = new Date(monthYear.split("-")[0], monthYear.split("-")[1]);
        const formattedMonthYear = `${capitalizeFirstLetter(
          date.toLocaleString("pt-BR", { month: "long" })
        )} de ${date.getFullYear()}`;

        return (
          <div key={formattedMonthYear}>
            <p
              className="p-title-folder"
              onClick={() =>
                setSelectedMonth(
                  selectedMonth === formattedMonthYear
                    ? null
                    : formattedMonthYear
                )
              }
            >
              {selectedMonth === formattedMonthYear ? (
                <FaFolderOpen className="folder-icon" />
              ) : (
                <FaFolder className="folder-icon" />
              )}
              {formattedMonthYear}
            </p>
            {selectedMonth === formattedMonthYear &&
              posts.map((post) => (
                <div key={post._id}>
                  <a href={`/rpg/Post/${post.slug}`}>
                    <p className="p-title">
                      <Image
                        className="img-post"
                        src={"/rpg/" + post.img}
                        width={160}
                        height={100}
                        alt=""
                      />
                      {post.title}
                    </p>
                    <hr />
                  </a>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
}
