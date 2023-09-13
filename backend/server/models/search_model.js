const poolConnection = require('../../utils/db_connection');

exports.searchResult = async (place) => {
  const connection = await poolConnection();
  const query = `
    SELECT note
    FROM searches 
    WHERE place = ?
    `;
  
  try {
    const [result] = await connection.query(query, [place]);
    if(result.length != 0) return result[0].note;
    else return false;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    connection.release();
  }
};

exports.insertSearch = async (place, note) => {
  const connection = await poolConnection();
  const query = `
    INSERT INTO searches (place, note)
    VALUES (?, ?)
    `;

  try {
    const [result] = await connection.query(query, [place, note]);
    if (result.affectedRows != 1) return null;
    return true;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    connection.release();
  }
}