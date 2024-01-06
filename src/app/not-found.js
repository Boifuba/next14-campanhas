import RootLayout from "../components/Layout";
import Link from "next/link";
import Head from "next/head";
import "./not-found.css";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Not Found do Boi.</title>
        <meta
          name="description"
          content="Cade a página de RPG que estava aqui?"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="Boifubá" />
        <meta name="title" content="Not Found do Boi" />
      </Head>
      <RootLayout>
        <div className="container">
          <div className="big">404</div>
          <div className="sefudeu">SE FUDEU</div>
          <div className="texto">
            Ou você é um retardado que clica com a bunda ou eu sou um bosta que
            não sei fazer um site, isso nos leva ao ponto que suas opções são
            essas:
            <Link href="/rpg">
              {" "}
              <p className="retorno">
                {" "}
                Retornar para a{" "}
                <span className="colorido"> Página Principal </span>ou...
              </p>
            </Link>
          </div>
          <div className="video-responsive">
            <iframe
              width="853"
              height="480"
              src="/rpg/vtnc.mp4"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              controls
              loop
              autoPlay
            />
          </div>
        </div>
      </RootLayout>
    </>
  );
}
