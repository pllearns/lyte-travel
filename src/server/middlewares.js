const errorHandler = (error, req, res, next) => {
  res.status(500).render('common/error', {admin: null})
};

const logErrors = (error, req, res, next) => {
  console.error(error.stack);
  next(error);
};

const notFoundHandler = (req, res) => {
  res.status(404).render('common/not_found', { name: 'oops', admin: null});
};

const sessionChecker = (req, res, next) => {
  if(!(req.cookies.user_sid && req.session.user)) {
    res.redirect('/login');
  }
};

const setDefaultResponseLocals = (req, res, next) => {
  res.locals.query = '';
  next();
};

module.exports = {
  errorHandler,
  logErrors,
  notFoundHandler,
  sessionChecker,
  setDefaultResponseLocals
}