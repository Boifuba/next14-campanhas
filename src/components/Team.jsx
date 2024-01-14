// import { useState } from "react";
// import "./Team.css";
// import { FaFacebook } from "react-icons/fa";

// export default function Team() {
//   const membros = [
//     {
//       nome: "Boifubá",
//       img: "/rpg/membros/boi.jpg",
//       cargo: "Desenvolver e Autor",
//       posts: 6,
//       intro:
//         "Sono un ragazzo di 20 anos, estudo engenharia informática e gosto de jogar futebol",
//     },
//     {
//       nome: "Thiago Olival",
//       img: "/rpg/membros/to.jpg",
//       cargo: "Autor",
//       posts: 1,
//       intro: "Olá, sou Maria. Sou uma estudante de 25 anos estudando biologia.",
//     },
//     {
//       nome: "Undefined",
//       img: "/rpg/membros/empty.jpg",
//       cargo: "null",
//       intro:
//         "Poderia ser você aqui, mas é só um erro de JavaScript para ser engraçadinho",
//     },
//     {
//       nome: "Undefined",
//       img: "/rpg/membros/empty.jpg",
//       cargo: "null",
//       intro:
//         "Poderia ser você aqui, mas é só um erro de JavaScript para ser engraçadinho",
//     },
//     {
//       nome: "Undefined",
//       img: "/rpg/membros/empty.jpg",
//       cargo: "null",
//       intro:
//         "Poderia ser você aqui, mas é só um erro de JavaScript para ser engraçadinho",
//     },
//     {
//       nome: "Undefined",
//       img: "/rpg/membros/empty.jpg",
//       cargo: "null",
//       intro:
//         "Poderia ser você aqui, mas é só um erro de JavaScript para ser engraçadinho",
//     },
//   ];

//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   return (
//     <div className="faixa">
//       <h1>Quem somos</h1>
//       <div className="card-box">
//         {membros.map((membro, index) => (
//           <div
//             className="card"
//             onMouseEnter={() => setHoveredIndex(index)}
//             onMouseLeave={() => setHoveredIndex(null)}
//           >
//             <img src={membro.img} alt="" />
//             <div className="info">
//               {hoveredIndex === index ? (
//                 <div>
//                   {/* Conteúdo quando o mouse está sobre o elemento */}
//                   <div className="hover-texto">
//                     <FaFacebook /> <span>/to</span>
//                   </div>
//                 </div>
//               ) : (
//                 <div>
//                   <div className="nome">
//                     <div>{membro.nome}</div>
//                   </div>
//                   <small>{membro.cargo}</small>
//                   <div className="intro">
//                     <p>{membro.intro}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
