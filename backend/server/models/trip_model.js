const poolConnection = require('../../utils/db_connection');

exports.createTrip = async (name, destination, start_date, end_date, user_ids) => {
    const connection = await poolConnection();
    
    const query = `
      INSERT INTO trips (name, destination, start_date, end_date, member_count)
      VALUES (?, ?, ?, ?, ?)
        `;

    const valuesTemplate = user_ids.map(() => "(?, ?)").join(",");
    const query_member = `
      INSERT INTO members (user_id, trip_id)
      VALUES ${valuesTemplate}
      `

    try {
      const [result] = await connection.query(query, [name, destination, start_date, end_date, user_ids.length]);
      if(result.affectedRows != 1) return null;

      const values = user_ids.flatMap((user_id) => [user_id, result.insertId]);
      const [result_member] = await connection.query(query_member, values);
      if(result_member.affectedRows != user_ids.length) return null;
   
      return {
        id: result.insertId
      }
      
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      connection.release();
    }
};