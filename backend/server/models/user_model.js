const poolConnection = require('../../utils/db_connection');

exports.nameExist = async (name) => {
  const connection = await poolConnection();
  const query = `
    SELECT COUNT(id)
    FROM users 
    WHERE name = ?
    `;
  
  try {
    const existingUserCount = await connection.query(query, [name]);
    return existingUserCount[0][0]['COUNT(id)'] > 0;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    connection.release();
  }
};

exports.createUser = async (name, password) => {
  const connection = await poolConnection();
  const query = `
    INSERT INTO users (name, password)
    VALUES (?, ?)
    `;

  try {
    const [result] = await connection.query(query, [name, password]);
    if(result.affectedRows === 1) {
      return {
        id: result.insertId,
        name: name,
      }
    }
    return null;
  }   catch (err) {
    console.error(err);
    return null;
  } finally {
    connection.release();
  }
};
