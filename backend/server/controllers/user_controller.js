const userModel = require('../models/user_model');
const userUtil = require('../../utils/user_util');
const errorRes = require('../../utils/error_message_util');


exports.signup = async (req, res) => {
  console.log('Signup');

  if (req.headers['content-type'] !== 'application/json') {
    const [errorCode, errorMessage] = errorRes.contentTypeError();
    return res.status(errorCode).json({ error: errorMessage });
    // const ERROR = errorRes.contentTypeError();
    // return res.status(ERROR.code).json({  error: ERROR.message });
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
    console.log('Signup success');
    return res.status(200).json({ 
      data: {
        accessToken: accessToken,
        user: user
      }});

  } catch (err) {

    console.log(err);
    const [errorCode, errorMessage] = errorRes.dbConnectFailed();
    return res.status(errorCode).json({ error: errorMessage });
  }
};

exports.signin = async (req, res) => {
  // TODO: not yet finished
};
