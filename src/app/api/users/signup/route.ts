import dbConnect from "@/app/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/models/userSchema";

export async function POST(request: NextRequest) {
  dbConnect();
  const { email, password } = await request.json();
  console.log(email);
  const alreadyExistUser = await User.findOne({ email });

  if (alreadyExistUser) {
    return NextResponse.json({ error: "User Already Exist", status: 0 });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    email: email,
    password: hashedPassword,
  });

  const savedUser = await newUser.save();

  return NextResponse.json({
    message: "user saved successfully",
    savedUser,
    status: 1,
  });
}
