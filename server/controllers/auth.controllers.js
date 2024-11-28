const { generateToken } = require('../utils/jwt');

const googleCallback = (req, res) => {
  console.log("ddddddddddddddddddd", process.env.CLIENT_URL);

  const user = req.user;
  console.log("req usersssssssssssss", req.user);

  const token = generateToken(user);
 
  console.log(user)

  console.log(token)
  
  res.redirect(`${process.env.CLIENT_URL}/user/Login1/?token=${token}`)
};


const failure = (req, res) => {
  res.send('Failed...!');
};


module.exports = { googleCallback, failure };
