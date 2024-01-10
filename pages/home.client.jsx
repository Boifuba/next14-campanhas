// Home.client.jsx
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
export default function HomeClient({ items = [], tags = [] }) {
  const [selectedTag, setSelectedTag] = useState("all");

  const handleFilter = (tag) => {
    setSelectedTag(tag);
  };

  const filteredItems =
    selectedTag === "all"
      ? items
      : items.filter((item) => item.tags && item.tags.includes(selectedTag));

  return (
    <>
      <Head>
        <title>Campanhas do Boi</title>
        <link rel="icon" href="/rpg/boi.svg" />
        <link rel="preload" href="/rpg/silver.jpg" as="image" />
        <link rel="preload" href="/rpg/gerador.jpg" as="image" />
        <meta
          name="description"
          content="Um Blog com conteúdo bacana para melhorar sua mesa de RPG e levar suas campanhas ao infinito em qualquer sistema."
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/rpg/favicon/favicon.ico" />
        <meta name="keywords" content="mesa de rpg, rpg de mesa, rpg, GURPS" />
        <meta name="author" content="Boifubá" />

        <meta property="og:title" content="Campanhas do Boi" />
        <meta
          property="og:description"
          content="Um Blog com conteúdo bacana para melhorar sua mesa de RPG e levar suas campanhas ao infinito em qualquer sistema."
        />
        <meta
          property="og:image"
          content="https://campanhasdoboi.com.br/rpg/boi.svg"
        />

        <meta property="og:type" content="website" />
      </Head>
      <main>
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
              {filteredItems &&
                filteredItems.map((item, index) => (
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
          </div>
        </div>
      </main>
    </>
  );
}
