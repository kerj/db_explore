const express = require("express");
const bp = require("body-parser");
const app = express();
const db = require("./queries");
const cors = require("cors");
const compression = require("compression");
import ssr from "./routes/ssr";

const port = 3000;

app.use(compression());

app.use(express.static("public"));

app.use(bp.json());
app.use(
  bp.urlencoded({
    extended: true,
  })
);

app.use(cors());

const logger = (req, res, next) => {
  console.log(`Request: ${req.url}`);
  next();
};

app.use("/", ssr);

app.get("/", (req, res) => {
  res.json({ info: "Express/Node Postgres API" });
});

app.listen(port, () => console.log(`app running on port ${port}`));

app
  .route("/customers")
  .get(logger, db.getCustomers)
  .post(logger, (req, res) => {
    const { action } = req.body;
    if (action === "add") {
      db.addCustomer(req, res);
    }
    if (action === "delete") {
      console.log("removing");
      db.removeCustomer(req, res);
    }
  });

// app.get("/customers", logger, db.getCustomers);

// app.post("/addcustomer", logger, db.addCustomer);
// app.post("/removecustomer", logger, db.removeCustomer);

app.get("/table/:name", db.getTable);
