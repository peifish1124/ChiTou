
module.exports = {
  contentTypeError: () => {
    return [400, 'Content Type is not Correct'];
    // return {code: 400, message: 'Content Type is not Correct'};
  },

  emptyInput: () => {
    return [400, 'Input Field should not be Empty'];
  },

  participantNotExist: () => {
    return [400, 'Participant is not Existed']
  },

  tripNotFound: () => {
    return [400, 'Input id is not Valid']
  },

  tokenNotFound: () => {
    return [401, 'Token Not Found'];
  },

  wrongToken: () => {
    return [403, 'Wrong Token'];
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

  notTheSameTrip: () => {
    return [500, 'Ids are not under the same trip'];
  },

  sequenceDataNotEnough: () => {
    return [500, 'Ids are not enough'];
  },

  scheduleNotUnique: () => {
    return [500, 'Trip Day & Sequence with the Id are not Valid'];
  },
  
  dbConnectFailed: () => {
    return [500, 'Server Error - Connecting to db Failed'];
  },

  queryFailed: () => {
    return [500, 'Server Error - Query Failed'];
  },
}
