import React from "react";
import path from "path";
import fs from "fs";
import HomeClient from "./home.client";
import "./home.css";

import dbConnect from "../src/utilidades/dbConnect";
import BlogModel from "../src/utilidades/Schema";

export async function getStaticProps() {
  await dbConnect();

  const result = await BlogModel.find({});
  const itemsFromDb = result.map((doc) => {
    const item = doc.toObject();
    item._id = item._id.toString();
    item.date = item.date.toISOString();
    return item;
  });

  console.log("Current working directory:", process.cwd());
  // Read the JSON file
  const jsonFilePath = path.join(process.cwd(), "./src/utilidades/outros.json");
  const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

  // Combine the items from the database and the JSON file
  const combinedItems = [...itemsFromDb, ...jsonData.items];

  // Filter out items where show is false
  const items = combinedItems.filter((item) => item.show !== false);

  const tags = [...new Set(items.flatMap((item) => item.tags))];

  return { props: { items, tags } };
}

export default function Home(props) {
  return <HomeClient {...props} />;
}
