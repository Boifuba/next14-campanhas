import React, { useEffect, useState } from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

const TableOfContents = () => {
  const [tocItems, setTocItems] = useState([]);

  useEffect(() => {
    const postContainer = document.querySelector(".post-container");
    if (postContainer) {
      const headers = Array.from(postContainer.querySelectorAll("h1, h2, h3"));
      const items = headers.map((header) => {
        const id = header.innerText.toLowerCase().replace(/\s+/g, "-");
        header.id = id;
        return { id, text: header.innerText };
      });
      setTocItems(items);
    }
  }, []);

  return (
    <div className="aside-content">
      <ul>
        {tocItems.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
