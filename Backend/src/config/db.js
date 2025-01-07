import { connect } from 'mongoose';
import CONFIG from './environment.js';

const connectDB = async () => {
  try {
    const uri = CONFIG.DATABASE.MONGO_URI;
    await connect(uri, {
      useNewUrlParser: true,
      UseUnifiedTopology: true,
    })
      .then(() => console.log('MONGODB CONNECTED SUCCESSFULLY!'))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default connectDB;
