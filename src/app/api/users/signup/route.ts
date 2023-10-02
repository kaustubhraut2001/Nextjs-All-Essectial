import { sendEmail } from "@/helper/mailer";
import { conneccttodb } from "../../../../dbconfig/dbconnection";
import User from "../../../../models/Usermodel";

import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

conneccttodb();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { username, email, password } = reqbody;

    const usr = User.findOne({ email });
    if (await usr) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        { status: 400 }
      );
    }

    if (!username || !email || !password) {
      return NextResponse.json(
        {
          error: "Please fill all the fields",
        },
        { status: 400 }
      );
    }
    console.log(reqbody);
    // hased password
    const salt = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password, salt);

    // create user
    const newuser = await User.create({
      username,
      email,
      password: hashedpassword,
    });

    const savenewuser = await newuser.save();
    console.log(savenewuser);

    sendEmail({ email, emailType: "VERIFY", userId: savenewuser._id });

    return NextResponse.json(
      {
        message: "User created successfully",
        success : savenewuser
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
