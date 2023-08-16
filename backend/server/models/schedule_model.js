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

exports.checkReceiveAllScheduleIds = async (trip_id, ids) => {
  const connection = await poolConnection();
  const query = `SELECT id FROM schedules WHERE trip_id = ?`;

  try {
    const [result] = await connection.query(query, [trip_id]);
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
  const query = `UPDATE schedules SET sequence = ?, trip_day = ? WHERE id = ?`;

  try {
    for (var i = 0; i < schedule_sequence.length; i++) {
      const id = schedule_sequence[i].id;
      const trip_day = schedule_sequence[i].trip_day;
      const sequence = schedule_sequence[i].sequence;

      await connection.query(query, [sequence, trip_day, id]);
    }
    return trip_id;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    connection.release();
  }
};