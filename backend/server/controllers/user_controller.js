const userModel = require('../models/user_model');
const userUtil = require('../../utils/user_util');
const errorRes = require('../../utils/error_message_util');


exports.signup = async (req, res) => {
  console.log('User Signup');

  if (req.headers['content-type'] !== 'application/json') {
    const [errorCode, errorMessage] = errorRes.contentTypeError();
    return res.status(errorCode).json({ error: errorMessage });
  }

  const { name, password } = req.body;
  if (!name || !password) {
    const [errorCode, errorMessage] = errorRes.emptyInput();
    return res.status(errorCode).json({ error: errorMessage });
  }

  try {
    const isNameExist = await userModel.nameExist(name);
    if (isNameExist === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    } else if (isNameExist) {
      const [errorCode, errorMessage] = errorRes.nameAlreadyExist();
      return res.status(errorCode).json({ error: errorMessage });
    }

    // register user
    const encryptedPassword = await userUtil.encryptPassword(password);
    const user = await userModel.createUser(name, encryptedPassword);
    if (user === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    }

    // 200 OK
    accessToken = await userUtil.generateAccessToken(user);
    console.log('User Signup Success');
    return res.status(200).json({
      data: {
        access_token: accessToken,
        user: user
      }
    });
  } catch (err) {
    console.log(err);
    const [errorCode, errorMessage] = errorRes.dbConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
};

exports.signin = async (req, res) => {
  console.log('User Signin');

  if (req.headers['content-type'] !== 'application/json') {
    const [errorCode, errorMessage] = errorRes.contentTypeError();
    return res.status(errorCode).json({ error: errorMessage });
  }

  const { name, password } = req.body;
  if (!name || !password) {
    const [errorCode, errorMessage] = errorRes.emptyInput();
    return res.status(errorCode).json({ error: errorMessage });
  }

  try {

    const isNameExist = await userModel.nameExist(name);
    if (isNameExist === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    } else if (!isNameExist) {
      const [errorCode, errorMessage] = errorRes.userNotFound();
      return res.status(errorCode).json({ error: errorMessage });
    }

    // log in user
    const user = await userModel.login(name, password);
    if (user === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    } else if (!user) {
      const [errorCode, errorMessage] = errorRes.wrongPassword();
      return res.status(errorCode).json({ error: errorMessage });
    }

    // 200 OK
    accessToken = await userUtil.generateAccessToken(user);
    console.log('User Signin Success');
    return res.status(200).json({
      data: {
        access_token: accessToken,
        user: user
      }
    });
  } catch (err) {
    console.log(err);
    const [errorCode, errorMessage] = errorRes.dbConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
};

// [middleware] authorization function
exports.authorization = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    const [errorCode, errorMessage] = errorRes.tokenNotFound();
    return res.status(errorCode).json({ error: errorMessage });
  }

  const token = authorization.replace('Bearer ', '');
  try {
    const payload = await userUtil.decodePayload(token);

    const { id, name } = payload;
    req.userData = { id: id, name: name };
    return next();
  } catch (error) {
    const [errorCode, errorMessage] = errorRes.wrongToken();
    return res.status(errorCode).json({ error: errorMessage });
  }
};

exports.search = async (req, res) => {
  console.log('User Search');
  const { keyword } = req.query;

  if (typeof keyword == 'undefined') {
    return res.status(200).json({ data: { users: [] } });
  }

  try {
    const users = await userModel.search(keyword);
    if (users === null) {
      const [errorCode, errorMessage] = errorRes.queryFailed();
      return res.status(errorCode).json({ error: errorMessage });
    }

    // 200 OK
    return res.status(200).json({
      data: {
        users: users
      }
    });
  } catch (err) {
    console.log(err);
    const [errorCode, errorMessage] = errorRes.dbConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
};