const tripModel = require('../models/trip_model');
const errorRes = require('../../utils/error_message_util');

exports.createTrip = async (req, res) => {
    if (req.headers['content-type'] !== 'application/json') {
        const [errorCode, errorMessage] = errorRes.contentTypeError();
        return res.status(errorCode).json({ error: errorMessage });
    }

    const { name, destination, start_date, end_date, user_ids } = req.body;
    if (!name || !destination || !start_date || !end_date || !user_ids || user_ids.length == 0) {
        const [errorCode, errorMessage] = errorRes.emptyInput();
        return res.status(errorCode).json({ error: errorMessage });
    }
}