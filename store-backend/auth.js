import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
  const token = req.get('token');
  if (!token)
  return res
    .status(401)
    .json({ msg: 'No authentication token, authorization denied.' });

  jwt.verify(token, process.env.JWT_SECRET, {algorithms: ["HS256"]}, (err, decode) => {
    if(!err) {
      req.user = decode; //store user info on request object
      next(); //middleware complete, move to next endpoint
    }
    else {
      res.status(401).send('Token verification failed, authorization denied.');
    }
  })
}

const isAdmin = (req, res, next) => {
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
      return next();
    }
    return res.status(401).send('Admin token is not valid.');
  };

  export { isAuth, isAdmin };