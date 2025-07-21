const mongoose = require('mongoose');

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('Connected to MongoDB Sucessful');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

module.exports = connectToMongo;
