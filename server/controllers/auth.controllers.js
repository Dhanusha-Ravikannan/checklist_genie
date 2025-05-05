const { CLIENT_URL } = require('../config/config');
const { generateToken } = require('../utils/jwt');

const googleCallback = (req, res) => {

  const user = req.user;

  const token = generateToken(user);
 
  console.log(user)

  console.log(token)
  
  res.redirect(`${CLIENT_URL}/user/Login1/?token=${token}`)
};


const failure = (req, res) => {
  res.send('Failed...!');
};


module.exports = { googleCallback, failure };


