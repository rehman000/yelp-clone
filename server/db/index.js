const { Pool } = require('pg');

// Instiating this class from Pg, It will automatically know to look for environment variables set in our .env file.
const pool = new Pool(); 
 
module.exports = {
  query: (text, params) => pool.query(text, params),
};