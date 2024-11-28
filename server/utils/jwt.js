const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      organisation_id: user.organisation,
      organisation_user_id: user.organisation_user_id,
      user_id : user.user_id,
      email: user.email,
      name: user.name,
    },
    process.env.SECRET
  );
};

const authentication = (req, res, next) => {

  console.log("req headers", req.headers)
  const authHeaders = req.headers.authorization; 
  console.log(authHeaders, "1234");
  
  if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const token = authHeaders.split(' ')[1]; 
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { generateToken, authentication };