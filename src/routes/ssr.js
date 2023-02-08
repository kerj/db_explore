import express from "express";
import App from "../components/app";
import React from "react";
import hbs from "handlebars";
import { renderToString } from "react-dom/server";

const router = express.Router();

router.get("/", async (req, res) => {
  const html = `
    <html>
    <head><title>SSR</title></head>
    <body>
    <div id="reactele">{{{reactele}}}</div>
    <script src="/app.js" charset="utf-8"></script>
    <script src="/vendor.js" charset="utf-8"></script>
    </body>
    </html>
    `;

  const hbsTemplate = hbs.compile(html);
  const reactComp = renderToString(<App />);
  const htmlToSend = hbsTemplate({ reactele: reactComp });

  res.send(htmlToSend);
});

export default router;
