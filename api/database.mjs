import mongoose from "mongoose";
import 'dotenv/config'

const connect = async () => await mongoose.connect(
   `mongodb+srv://useradmin:Bania%40107@cluster0.llsb5n3.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    err => {
      if (!err) return console.log("db connected");
      
      else return console.log("db error", err.message);
    }
  )


  const close = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  };
  const clear = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  };
  const db = {connect: connect, close: close, clear: clear}
  export default db