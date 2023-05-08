const { Pool } = require("pg");
const { user, host, database, password, port } = require("./dbConfig");

// console.log(user, host, database, password, port);

const pool = new Pool({
  user,
  host,
  database,
  password,
  port
});

pool.on("error", (err) => {
  console.log("db error");
  console.log(err);
});

/* pool.on("connect", () => {
  console.log(`db "${database}" connected`);
}); */

module.exports = pool;
