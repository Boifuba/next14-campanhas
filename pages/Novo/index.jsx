import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../api/firebase";
import "./editor.css";

export default function Novo() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({
    text: "",
    smalltext: "",
    tags: [],
    isHot: false,
    show: false,
    metatags: [],
    title: "",
    author: "",
    img: "",
    slug: "",
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    editorContent: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setData((prevData) => ({
        ...prevData,
        author: user.displayName || user.email,
      }));
    }
  }, [getAuth().currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("/rpg/api/saveData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      console.log("Blog post saved successfully");
      setIsSubmitted(true);
    } else {
      console.error("Error saving blog post");
    }
  };

  return (
    <>
      <div className="wrapper">
        <h1>{data.title}</h1>
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
              className="isHot checkbox-wrapper-1"
              type="checkbox"
              checked={data.isHot}
              onChange={(e) => setData({ ...data, isHot: e.target.checked })}
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
          <div className="metatags">
            <label htmlFor="metatags">Metatags</label>
            <input
              className="metatags"
              type="text"
              value={data.metatags}
              onChange={(e) => setData({ ...data, metatags: e.target.value })}
            />
          </div>
          <div className="tags">
            <fieldset>
              <legend>Tags</legend>

              <div className="checkbox-group">
                <input
                  id="checkbox1"
                  className="checkbox1"
                  type="checkbox"
                  checked={data.checkbox1}
                  onChange={(e) =>
                    setData({ ...data, checkbox1: e.target.checked })
                  }
                />
                <label htmlFor="checkbox1">Calculadora</label>
              </div>

              <div className="checkbox-group">
                <input
                  id="checkbox2"
                  className="checkbox2"
                  type="checkbox"
                  checked={data.checkbox2}
                  onChange={(e) =>
                    setData({ ...data, checkbox2: e.target.checked })
                  }
                />
                <label htmlFor="checkbox2">Blog</label>
              </div>

              <div className="checkbox-group">
                <input
                  id="checkbox3"
                  className="checkbox3"
                  type="checkbox"
                  checked={data.checkbox3}
                  onChange={(e) =>
                    setData({ ...data, checkbox3: e.target.checked })
                  }
                />
                <label htmlFor="checkbox3">GURPS</label>
              </div>

              <div className="checkbox-group">
                <input
                  id="checkbox4"
                  className="checkbox4"
                  type="checkbox"
                  checked={data.checkbox4}
                  onChange={(e) =>
                    setData({ ...data, checkbox4: e.target.checked })
                  }
                />
                <label htmlFor="checkbox4">Utilidades</label>
              </div>

              <div className="checkbox-group">
                <input
                  id="checkbox5"
                  className="checkbox5"
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
                  id="checkbox6"
                  className="checkbox6 "
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

          <br />

          <Editor
            apiKey="ezly3g7sfcmytk3oz37ws8cfy4v1beor3s1ttpdov20r8o1q"
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount code fullscreen",
              toolbar:
                "undo redo | blocks fontfamily fontsize |  bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
              height: 1000,
            }}
            initialValue="Mais vale um homem todavia nunca que em comparações jamais"
            onEditorChange={(content) => setData({ ...data, text: content })}
          />
          <div className="button-container">
            <button className="submit" type="submit">
              Submit
            </button>
            {isSubmitted && <p>O blog foi enviado com sucesso!</p>}
          </div>
        </form>
      </div>
    </>
  );
}
