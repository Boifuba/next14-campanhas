import React from "react";
import "./Footer.css";
import Image from "next/image";
import Link from "next/link";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaDiscord } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <Link href="/">
            <Image
              src={"/rpg/boi.svg"}
              alt="boi"
              width={100}
              height={100}
              className="logo-image"
            />
          </Link>
          <div className="menu">
            <h2>Menu</h2>
            <li>
              <Link href="/">Página Inicial</Link>
            </li>
            <li>
              <Link href="/">Contatos</Link>
            </li>
            <li>Discord Bot </li>
          </div>
          <div className="contato">
            <h2>Contato</h2>
            <li>
              <BsFillTelephoneFill className="footer-icons" />
              +55 21 96667-2252
            </li>
            <li>
              <MdEmail className="footer-icons" />
              balduros@gmail.com
            </li>
            <li>
              <FaDiscord className="footer-icons" />
              <Link href={"https://discord.com/invite/223PjGAM2Y"}>
                Discord
              </Link>
            </li>
          </div>
          <div className="outro">
            <h2>Outros</h2>
            <li>
              <Link href="/Privacidade">Privacidade</Link>
            </li>
            <li>
              <Link href={"/FAQ"}>FAQ</Link>
            </li>
          </div>
          <div className="compartilhe">
            <h2>Siga nas redes</h2>
            <Link href={"/"}>
              <FaFacebook className="siga" />
            </Link>
            <Link href={"https://twitter.com/CampanhasdoBoi"}>
              <BsTwitterX className="siga" />
            </Link>
            <Link href={"https://discord.com/invite/223PjGAM2Y"}>
              <FaDiscord className="siga" />
            </Link>
            <Link href={"https://chat.whatsapp.com/FYYI0Rf5WRyA4zcYWZYTJE"}>
              <IoLogoWhatsapp className="siga" />
            </Link>
            <Link href={"/"}>
              <FaTelegram className="siga" />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
