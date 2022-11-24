const userRouter = require('express').Router();
const {
  getProfileInfo,
  editProfileInfo,
} = require('../controllers/user');

userRouter.get('/me', getProfileInfo);
userRouter.patch('/me', editProfileInfo);

module.exports = userRouter;
