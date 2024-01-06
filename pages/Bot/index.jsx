import Image from "next/image";
import "./Bot.css";
import "../../src/components/globals.css";
import Link from "next/link";

export default function Bot() {
  return (
    <>
      <main>
        <div className="wrapper">
          <div className="bot-title">Discord Bot para GURPS</div>
          <div className="columns-2">
            <div className="logo-column">
              <a href="https://discord.gg/S7JKXDyY">
                <Image
                  className="logo"
                  src={"/rpg/logobranca.png"}
                  alt="Share on Discord"
                  width={150}
                  height={150}
                />{" "}
              </a>
              <div className="logo-title">Estevão</div>
            </div>
            <div className="text-column">
              <p>
                Conheça Estevão, seu companheiro de jogos e bot do Discord. Com
                recursos como rolagem de dados, calculadoras e tabelas de acesso
                rápido, Estevão aprimora sua experiência de jogo. Diga adeus às
                preocupações com jogos de mesa com Estevão, seu assistente de
                jogo no Discord.
              </p>
              <p>
                Por favor, apoie Estevão contando aos seus amigos sobre ele.
                Isso será muito útil para nós. Sinta-se à vontade para convidar
                este bot para o seu servidor do Discord.
              </p>
            </div>
          </div>
          <h2 className="bot-title">Como usar?</h2>
          <p>
            Você não precisa instalar nada, apenas precisa ter um canal no
            Discord ou ser administrador de um. Vocé pode{" "}
            <a href="https://discord.gg/S7JKXDyY">clicar aqui</a> e abrirá uma
            tela guiando você para adicionar ao seu canal. O bot possui diversas
            ferramentas para rolagem de dados e consulta de informações. Os
            comandos são todos via barra &quot;/&quot; no chat. Qualquer coisa
            entre em <a href="/Contatos">Contato</a> para obter suporte.
          </p>
        </div>
      </main>
    </>
  );
}
