import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Team from "@/components/Team";
import Jogos from "@/components/Jogos";
import { IoIosClose } from "react-icons/io";

export default function HomeClient({ items = [], tags = [] }) {
  const [selectedTag, setSelectedTag] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isShown, setIsShown] = useState(true);

  const itemsPerPage = 6; // post por página!

  const handleFilter = (tag) => {
    setSelectedTag(tag);
  };

  const filteredItems =
    selectedTag === "all"
      ? items
      : items.filter((item) => item.tags && item.tags.includes(selectedTag));

  const renderPagination = () => {
    const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

    return (
      <div className="pagination">
        {[...Array(pageCount)].map((_, i) => (
          <button
            key={i}
            className={`pagination-button ${
              currentPage === i + 1 ? "current" : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };
  return (
    <>
      <Head>
        <title>Campanhas do Boi</title>
        <link rel="icon" href="/rpg/boi.svg" />

        <meta
          name="description"
          content="Um Blog com conteúdo bacana para melhorar sua mesa de RPG e levar suas campanhas ao infinito em qualquer sistema."
        />
        <meta
          property="og:image"
          content={"https://campanhasdoboi.com.br/rpg/face.jpg"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/rpg/favicon/favicon.ico" />
        <meta name="author" content="Boifubá" />

        <meta property="og:title" content="Campanhas do Boi" />
        <meta
          property="og:description"
          content="Um Blog com conteúdo bacana para melhorar sua mesa de RPG e levar suas campanhas ao infinito em qualquer sistema."
        />

        <meta name="theme-color" content="#ea4f4c"></meta>
      </Head>
      <main>
        {isShown && (
          <div className="temporario">
            <a onClick={() => setIsShown(false)}>
              <IoIosClose className="close" />
            </a>
            <Link href={"/Recrutamento"}>
              <div className="main"> Estamos Recrutando!</div>
              <div className="main-text">
                E queremos você! cliquei aqui e saiba mais
              </div>
            </Link>
          </div>
        )}
        <div className="home-grid">
          <div className="grid-isotope-container">
            <div className="filters">
              <button
                className={`filter-button ${
                  selectedTag === "all" ? "active" : ""
                }`}
                onClick={() => handleFilter("all")}
              >
                All
              </button>
              {tags &&
                tags.map((tag, index) => (
                  <button
                    key={index}
                    className={`filter-button ${
                      selectedTag === tag ? "active" : ""
                    }`}
                    onClick={() => handleFilter(tag)}
                  >
                    {tag}
                  </button>
                ))}
            </div>
            <div className="grid-isotope">
              {filteredItems
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => (
                  <div
                    className={`grid-item ${item.tags.join(" ")}`}
                    key={index}
                  >
                    <Link href={`/Post/${item.slug}`} passHref>
                      <div>
                        <div className="home-grid-image">
                          <Image
                            src={"/rpg/" + item.img}
                            alt={item.title || "Imagem"}
                            width={400}
                            height={300}
                          />
                        </div>
                        <div className="home-grid-title">{item.title}</div>
                        <div className="home-grid-text">{item.smalltext}</div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
            {renderPagination()}
          </div>
          {/* <Team /> */}
          <br />
          {/* <Jogos /> */}
        </div>
      </main>
    </>
  );
}
