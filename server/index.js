require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./utils/passport.config');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes')
const generateToken = require('./utils/jwt');
const cors = require('cors')
const app = express();
const port = 5002;
//
app.use(cors({
  origin : `${process.env.CLIENT_URL}`,
  credentials:true
}))

app.use(express.json())
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);
app.use('/api',userRoutes);

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
