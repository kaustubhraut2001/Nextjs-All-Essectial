import { conneccttodb } from "@/dbconfig/dbconnection";

import User from "@/models/Usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

conneccttodb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 400 }
      );
    }

    const validpassword = await bcryptjs.compare(password, user.password);
    if (!validpassword) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 400 }
      );
    }

    // creating token data
    const tokendata = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    console.log(process.env.JWT_SECRET);
    const token = await jwt.sign(tokendata, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const resp = NextResponse.json(
      {
        message: "User logged in successfully",
        token: token,
      },
      { status: 200 }
    );

    resp.cookies.set("token", token, { httpOnly: true });

    return resp;
  } catch (err: any) {
    console.log(err);
    NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
