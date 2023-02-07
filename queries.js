const Pool = require("pg").Pool;
const connectionString = process.env.localConnect;
const pool = new Pool({
  connectionString,
});

pool.on("error", (err, _client) => {
  console.error("error occured ", err);
  process.exit(-1);
});

pool.on("connect", () => {
  console.log("connected!");
});

const doSQL = async (sql, res) => {
  const result = await pool.query(sql);
  return res.status(200).json(result.rows);
};

const getCustomers = (_req, res) => {
  const query = `SELECT * FROM customers ORDER BY last_name DESC LIMIT 2`;
  return doSQL(query, res);
};

module.exports = {
  getCustomers,
};
