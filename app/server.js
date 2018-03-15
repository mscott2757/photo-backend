import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/photo');

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  next();
});
app.use('/api', require('./routes/'));

app.listen(port, () => {
  console.log('Server starting on port ' + port);
});
