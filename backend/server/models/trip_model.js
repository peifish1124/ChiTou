const poolConnection = require('../../utils/db_connection');

exports.createTrip = async (creatorId, name, destination, start_date, end_date, user_ids) => {
    const connection = await poolConnection();
    
    const query = `
      INSERT INTO trips (creator_id, name, destination, start_date, end_date, member_count)
      VALUES (?, ?, ?, ?, ?, ?)
        `;

    const valuesTemplate = user_ids.map(() => "(?, ?)").join(",");
    const query_member = `
      INSERT INTO members (user_id, trip_id)
      VALUES ${valuesTemplate}
      `

    try {
      const [result] = await connection.query(query, [creatorId, name, destination, start_date, end_date, user_ids.length]);
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
      ORDER BY M.trip_id DESC
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

exports.tripExist = async (id) => {
  const connection = await poolConnection();
  const query = `
    SELECT COUNT(id)
    FROM trips 
    WHERE id = ?
    `;
  
  try {
    const existingTripCount = await connection.query(query, [id]);
    return existingTripCount[0][0]['COUNT(id)'] > 0;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    connection.release();
  }
};

exports.tripDetail = async (tripId, myId) => {
  const connection = await poolConnection();

  const trip_query = `SELECT name, picture, destination, start_date, end_date FROM trips WHERE id = ?`

  const member_query = `
    SELECT U.id, U.name
    FROM members AS M LEFT JOIN users AS U
    ON M.user_id = U.id
    WHERE M.trip_id = ?
  `

  const schedule_query = `
    WITH
      schedule_data AS (
        SELECT id, trip_day, sequence, place, duration, note
        FROM schedules
        WHERE trip_id = ?
      ),
      like_count AS (
        SELECT S.*, COUNT(L.id) AS like_count
        FROM schedule_data AS S LEFT JOIN likes AS L
        ON S.id = L.schedule_id
        GROUP BY S.id
      )
      SELECT LC.*, COUNT(L.id) AS is_like
      FROM like_count AS LC LEFT JOIN likes AS L
      ON LC.id = L.schedule_id AND L.user_id = ?
      GROUP BY LC.id
    `

  try {
    const [trip_result] = await connection.query(trip_query, [tripId]);

    const [member_result] = await connection.query(member_query, [tripId]);
    var member_data = [];
    if (member_result.length != 0) {
      for (var i = 0; i < member_result.length; i++) {
        const member = {
          id: member_result[i].id,
          name: member_result[i].name
        }
        member_data.push(member);
      }
    }

    const [schedule_result] = await connection.query(schedule_query, [tripId, myId]);
    var schedule_data = [];
    if (schedule_result.length != 0) {
      for (var i = 0; i < schedule_result.length; i++) {
        const schedule = {
          id: schedule_result[i].id,
          trip_day: schedule_result[i].trip_day,
          sequence: schedule_result[i].sequence,
          place: schedule_result[i].place,
          duration: schedule_result[i].duration,
          note: schedule_result[i].note,
          is_like: schedule_result[i].is_like == 1 ? true : false,
          like_count: schedule_result[i].like_count
        }
        schedule_data.push(schedule);
      }
    }
    return {
      id: tripId,
      name: trip_result[0].name,
      picture: trip_result[0].picture,
      destination: trip_result[0].destination,
      start_date: trip_result[0].start_date,
      end_date: trip_result[0].end_date,
      members: member_data,
      schedules: schedule_data
    }
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    connection.release();
  }
};

exports.uploadPicture = async (tripId, filename) => {
  const connection = await poolConnection();
  
  const query = `UPDATE trips SET picture = ? WHERE id = ?`;
  try {
    const picture_url = `https://${process.env.IP}/images/${filename}`;
    await connection.query(query, [picture_url, tripId]);

    return picture_url;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    connection.release();
  }
};

exports.checkIdsUnderSameTrip = async (trip_id, ids) => {
  const connection = await poolConnection();
  const query = `SELECT trip_id FROM schedules WHERE id IN (?)`;

  try {
    const [result] = await connection.query(query, [ids]);
    return result.every(element => element.trip_id === trip_id);
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    connection.release();
  }
};

exports.checkReceiveAllScheduleIds = async (trip_id, trip_day, ids) => {
  const connection = await poolConnection();
  const query = `SELECT id FROM schedules WHERE trip_id = ? AND trip_day = ?`;

  try {
    const [result] = await connection.query(query, [trip_id, trip_day]);
    const schedule_ids = result.map(obj => obj.id);
    if (schedule_ids.length !== ids.length) {
      return false;
    }

    const sortedArr1 = schedule_ids.slice().sort();
    const sortedArr2 = ids.slice().sort();

    return sortedArr1.every((element, index) => element === sortedArr2[index]);
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    connection.release();
  }

};

exports.changeSequence = async (trip_id, schedule_sequence) => {
  const connection = await poolConnection();
  const query = `UPDATE schedules SET sequence = ? WHERE id = ?`;

  try {
    for (var i = 0; i < schedule_sequence.length; i++) {
      const id = schedule_sequence[i].id;
      const sequence = schedule_sequence[i].sequence;

      await connection.query(query, [sequence, id]);
    }
    return trip_id;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    connection.release();
  }
};

exports.search = async (keyword, userId) => {
  const connection = await poolConnection();
  const query = `
    SELECT T.id, T.name, T.picture, T.destination, T.start_date, T.end_date, T.member_count
    FROM trips AS T
    LEFT JOIN members AS M ON T.id = M.trip_id
    WHERE T.name LIKE ? AND M.user_id = ?
    ORDER BY id DESC
    `;

  try {
    const [rows] = await connection.query(query, [`%${keyword}%`, userId]);
    if (rows.length === 0) {
      return [];
    }

    const trips = rows.map((row) => {
      return {
        id: row.id,
        name: row.name,
        picture: row.picture,
        destination: row.destination,
        start_date: row.start_date,
        end_date: row.end_date,
        member_count: row.member_count
      }
    });
    return trips;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    connection.release();
  }
};
