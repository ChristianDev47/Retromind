const CONFIG = {
  API : {
    PORT: process.env.API_PORT 
  },
  DATABASE: {
    MONGO_URI: process.env.MONGO_URI
  },
  LOGIN: {
    JWT_SECRET: process.env.JWT_SECRET
  }

};

export default CONFIG