const express = require("express");
const bp = require("body-parser");
const app = express();
const db = require('./queries')

const port = 3000;

app.use(bp.json());
app.use(
  bp.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ info: "Express/Node Postgres API" });
});

app.listen(port, () => (console.log(`app running on port ${port}`)));


app.get('/customers', db.getCustomers)
