const scheduleModel = require('../models/schedule_model');
const eventModel = require('../models/event_model');
const tripModel = require('../models/trip_model');
const errorRes = require('../../utils/error_message_util');

exports.create = async (req, res) => {
  console.log('Schedule Create');

  if (req.headers['content-type'] !== 'application/json') {
    const [errorCode, errorMessage] = errorRes.contentTypeError();
    return res.status(errorCode).json({ error: errorMessage });
  }

  const { 'id': myId } = req.userData;
  const { trip_id: tripId, user_ids: userIds, place, trip_day: tripDay, sequence } = req.body;  // required
  const { duration, note } = req.body;  // optional
  if (!tripId || !place || !tripDay || !sequence) {
    const [errorCode, errorMessage] = errorRes.emptyInput();
    return res.status(errorCode).json({ error: errorMessage });
  }

  try {
    // check tripId + tripDay + sequence is unique
    const isUnique = await scheduleModel.checkUnique(tripId, tripDay, sequence);
    if (isUnique === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    } else if (!isUnique) {
      const [errorCode, errorMessage] = errorRes.scheduleNotUnique();
      return res.status(errorCode).json({ error: errorMessage });
    }

    const scheduleId = await scheduleModel.create(tripId, place, tripDay, sequence, duration === undefined ? null : duration, note === undefined ? null : note);
    if (scheduleId === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    }

    // 200 OK
    console.log('Schedule Created Success');

    // line bot send message
    const groupId = await scheduleModel.getLineGroupId(tripId);
    const tripDetail = await tripModel.tripDetail(tripDetail, myId);
    const message = {
      type: 'text',
      text: JSON.stringify(tripDetail.schedules),
    };

    await client.pushMessage(groupId, message);


    // create event for all members
    const isSuccess = await eventModel.create(Number(myId), userIds, tripId, 'updated_trip');
    console.log('Create Event Success: ', isSuccess);

    return res.status(200).json({
      data: {
        schedule: scheduleId,
      }
    });
  } catch (err) {
    console.log(err);
    const [errorCode, errorMessage] = errorRes.dbConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
};

exports.update = async (req, res) => {
  console.log('Schedule Update');

  if (req.headers['content-type'] !== 'application/json') {
    const [errorCode, errorMessage] = errorRes.contentTypeError();
    return res.status(errorCode).json({ error: errorMessage });
  }

  // get id from url
  const scheduleId = req.params.id;

  // get myId
  const { 'id': myId } = req.userData;
  const { trip_id: tripId, user_ids: userIds, place } = req.body;  // required
  const { duration, note } = req.body;  // optional
  if (!place || !scheduleId || Number.isNaN(Number(scheduleId))) {
    const [errorCode, errorMessage] = errorRes.emptyInput();
    return res.status(errorCode).json({ error: errorMessage });
  }

  try {
    const schedule = await scheduleModel.update(Number(scheduleId), place, duration === undefined ? null : duration, note === undefined ? null : note);
    if (schedule === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    }

    // 200 OK
    console.log('Schedule Update Success');

    // create event for all members
    const isSuccess = await eventModel.create(Number(myId), userIds, tripId, 'updated_trip');
    console.log('Create Event Success: ', isSuccess);

    return res.status(200).json({
      data: {
        schedule: schedule,
      }
    });
  } catch (err) {
    console.log(err);
    const [errorCode, errorMessage] = errorRes.dbConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
};

exports.delete = async (req, res) => {
  console.log('Schedule Delete');

  // get id from url
  const scheduleId = req.params.id;

  if (!scheduleId || Number.isNaN(Number(scheduleId))) {
    const [errorCode, errorMessage] = errorRes.emptyInput();
    return res.status(errorCode).json({ error: errorMessage });
  }

  try {
    // get schedule's order
    const scheduleOrder = await scheduleModel.getOrder(Number(scheduleId));
    if (scheduleOrder === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    }

    const schedule = await scheduleModel.delete(Number(scheduleId));
    if (schedule === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    }

    // 200 OK
    // reorder schedule
    const isReorderSuccess = await scheduleModel.reorder(scheduleOrder.tripId, scheduleOrder.tripDay, scheduleOrder.sequence);
    if (isReorderSuccess === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    }

    console.log('Schedule Delete Success');
    return res.status(200).json({
      data: {
        schedule: schedule,
      }
    });
  } catch (err) {
    console.log(err);
    const [errorCode, errorMessage] = errorRes.dbConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
};

exports.like = async (req, res) => {
  console.log('Schedule Like');

  // get id from url
  const scheduleId = req.params.id;
  const userId = req.userData.id;

  if (!userId || !scheduleId || Number.isNaN(Number(scheduleId))) {
    const [errorCode, errorMessage] = errorRes.emptyInput();
    return res.status(errorCode).json({ error: errorMessage });
  }

  try {
    const schedule = await scheduleModel.like(userId, Number(scheduleId));
    if (schedule === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    }

    // 200 OK
    console.log('Schedule Like Success');
    return res.status(200).json({
      data: {
        schedule: schedule,
      }
    });
  } catch (err) {
    console.log(err);
    const [errorCode, errorMessage] = errorRes.dbConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
}

exports.unlike = async (req, res) => {
  console.log('Schedule Unlike');

  // get id from url
  const scheduleId = req.params.id;
  const userId = req.userData.id;

  if (!userId || !scheduleId || Number.isNaN(Number(scheduleId))) {
    const [errorCode, errorMessage] = errorRes.emptyInput();
    return res.status(errorCode).json({ error: errorMessage });
  }

  try {
    const schedule = await scheduleModel.unlike(userId, Number(scheduleId));
    if (schedule === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    }

    // 200 OK
    console.log('Schedule Unlike Success');
    return res.status(200).json({
      data: {
        schedule: schedule,
      }
    });
  } catch (err) {
    console.log(err);
    const [errorCode, errorMessage] = errorRes.dbConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
}
