require('dotenv').config();
const mysql = require('mysql2/promise');

// TODO: db connection hasn't inited yet
const POOL = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const poolConnection = async () => {
  try {
    const connection = await POOL.getConnection();
    console.log('connecting success');
    return connection;
  } catch (err) {
    console.error('connecting failed');
    throw err;
  }
};

module.exports = poolConnection;