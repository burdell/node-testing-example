const router = require('./routing');
const model = require('./models/events/UserChangeEvent');

router({
  type: 'UserChange',
  payload: {
    userId: '1234',
    name: 'George P Burdell',
    email: 'gpburdell@gmail.com'
  },
  model
});
