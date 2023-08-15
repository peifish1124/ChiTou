
module.exports = {
  contentTypeError: () => {
    return [400, 'Content Type is not Correct'];
    // return {code: 400, message: 'Content Type is not Correct'};
  },

  emptyInput: () => {
    return [400, 'Input Field should not be Empty'];
  },

  nameAlreadyExist: () => {
    return [403, 'Name Already Existed'];
  },

  userNotFound: () => {
    return [403, 'Signin Failed - User not Found'];
  },

  wrongPassword: () => {
    return [403, 'Signin Failed - Wrong Password'];
  },

  dbConnectFailed: () => {
    return [500, 'Server Error - Connecting to db Failed'];
  },

  queryFailed: () => {
    return [500, 'Server Error - Query Failed'];
  },
}
