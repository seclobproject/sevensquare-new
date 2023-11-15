import dotenv from "dotenv";
import connectDB from "./config/db.js";

import users from "./data/users.js";

import User from "./models/userModel.js";

dotenv.config();

await connectDB();

const importData = async () => {
  try {

    await User.deleteMany();
    const createdUsers = await User.insertMany(users);

    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log("Data destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if(process.argv[2] === '-id'){
    destroyData();
}else{
    importData();
}