"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Link from "next/link";
import "./Header.css";
import AccordionMenu from "./AccordionMenu";

export default function Header() {
  const currentRoute = usePathname();

  return (
    <>
      <header>
        <div className="header-wrapper">
          <div className="itens-position">
            <div className="logo-container">
              <Link href="/">
                <Image
                  src={"/rpg/boi.svg"}
                  alt="boi"
                  width={150}
                  height={150}
                  className="logo-image"
                />
              </Link>
            </div>
            <div className="topnav">
              <Link
                href="/"
                className={
                  currentRoute === "/" ? "active" : "non-active-class-name"
                }
              >
                Home
              </Link>
              <Link
                href="/Bot"
                className={
                  currentRoute === "/Bot" ? "active" : "non-active-class-name"
                }
              >
                Bot
              </Link>
              <Link
                href="/Contato"
                className={
                  currentRoute === "/Contato"
                    ? "active"
                    : "non-active-class-name"
                }
              >
                Contatos
              </Link>
              <Link
                href="/Recrutamento"
                className={
                  currentRoute === "/Recrutamento"
                    ? "active"
                    : "non-active-class-name"
                }
              >
                Recrutamento
              </Link>
            </div>
            <AccordionMenu />
          </div>
        </div>
      </header>
    </>
  );
}
