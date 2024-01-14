import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

const sitemapHandler = async (req, res) => {
  // List of pages
  const pages = [
    { url: "/rpg", changefreq: "daily", priority: 1 },
    { url: "/rpg/Post/timeline", changefreq: "monthly", priority: 0.8 },
    { url: "/rpg/Post/rito_de_passagem", changefreq: "daily", priority: 0.8 },
    { url: "/rpg/Post/Prata", changefreq: "monthly", priority: 0.8 },
    { url: "/rpg/Bot", changefreq: "monthly", priority: 0.8 },
    { url: "/rpg/Post/gerador_de_mapas", changefreq: "monthly", priority: 0.7 },
    {
      url: "/rpg/Post/GURPS-gamming-ballitics-2024",
      changefreq: "monthly",
      priority: 0.9,
    },

    {
      url: "/rpg/Post/Regra_de_cavar_buraco",
      changefreq: "daily",
      priority: 0.9,
    },
    { url: "/rpg/Post/FAQ", changefreq: "monthly", priority: 0.2 },
    { url: "/rpg/Post/Privacidade", changefreq: "monthly", priority: 0.7 },
  ];

  // Create a stream to write to
  const stream = new SitemapStream({
    hostname: `https://${req.headers.host}/rpg`,
  });

  // Write the pages to the stream
  Readable.from(pages).pipe(stream).pipe(res);

  res.setHeader("Content-Type", "application/xml");
};

export default sitemapHandler;
