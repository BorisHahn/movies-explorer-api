const router = require('express').Router();
const userRouter = require('./user');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');
const movieRouter = require('./movie');
const { signUp, signIn, signOut } = require('../controllers/user');

// роуты, не требующие авторизации
router.post('/signin', signIn);
router.post('/signup', signUp);

// роуты, которым авторизация нужна
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.post('/signout', auth, signOut);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса'));
});

module.exports = router;
