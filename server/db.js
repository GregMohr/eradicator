import mongoose from 'mongoose';

export const connect = async () => {
  // mongoose 6.0+ connection parameters default as:
  // useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false

  try {
    await mongoose.connect(process.env.DB); 
    console.log('Connected to database successfully');
  } catch (error) {
    console.log('Unable to connect to database');
    console.log(error);
  }
}