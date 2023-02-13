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
  // for example just return the results from this query 
  const getNewCustomers = await pool.query(
    `SELECT * FROM customers WHERE first_name LIKE 'Le%'`
  );

  return res.status(200).json(getNewCustomers.rows);
};

const getCustomers = async (_req, res) => {
  const query = `SELECT * FROM customers WHERE first_name LIKE 'Le%'`;
  return doSQL(query, res);
};

const addCustomer = async (req, res) => {
  const { customerId, email, first_name, last_name } = req.body;

  const query = `
    INSERT INTO customers (customer_id, email_address, first_name, last_name)
    VALUES (
      '${customerId}',
      '${email}',
      '${first_name}',
      '${last_name}'
    )
  `;

  return doSQL(query, res);
};

const getTable = async (req, res) => {
  const { name } = req.params;
  const sql = `SELECT * FROM ${name} LIMIT 10`;
  return await pool
    .query(sql)
    .then((result) => res.status(200).json(result.rows));
};

const removeCustomer = async (req, res) => {
  const { customerId } = req.body;

  const query = `
    DELETE FROM customers
    WHERE customer_id = '${customerId}'
    `;

  return doSQL(query, res);
};

module.exports = {
  getCustomers,
  addCustomer,
  removeCustomer,
  getTable,
};
