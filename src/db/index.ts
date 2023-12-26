import mongoose from "mongoose";

declare global {
  var db: typeof mongoose;
}

const uri = process.env.DATABASE_URI!;

if (uri === undefined) throw "set DATABASE_URI environment variable";

export default async function dbConnect() {
  try {
    if (!global.db || typeof global.db !== typeof mongoose) {
      console.log("Stablishing DB connection");
      global.db = await mongoose.connect(uri);
    }
    return global.db;
  } catch (error) {
    console.error(error);
  }
}
