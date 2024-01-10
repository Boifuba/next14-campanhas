"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import "./contato.css";
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";

export default function Contato() {
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setMessage(
      "Desculpa a encheção de saco, se você estiver vendo isso significa que eu não terminei essa funcionalidade, tente as redes sociais ao lado."
    );
  };

  return (
    <>
      <div className="wrapper">
        <h1>Chega mais!</h1>
        <p>
          Eu ia curtir demais a ideia de ter você postando aqui comigo, gostaria
          de usar esse espaço para compartilhar suas ideias conosco? Me mande
          uma mensagem ou me procure nesses redes, os links estão abaixo.
        </p>
        <div className="grid">
          <div className="coluna1">
            <h2>Nossas redes sociais</h2>
            <div className="share-buttons">
              <a
                href="https://chat.whatsapp.com/FYYI0Rf5WRyA4zcYWZYTJE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappIcon size={50} round={true} />
              </a>
              <a
                href="https://t.me/campanhasdoboi/1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TelegramIcon size={50} round={true} />
              </a>

              <a
                href="https://discord.gg/gNwN3njt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={"/rpg/" + "discord-icon.svg"}
                  alt="Share on Discord"
                  width={50}
                  height={50}
                />
              </a>
            </div>
          </div>
          <div className="coluna2">
            <h2>Envie uma mensagem</h2>
            <form>
              <input type="text" placeholder="Nome" />
              <input type="email" placeholder="Email" />
              <textarea placeholder="Mensagem"></textarea>
              <button type="button" onClick={handleClick}>
                Enviar
              </button>
              {message && <div className="msg">{message}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
