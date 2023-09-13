const eventModel = require('../models/event_model');

exports.getEvents = async (req, res) => {
  const { 'id': myId } = req.userData;

  try {
    const events = await eventModel.getEvents(myId);
    if (events === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorode).json({ error: errorMessage });
    }

    // 200 OK
    return res.status(200).json({
      data: {
        events: events
      },
    });
  } catch (err) {
    console.log(err);
    const [errorCode, errorMessage] = errorRes.dbConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
};

exports.read = async (req, res) => {
  const { 'id': myId } = req.userData;
  const { 'event_id': eventId } = req.params;

  if(!eventId || Number.isNaN(eventId)) {
    const [errorCode, errorMessage] = errorRes.emptyInput();
    return res.status(errorCode).json({ error: errorMessage });
  }

  try {
    const event = await eventModel.read(myId, eventId);
    if (event === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    }

    // 200 OK
    return res.status(200).json({
      data: {
        event: event
      },
    });
  } catch (err) {
    console.log(err);
    const [errorCode, errorMessage] = errorRes.dbConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
};
