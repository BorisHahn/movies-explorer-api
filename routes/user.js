const userRouter = require('express').Router();
const {
  getProfileInfo,
  editProfileInfo,
} = require('../controllers/user');
const { validEditProfileInfoData } = require('../utils/validation/validUserData');

userRouter.get('/me', getProfileInfo);
userRouter.patch('/me', validEditProfileInfoData, editProfileInfo);

module.exports = userRouter;
