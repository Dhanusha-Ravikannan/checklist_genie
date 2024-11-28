require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./utils/passport.config');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const tagRoutes = require('./routes/tags.routes');
const templateRoutes = require('./routes/template.routes');
const itemRoutes = require('./routes/items.routes')
// const linkedRoutes = require('./routes/linkedItems.routes');
const responseRoutes = require('./routes/itemResponse.routes');
const positionRoutes = require('./routes/userPosition.routes');
const userTypeRoutes = require('./routes/userTypes.routes');
const cors = require('cors');
const { authentication } = require('./utils/jwt');
const app = express();
var morgan = require('morgan')
const port = 5002;


app.use(morgan('dev'))

// app.use(cors({
//   origin : `${process.env.CLIENT_URL}`,
//   credentials:true
// }))

const corsOptions = {
  origin: [
    `${process.env.CLIENT_URL}`,
    `${process.env.REACT_APP_BACKEND_SERVER_URL}`,
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);
app.use('/api',userRoutes);
app.use(authentication);
app.use('/tags',tagRoutes);
app.use('/template',templateRoutes);
app.use('/items',itemRoutes);
// app.use('/link',linkedRoutes);
app.use('/response',responseRoutes);


app.use('/position',positionRoutes);
app.use('/type',userTypeRoutes);

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
