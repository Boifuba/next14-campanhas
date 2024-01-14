import "./Jogos.css";
import Image from "next/image";
const images = [
  "GURPS.png",
  "dragon-heresy.png",
  "gurps.jpeg",

  // Adicione mais nomes de arquivos de imagem conforme necessário
];
export default function Jogos() {
  return (
    <div className="slider">
      <div class="slide-track">
        {images.map((image) => (
          <div class="slide" key={image}>
            <Image
              src={`/rpg/logos/${image}`}
              height="100"
              width="250"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}
