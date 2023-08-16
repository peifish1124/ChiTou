const tripModel = require('../models/trip_model');
const userModel = require('../models/user_model');
const errorRes = require('../../utils/error_message_util');

exports.createTrip = async (req, res) => {
  console.log('Create Trip');

  if (req.headers['content-type'] !== 'application/json') {
      const [errorCode, errorMessage] = errorRes.contentTypeError();
      return res.status(errorCode).json({ error: errorMessage });
  }

  const { name, destination, start_date, end_date, user_ids } = req.body;
  if (!name || !destination || !start_date || !end_date || !user_ids || user_ids.length == 0) {
      const [errorCode, errorMessage] = errorRes.emptyInput();
      return res.status(errorCode).json({ error: errorMessage });
  }

  const isUserAllExist = await userModel.userAllExist(user_ids);
  if (isUserAllExist === null) {
    const [errorCode, errorMessage] = errorRes.queryFailed();
    return res.status(errorCode).json({ error: errorMessage });
  } else if (!isUserAllExist) {
    const [errorCode, errorMessage] = errorRes.participantNotExist();
    return res.status(errorCode).json({ error: errorMessage });
  }

  try {
    const trip = await tripModel.createTrip(name, destination, start_date, end_date, user_ids);
    if (trip === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    }
    console.log('Create Trip Success');
    return res.status(200).json({
      data: {
        trip: trip
      }
    });
  } catch (err) {
    console.log(err);
    const [errorCode, errorMessage] = errorRes.dbConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
};

exports.getTrips = async (req, res) => {
  console.log('Get Trips');

  const { 'id': myId } = req.userData;

  try {
    const trips = await tripModel.getTrips(myId);
    if (trips === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    }
    console.log('Get Trips Success');
    return res.status(200).json({
      data: {
        trips: trips
      }
    })
  } catch (err) {
    console.log(err);
    const [errorCode, errorMessage] = errorRes.dbConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
};