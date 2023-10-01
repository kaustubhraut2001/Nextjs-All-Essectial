import { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

export const getdatafromtoken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    return decoded.id;
  } catch (error: any) {
    console.log(error.message);
  }
};
