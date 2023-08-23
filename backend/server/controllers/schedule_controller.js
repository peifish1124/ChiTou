const scheduleModel = require('../models/schedule_model');
const eventModel = require('../models/event_model');
const tripModel = require('../models/trip_model');
const errorRes = require('../../utils/error_message_util');
const {client} = require('../../utils/line_bot');

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
    if (groupId != null) {
      const tripDetail = await tripModel.tripDetail(tripId, myId);

      var organizedData = {};
      for (var i = 0; i < tripDetail.schedules.length; i++) {
          var item = tripDetail.schedules[i];
          var trip_detail_day = item.trip_day;

          if (!organizedData[trip_detail_day]) {
              organizedData[trip_detail_day] = [];
          }

          var entry = "*" + item.place + "*:\n大約停留時間為 " + item.duration + " 小時"+ "\n目前投此行程人數為 " + item.like_count + '\n';
          organizedData[trip_detail_day].push({ sequence: item.sequence, entry: entry });
      }

      var schedule_text = '';
      for (var day in organizedData) {
        schedule_text += ("```第" + day + "天```\n");
        organizedData[day].sort(function (a, b) {
          return a.sequence - b.sequence;
        });
        organizedData[day].forEach(function (item) {
          schedule_text += (item.entry + '\n');
        });
      }

      const message = {
        type: 'text',
        text: schedule_text,
      };
      await client.pushMessage(groupId, message);
    }


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
