const jwt = require('jsonwebtoken');


const generateToken = (user) => {
  return jwt.sign(
    {
      // id: user.id,
      organisation_id : user.organisation,
      organisation_user_id : user.organisation_user_id,
      email: user.email,
      name: user.name,
      
    },
    process.env.SECRET
  );
};

module.exports = { generateToken };
