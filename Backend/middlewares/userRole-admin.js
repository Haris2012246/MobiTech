// authenticate user role 
const isAdmin = (req, res, next) => {
    const user = req.user; 
    if (user && user.userType === 'admin') { //admin confirmed
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  };
  
  module.exports = { isAdmin };
  