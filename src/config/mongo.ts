import config from "./index";
import mongoose from "mongoose";
import logger from "./logger";

const { connection } = mongoose;

connection.once('error', () => logger.error(`Error on connection to   MongoDB`));
connection.once('open', () => logger.info('MongoDB connection is established'));

export default class MongoDB {
  private url: string;
  constructor() {
    this.url = `mongodb://${config.mongoUser}:${config.mongoPassword}@${config.mongoHost}:${config.mongoPort}/${config.mongoDatabase}`;
  };
  connect() {
    return mongoose.connect(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }, (err) => err && logger.error(`Error on connection to MongoDB: ${err.message}`));
  }
}
