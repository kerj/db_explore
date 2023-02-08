const express = require("express");
const bp = require("body-parser");
const app = express();
const db = require('./queries');
const cors = require('cors');
// const compression = require('compression');
// const ssr = require('./routes/ssr');

const port = 3000;

// app.use(compression());

// app.use(express.static("public"));

app.use(bp.json());
app.use(
  bp.urlencoded({
    extended: true,
  })
);

app.use(cors());

// app.use("/ssr", ssr);

app.get("/", (req, res) => {
  res.json({ info: "Express/Node Postgres API" });
});

app.listen(port, () => (console.log(`app running on port ${port}`)));


app.get('/customers', db.getCustomers)
app.post('/addcustomer', db.addCustomer)
app.post('/removecustomer', db.removeCustomer)
