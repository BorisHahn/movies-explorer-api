const router = require('express').Router();
const userRouter = require('./user');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');
const movieRouter = require('./movie');
const { signUp, signIn, signOut } = require('../controllers/user');
const { validSignUpData, validSignInData } = require('../utils/validation/validUserData');

// роуты, не требующие авторизации
router.post('/signin', validSignInData, signIn);
router.post('/signup', validSignUpData, signUp);

// роуты, которым авторизация нужна
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.post('/signout', auth, signOut);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса'));
});

module.exports = router;
