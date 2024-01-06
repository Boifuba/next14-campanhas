// pages/api/robots.js

export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.write("User-agent: *\n");
  res.write("Disallow: /Dashboard/\n");
  res.write("Disallow: /Login/\n");
  res.write("Disallow: /Novo/\n");
  res.write("Disallow: /editor/\n");
  res.write("Disallow: /Editor/\n");
  res.end();
}
