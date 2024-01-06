import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./Header.css";
import AccordionMenu from "./AccordionMenu";

export default function Header() {
  return (
    <>
      <header>
        <div className="header-wrapper">
          <div className="itens-position">
            <div className="header-logo">
              <Link href="/">
                <Image
                  src={"/rpg/boi.svg"}
                  alt="boi"
                  width={150}
                  height={150}
                  layout="fixed"
                  className="logo-image"
                />
              </Link>
            </div>
            <AccordionMenu className="accordion" />
          </div>
        </div>
      </header>
    </>
  );
}
