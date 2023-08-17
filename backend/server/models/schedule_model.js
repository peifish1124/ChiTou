const poolConnection = require('../../utils/db_connection');

exports.checkUnique = async (tripId, tripDay, sequence) => {
  const connection = await poolConnection();
  const query = `
    SELECT COUNT(id) AS count
    FROM schedules
    WHERE trip_id = ? AND trip_day = ? AND sequence = ?
    `;

  try {
    const [result] = await connection.query(query, [tripId, tripDay, sequence]);
    if (result[0].count === 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    connection.release();
  }
};

exports.create = async (tripId, place, tripDay, sequence, duration, note) => {
  const connection = await poolConnection();
  const query = `
    INSERT INTO schedules (trip_id, place, trip_day, sequence, duration, note)
    VALUES (?, ?, ?, ?, ?, ?)
    `;

  try {
    const [result] = await connection.query(query, [tripId, place, tripDay, sequence, duration, note]);
    if (result.affectedRows === 1) {
      return {
        id: result.insertId,
      };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    connection.release();
  }
};

exports.update = async (scheduleId, place, duration, note) => {
  const connection = await poolConnection();
  const query = `
    UPDATE schedules
    SET place = ?, duration = ?, note = ?
    WHERE id = ?
    `;

  try {
    const [result] = await connection.query(query, [place, duration, note, scheduleId]);
    if (result.affectedRows === 1) {
      return {
        id: scheduleId,
      };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    connection.release();
  }
};

exports.getOrder = async (scheduleId) => {
  const connection = await poolConnection();
  const query = `
    SELECT trip_id, trip_day, sequence
    FROM schedules
    WHERE id = ?
    `;

  try {
    const [result] = await connection.query(query, [scheduleId]);
    if (result.length === 1) {
      return {
        tripId: result[0].trip_id,
        tripDay: result[0].trip_day,
        sequence: result[0].sequence,
      };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    connection.release();
  }
};

exports.delete = async (scheduleId) => {
  const connection = await poolConnection();
  const query = `
    DELETE FROM schedules
    WHERE id = ?
    `;

  try {
    const [result] = await connection.query(query, [scheduleId]);
    if (result.affectedRows === 1) {
      return {
        id: scheduleId,
      };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    connection.release();
  }
};

exports.reorder = async (tripId, tripDay, sequence) => {
  const connection = await poolConnection();
  const query = `
    UPDATE schedules
    SET sequence = sequence - 1
    WHERE trip_id = ? AND trip_day = ? AND sequence > ?
    `;

  try {
    const [result] = await connection.query(query, [tripId, tripDay, sequence]);
    if (result.affectedRows >= 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    connection.release();
  }
}

exports.like = async (userId, scheduleId) => {
  const connection = await poolConnection();
  const query = `
    INSERT INTO likes (schedule_id, user_id)  
    VALUES (?, ?)
    `;

  try {
    const [result] = await connection.query(query, [scheduleId, userId]);
    if (result.affectedRows === 1) {
      return {
        id: scheduleId,
      };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    connection.release();
  }
}

exports.unlike = async (userId, scheduleId) => {
  const connection = await poolConnection();
  const query = `
    DELETE FROM likes
    WHERE schedule_id = ? AND user_id = ?
    `;

  try {
    const [result] = await connection.query(query, [scheduleId, userId]);
    if (result.affectedRows === 1) {
      return {
        id: scheduleId,
      };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    connection.release();
  }
}
