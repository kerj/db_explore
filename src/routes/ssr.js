import express from "express";
import App from "../components/app";
import React from "react";
import { renderToString } from "react-dom/server";

const router = express.Router();

router.get("/", async (req, res) => {
  const reactComp = renderToString(<App />);
  const html = `
    <html>
    <head><title>SSR</title></head>
    <body>
    <div id="root">${reactComp}</div>
    <script src="/app.js" charset="utf-8"></script>
    <script src="/vendor.js" charset="utf-8"></script>
    </body>
    </html>
    `;

  res.send(html);
});

export default router;
