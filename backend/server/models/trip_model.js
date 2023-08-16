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

exports.getTrips = async (myId) => {
    const connection = await poolConnection();

    const query = `
      SELECT M.trip_id, T.name, T.picture, T.destination, T.start_date, T.end_date, T.member_count
      FROM members AS M LEFT JOIN trips AS T
      ON M.trip_id = T.id
      WHERE M.user_id = ?
        `;

    try {
      var data = [];
      const [result] = await connection.query(query, [myId]);
      if (result.length != 0) {
        for (var i = 0; i < result.length; i++) {
          const trip = {
            id: result[i].trip_id,
            name: result[i].name,
            picture: result[i].picture,
            destination: result[i].destination,
            start_date: result[i].start_date,
            end_date: result[i].end_date,
            member_count: result[i].member_count
          }
          data.push(trip);
        }
      }
      return data;

    } catch (err) {
      console.error(err);
      return null;
    } finally {
      connection.release();
    }
};