const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploads
app.use('/', resumeRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/resumeApp')
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch((err) => console.log(err));
