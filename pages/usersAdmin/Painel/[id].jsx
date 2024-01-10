import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import "./painel.css";
import Image from "next/image";

export default function Painel() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [fantasyName, setFantasyName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [intro, setIntro] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const userDoc = await getDoc(doc(db, "users", id));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser(userData);
          setFantasyName(userData.fantasyName);
          setEmail(userData.email);
          setRole(userData.role);
          setIntro(userData.intro);
        }
      };

      fetchUser();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fantasyName || !email || !role || !intro) {
      setMessage("Por favor, preencha todos os campos");
      return;
    }

    const updatedUser = {
      ...user,
      fantasyName,
      email,
      role,
      intro,
    };

    await setDoc(doc(db, "users", id), updatedUser);
    setMessage("Dados atualizados com sucesso");

    setUser(updatedUser);
  };
  return (
    <div className="wrapper">
      <div className="img-box">
        {user && <Image src={user.photoUrl} alt="" width={150} height={150} />}
      </div>
      <div>
        {user ? (
          <form onSubmit={handleSubmit}>
            <div className="grid-dois">
              <label>
                Name
                <input type="text" defaultValue={user.name} readOnly />
              </label>

              <label>
                Fantasy Name
                <input
                  type="text"
                  value={fantasyName}
                  onChange={(e) => setFantasyName(e.target.value)}
                />
              </label>
            </div>
            <div className="grid-dois">
              <label>
                Email
                <input type="email" defaultValue={user.email} readOnly />
              </label>

              <label>
                Role
                <select
                  value={role}
                  readOnly
                  // onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">user</option>
                  <option value="contributor">contributor</option>
                  <option value="admin">admin</option>
                </select>
              </label>
            </div>

            <label>
              Intro
              <textarea
                type="text"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
              />
            </label>
            <small>Não use mais que 300 caracteres.</small>

            <div className="buttons-box">
              {/* <Link href="/usersAdmin">
                {user &&
                  user.role !== "user" &&
                  user.role !== "contributor" && <button>Voltar</button>}
              </Link> */}
              <Link href="/">
                <button className="button vermelho">Página Inicial</button>
              </Link>

              <button className="button verde" type="submit">
                Enviar
              </button>
            </div>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="console">{message}</div>
    </div>
  );
}
