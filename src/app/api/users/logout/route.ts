import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      msg: "Logout Successfully",
      status: 200,
      body: {
        data: null,
      },
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({
      msg: error.message,
      status: 500,
      body: {
        error: "Internal Server Error",
      },
    });
  }
}
