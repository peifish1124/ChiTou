const poolConnection = require('../../utils/db_connection');
const userUtil = require('../../utils/user_util');

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

exports.userAllExist = async (ids) => {
  const connection = await poolConnection();
  const query = `
    SELECT COUNT(id)
    FROM users 
    WHERE id IN (?)
    `;

  try {
    const userCount = await connection.query(query, [ids]);
    return userCount[0][0]['COUNT(id)'] == ids.length;
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

exports.login = async (name, password) => {
  const connection = await poolConnection();
  const query = `
    SELECT id, name, password
    FROM users
    WHERE name = ?
    `;

  try {
    const [rows] = await connection.query(query, [name]);
    if (rows.length === 0) {
      return null;
    }
    const user = rows[0];
    const isPasswordCorrect = await userUtil.isPasswordCorrect(password, user.password);
    if (isPasswordCorrect) {
      return {
        id: user.id,
        name: user.name,
      }
    }
    return false;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    connection.release();
  }
};

exports.search = async (keyword) => {
  const connection = await poolConnection();
  const query = `
    SELECT id, name
    FROM users
    WHERE name LIKE ?
    ORDER BY name DESC, id DESC
    `;
  
  try {
    const [rows] = await connection.query(query, [`%${keyword}%`]);
    if(rows.length === 0) {
      return [];
    }

    const users = rows.map((row) => {
      return {
        id: row.id,
        name: row.name,
      }
    });
    return users;
  } catch (err) {
    console.error(err);
    return null;
  }
};

