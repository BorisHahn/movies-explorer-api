const router = require('express').Router();
const userRouter = require('./user');
const movieRouter = require('./movie');
const { signUp } = require('../controllers/user');

// роуты, не требующие авторизации
// router.post('/signin', signIn);
router.post('/signup', signUp);

// роуты, которым авторизация нужна
router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;
