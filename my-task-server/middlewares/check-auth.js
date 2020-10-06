module.exports = (req, res, next) => {

  const token = req.headers["authorization"];

  if (!token === 'machine_test') {
    res.status(401).send({ error: 'Unauthorized user' });
  }
  else{ 
      
    return next();
  }
}