const tripModel = require('../models/trip_model');
const userModel = require('../models/user_model');
const eventModel = require('../models/event_model');
const errorRes = require('../../utils/error_message_util');

exports.createTrip = async (req, res) => {
  console.log('Create Trip');

  const { 'id': myId } = req.userData;

  if (req.headers['content-type'] !== 'application/json') {
      const [errorCode, errorMessage] = errorRes.contentTypeError();
      return res.status(errorCode).json({ error: errorMessage });
  }

  const { name, destination, start_date, end_date, user_ids } = req.body;
  if (!name || !destination || !start_date || !end_date || !user_ids || user_ids.length == 0) {
      const [errorCode, errorMessage] = errorRes.emptyInput();
      return res.status(errorCode).json({ error: errorMessage });
  }

  try {
    const isUserAllExist = await userModel.userAllExist(user_ids);
    if (isUserAllExist === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    } else if (!isUserAllExist) {
      const [errorCode, errorMessage] = errorRes.participantNotExist();
      return res.status(errorCode).json({ error: errorMessage });
    }

    const trip = await tripModel.createTrip(myId, name, destination, start_date, end_date, user_ids);
    if (trip === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    }
    console.log('Create Trip Success');

    // create event for all members
    const isSuccess = await eventModel.create(Number(myId), user_ids, trip.id, 'added_trip');
    console.log('Create Event Success: ', isSuccess);

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

exports.tripDetail = async (req, res) => {
  console.log('Get Trip Detail');

  const { 'id': tripId } = req.params;
  const { 'id': myId } = req.userData;

  const isTripExist = await tripModel.tripExist(tripId);
  if (isTripExist === null) {
    const [errorCode, errorMessage] = errorRes.queryFailed();
    return res.status(errorCode).json({ error: errorMessage });
  } else if (!isTripExist) {
    const [errorCode, errorMessage] = errorRes.tripNotFound();
    return res.status(errorCode).json({ error: errorMessage });
  }

  try {
    const trip = await tripModel.tripDetail(Number(tripId), myId);
    if (trip === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    }
    console.log('Get Trip Detail Success');
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

exports.uploadPicture = async (req, res) => {
  console.log('Upload Picture');

  if(!req.headers['content-type']) {
    const [errorCode, errorMessage] = errorRes.emptyInput();
    return res.status(errorCode).json({ error: errorMessage });
  }

  if(!req.headers['content-type'].includes('multipart/form-data')) {
    const [errorCode, errorMessage] = errorRes.contentTypeError();
    return res.status(errorCode).json({ error: errorMessage });
  }

  const { 'id': tripId } = req.params;

  if(!req.file) {
    const [errorCode, errorMessage] = errorRes.emptyInput();
    return res.status(errorCode).json({ error: errorMessage });
  }

  try {
    const url = await tripModel.uploadPicture(Number(tripId), req.file.filename);
    if (url === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    }

    console.log('Upload Picture Success');
    return res.status(200).json({
      data: {
        picture: url
      }
    });
  } catch (err) {
    console.log(err);
    const [errorCode, errorMessage] = errorRes.dbConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
};

exports.changeSequence = async (req, res) => {
  console.log('Change Schedule Sequence');

  if (req.headers['content-type'] !== 'application/json') {
    const [errorCode, errorMessage] = errorRes.contentTypeError();
    return res.status(errorCode).json({ error: errorMessage });
  }

  const { 'id': myId } = req.userData;
  const { 'id': trip_id, trip_day } = req.params;
  const { sequence_data, user_ids } = req.body;
  if (!sequence_data) {
    const [errorCode, errorMessage] = errorRes.emptyInput();
    return res.status(errorCode).json({ error: errorMessage });
  }

  try {
    const idArray = sequence_data.map(obj => obj.id);
    const isUnderSameTrip = await tripModel.checkIdsUnderSameTrip(Number(trip_id), idArray);
    if (isUnderSameTrip === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    } else if (!isUnderSameTrip) {
      const [errorCode, errorMessage] = errorRes.notTheSameTrip();
      return res.status(errorCode).json({ error: errorMessage });
    }

    const isAllScheduleIds = await tripModel.checkReceiveAllScheduleIds(Number(trip_id), Number(trip_day), idArray);
    if (isAllScheduleIds === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    } else if (!isAllScheduleIds) {
      const [errorCode, errorMessage] = errorRes.sequenceDataNotEnough();
      return res.status(errorCode).json({ error: errorMessage });
    }

    const new_sequence = await tripModel.changeSequence(Number(trip_id), sequence_data);
    if (new_sequence === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    }

    console.log('Change Schedule Sequence Success');

    // create event for all members
    const isSuccess = await eventModel.create(Number(myId), user_ids, trip_id, 'updated_trip');
    console.log('Create Event Success: ', isSuccess);

    return res.status(200).json({
      data: { trip: {id: new_sequence} }
    });
  } catch (err) {
    console.log(err);
    const [errorCode, errorMessage] = errorRes.dbConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
};

exports.search = async (req, res) => {
  console.log('Trip Search');
  // get keyword
  const { keyword } = req.query;
  const { 'id': myId } = req.userData;

  if (typeof keyword == 'undefined') {
    return res.status(200).json({ data: { trips: [] } });
  }

  try {
    const trips = await tripModel.search(keyword, myId);
    if (trips === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    }

    // 200 OK
    return res.status(200).json({
      data: {
        trips: trips
      }
    });
  }  catch (err) {
    console.log(err);
    const [errorCode, errorMessage] = errorRes.dbConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
};
