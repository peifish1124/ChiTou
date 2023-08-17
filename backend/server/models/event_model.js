const poolConnection = require('../../utils/db_connection');

exports.getEvents = async (userId) => {
  const connection = await poolConnection();
  const query = `
    SELECT E.id, E.trip_id, E.type, E.is_read, DATE_FORMAT(E.created_at, "%Y/%m/%d %H:%i:%s") AS created_at, U.name AS sender_name, T.name AS trip_name, T.start_date AS trip_start_date
    FROM events AS E 
    LEFT JOIN users AS U ON E.sender_id = U.id
    LEFT JOIN trips AS T ON E.trip_id = T.id
    WHERE E.receiver_id = ?
    ORDER BY E.created_at DESC, E.id DESC
    `;

  function summary(type, senderName, tripName, tripStartDate) {
    if(type === 'added_trip')
      return `${senderName} 將你加入 ${tripName}`;
    else if(type === 'updated_trip')
      return `${senderName} 更新了 ${tripName} 的行程`;
    else if(type === 'pre_trip')
      return `${tripName} 將於 ${tripStartDate} 開始`;
    return '';
  }
  
  try {
    const [rows] = await connection.query(query, [userId]);
    if(rows.length === 0) {
      return [];
    }

    const events = rows.map((row) => {
      return {
        id: row.id,
        type: row.type,
        is_read: row.is_read,
        created_at: row.created_at,
        summary: summary(row.type, row.sender_name, row.trip_name, row.trip_start_date)
      }
    });
    return events;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    connection.release();
  }
};

exports.read = async (userId, eventId) => {
  const connection = await poolConnection();
  const query = `
    UPDATE events
    SET is_read = 1
    WHERE id = ? AND receiver_id = ?
    `;

  try {
    const [result] = await connection.query(query, [eventId, userId]);
    if (result.affectedRows === 1) {
      return eventId;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    connection.release();
  }
};

exports.create = async (senderId, receiverIdArr, tripId, type) => {
  const connection = await poolConnection();
  const query = `
    INSERT INTO events (sender_id, receiver_id, trip_id, type)
    VALUES (?, ?, ?, ?)
    `;

  try {
    let successCount = 0;

    for (const receiverId of receiverIdArr) {
      if (senderId === receiverId) continue;
      
      const [result] = await connection.query(query, [senderId, receiverId, tripId, type]);
      if (result.affectedRows === 1) {
        successCount++;
      }
    }

    return successCount === receiverIdArr.length-1;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    connection.release();
  }
};

