import mongoose from "mongoose";

export default async function dbConnect() {
  if (mongoose.connection.readyState === 1) {
    console.log("db Already Connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(db.connections[0].readyState);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
