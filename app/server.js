import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/photo');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.use('/api', require('./routes/'));

app.listen(port, () => {
  console.log('Server starting on port ' + port);
});
