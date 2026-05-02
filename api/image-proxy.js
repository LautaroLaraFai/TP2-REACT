export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).send("Missing url");
    }

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).send("Error fetching image");
    }

    const contentType = response.headers.get("content-type");
    const arrayBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", contentType || "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=86400"); // opcional cache

    res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    res.status(500).send("Internal error");
  }
}