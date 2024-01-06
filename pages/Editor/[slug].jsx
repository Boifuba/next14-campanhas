import mongoose from "mongoose";
import BlogPost from "../../src/utilidades/Schema";
import { useState, useEffect } from "react";
import dotenv from "dotenv";
import { useRouter } from "next/router";
import { Editor } from "@tinymce/tinymce-react";

import "./editor.css";

dotenv.config();

export async function getServerSideProps(context) {
  const { slug } = context.params;

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const post = await BlogPost.findOne({ slug: slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post: JSON.parse(JSON.stringify(post)) },
  };
}

export default function EditorPage({ post }) {
  const router = useRouter();
  const [data, setData] = useState({
    ...post,
    date: new Date(post.date).toISOString().slice(0, 10),
    checkbox1: post.tags.includes("Calculadora"),
    checkbox2: post.tags.includes("Blog"),
    checkbox3: post.tags.includes("GURPS"),
    checkbox4: post.tags.includes("Utilidades"),
    checkbox5: post.tags.includes("Checkbox"),
    checkbox6: post.tags.includes("Checkbox"),
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleEditorChange = (content, editor) => {
    setData({ ...data, text: content });
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update tags based on checkbox values
      data.tags = [];
      if (data.checkbox1) data.tags.push("Calculadora");
      if (data.checkbox2) data.tags.push("Blog");
      if (data.checkbox3) data.tags.push("GURPS");
      if (data.checkbox4) data.tags.push("Utilidades");
      if (data.checkbox5) data.tags.push("Checkbox");
      if (data.checkbox6) data.tags.push("Checkbox");

      if (typeof data.metatags === "string") {
        data.metatags = data.metatags.split(",");
      }
      const response = await fetch(`/rpg/api/put/${data.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        await response.json();
        setResponseMessage("Dados atualizados com sucesso!");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Ocorreu um erro ao atualizar os dados.");
    }
  };
  return (
    <>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="firstline">
            <label htmlFor="title">Título: </label>
            <input
              type="text"
              className="title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />

            <label htmlFor="">Is hot?</label>
            <input
              name="isHot"
              className="isHot"
              type="checkbox"
              checked={data.isHot}
              onChange={handleChange}
            />
          </div>
          <div className="secondline">
            <label htmlFor="smalltext">Small Text:</label>
            <input
              className="smalltext"
              type="text"
              value={data.smalltext}
              onChange={(e) => setData({ ...data, smalltext: e.target.value })}
            />
            <label htmlFor="slug">Slug:</label>
            <input
              className="slug"
              type="text"
              value={data.slug}
              onChange={(e) => setData({ ...data, slug: e.target.value })}
            />
          </div>
          <div className="grid-two">
            <div className="image">
              <label htmlFor="image">Imagem: </label>
              <input
                type="text"
                className="image"
                value={data.img}
                onChange={(e) => setData({ ...data, img: e.target.value })}
              />
            </div>
            <div className="date">
              <label htmlFor="date">Data: </label>
              <input
                type="date"
                className="date"
                value={data.date}
                onChange={(e) => setData({ ...data, date: e.target.value })}
              />
            </div>
          </div>
          <div className="tags">
            <fieldset>
              <legend>Tags</legend>

              <div className="checkbox-group">
                <input
                  className="Calculadora"
                  type="checkbox"
                  checked={data.checkbox1}
                  onChange={(e) =>
                    setData({ ...data, checkbox1: e.target.checked })
                  }
                />
                <label htmlFor="Callculadora">Calculadora</label>
              </div>

              <div className="checkbox-group">
                <input
                  className="checkbox2"
                  type="checkbox"
                  checked={data.checkbox2}
                  onChange={(e) =>
                    setData({ ...data, checkbox2: e.target.checked })
                  }
                />
                <label htmlFor="Blog">Blog</label>
              </div>

              <div className="checkbox-group">
                <input
                  className="Blog"
                  type="checkbox"
                  checked={data.checkbox3}
                  onChange={(e) =>
                    setData({ ...data, checkbox3: e.target.checked })
                  }
                />
                <label htmlFor="GURPS">GURPS</label>
              </div>

              <div className="checkbox-group">
                <input
                  className="GURPS"
                  type="checkbox"
                  checked={data.checkbox4}
                  onChange={(e) =>
                    setData({ ...data, checkbox4: e.target.checked })
                  }
                />
                <label htmlFor="Utilidades">Utilidades</label>
              </div>

              <div className="checkbox-group">
                <input
                  className="Utilidades"
                  type="checkbox"
                  checked={data.checkbox5}
                  onChange={(e) =>
                    setData({ ...data, checkbox5: e.target.checked })
                  }
                />
                <label htmlFor="checkbox5">Checkbox</label>
              </div>

              <div className="checkbox-group">
                <input
                  className="checkbox6"
                  type="checkbox"
                  checked={data.checkbox6}
                  onChange={(e) =>
                    setData({ ...data, checkbox6: e.target.checked })
                  }
                />
                <label htmlFor="checkbox6">Checkbox</label>
              </div>
            </fieldset>
          </div>
          <div className="metatags">
            <label htmlFor="metatags">Metatags: </label>
            <input
              type="text"
              className="metatags"
              value={data.metatags}
              onChange={(e) => setData({ ...data, metatags: e.target.value })}
            />
          </div>
          <br />

          <Editor
            onEditorChange={handleEditorChange}
            apiKey="ezly3g7sfcmytk3oz37ws8cfy4v1beor3s1ttpdov20r8o1q"
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount code fullscreen",
              toolbar:
                "undo redo | blocks fontfamily fontsize |  bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
              height: 1000,
            }}
            value={data.text}
          />
          <div className="button-container">
            <div className="resposta">{responseMessage}</div>
            <button className="button verde" type="submit">
              Enviar
            </button>
            <button
              className="button azul"
              onClick={() => router.push(`/Dashboard`)}
            >
              Retornar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
