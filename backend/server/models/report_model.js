const poolConnection = require('../../utils/db_connection');

exports.report = async () => {
  const connection = await poolConnection();
  const userQuery = `
  SELECT COUNT(id) AS user_count
  FROM users
  `;
  const tripQuery = `
  SELECT COUNT(id) AS trip_count
  FROM trips
  `;
  const scheduleQuery = `
  SELECT COUNT(id) AS schedule_count
  FROM schedules
  `;
  const eventQueryAdd = `
  SELECT COUNT(id) AS event_count
  FROM events
  WHERE created_at > DATE_SUB(NOW(), INTERVAL 7 DAY) AND type = 'added_trip'
  `;
  const eventQueryUpdated = `
  SELECT COUNT(id) AS event_count
  FROM events
  WHERE created_at > DATE_SUB(NOW(), INTERVAL 7 DAY) AND type = 'updated_trip'
  `;

  try {
    const [userRows] = await connection.query(userQuery);
    const [tripRows] = await connection.query(tripQuery);
    const [scheduleRows] = await connection.query(scheduleQuery);
    const [eventRowsAdd] = await connection.query(eventQueryAdd);
    const [eventRowsUpdated] = await connection.query(eventQueryUpdated);

    const reportString = `
User Count: ${userRows[0].user_count}
Trip Count: ${tripRows[0].trip_count}
Schedule Count: ${scheduleRows[0].schedule_count}
------------------------------

Event Added Count (Last 7 Days):
\tTrip Added: ${eventRowsAdd[0].event_count}
\tTrip Updated: ${eventRowsUpdated[0].event_count}
`;

    return reportString;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    connection.release();
  }
};