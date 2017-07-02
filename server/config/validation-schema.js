
module.exports = {
  'signup': {
    'username': {
      notEmpty: true,
      isLength: {
        options: [{ min: 4, max: 20 }],
        errorMessage: 'Must be between 6 and 20 chars long'
      },
      errorMessage: 'required'
    },
    'email': {
      notEmpty: true,
      isEmail: {
        errorMessage: 'not valid'
      }
    },
    'password': {
      notEmpty: true,
      isLength: {
        options: [{min: 6, max: 30}],
        errorMessage: 'Must be between 6 and 30 chars long'
      },
      errorMessage: 'required'
    },
    'name': {
      notEmpty: true,
      isLength: {
        options: [{ min: 3, max: 250 }],
        errorMessage: 'Must be between 3 and 250 chars long'
      },
      errorMessage: 'required'
    }
  }
};