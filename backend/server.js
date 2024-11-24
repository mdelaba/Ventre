const express = require("express");
const next = require("next");
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Use the CORS middleware
  server.use(
    cors({
      origin: "https://ventre-41873.web.app", // Replace with your frontend's origin
    })
  );

  // Define your API routes
  server.get("/api/payment_intent", (req, res) => {
    res.json({ data: "Your data here" });
  });

  // Handle all other requests with Next.js
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const port = 8080;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
