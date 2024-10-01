const { generateToken } = require('../utils/jwt');

const googleCallback = (req, res) => {
  const user = req.user;
  const token = generateToken(user);
 
  console.log(user)
  console.log(token)
  
  res.redirect(`${process.env.CLIENT_URL}/Dashboard?token=${token}`)
};


const failure = (req, res) => {
  res.send('Failed...!');
};

module.exports = { googleCallback, failure };
