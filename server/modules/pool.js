/* the only line you likely need to change is

 database: 'prime_app',

 change `prime_app` to the name of your database, and you should be all set!
*/

const { parse } = require("dotenv");
const pg = require("pg");
let pool;

// When our app is deployed to the internet
// we'll use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
// eg:
//  DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/prime_app

if (process.env.DATABASE_CONNECTION_OBJECT) {
  let connectionObj;
  connectionObj = JSON.parse(process.env.DATABASE_CONNECTION_OBJECT);
  connectionObj.ssl = { rejectetUnauthorized: false };
  pool = new pg.Pool(connectionObj);
} else if (process.env.DATABASE_URL) {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

// When we're running this app on our own computer
// we'll connect to the postgres database that is
// also running on our computer (localhost)
else {
  pool = new pg.Pool({
    host: "localhost",
    port: 5432,
    database: "COFMS", // 	💥 Change this to the name of your database!
  });
}

console.log(pool);
// console.log(JSON.parse(process.env.DATABASE_CONNECTION_OBJECT));

module.exports = pool;
