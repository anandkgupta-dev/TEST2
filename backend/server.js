const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("FATAL ERROR: MONGO_URI environment variable is missing.");
} else {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log('Connected to MongoDB successfully');
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err.message);
    });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
