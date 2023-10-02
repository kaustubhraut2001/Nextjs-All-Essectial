import User from "@/models/Usermodel";
import { conneccttodb } from "@/dbconfig/dbconnection";
import { NextRequest, NextResponse } from "next/server";

conneccttodb();

export async function POST(request: NextRequest) {
  try {
    const reqbode = await request.json();
    const { token } = reqbode;


    const userr = User.findOne({
		verifytoken: token,
		verifyexpire: { $gt: Date.now() },
    });

    if (!userr) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

	userr.isVerified = true;

    userr.verifytoken = undefined;
    userr.verifyexpire = undefined;
    await userr.save();

    return NextResponse.redirect("/login");
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
