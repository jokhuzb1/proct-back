import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
dotenv.config()

const dbURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.fhz8ge4.mongodb.net/store?retryWrites=true&w=majority`;

export default {
  connect: (cb) => {
    try {
      mongoose.connect(dbURI)
      const db = mongoose.connection;
      db.on("error", console.error.bind(console, "connection error: "));
      db.once("open", function () {
        console.log("Database connected successfully");
      });
      return cb()
    } catch (err) {
      return cb(err)
    }
  },
  get: () => db
}