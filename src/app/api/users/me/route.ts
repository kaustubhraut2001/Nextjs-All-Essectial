import { getdatafromtoken } from "@/helper/getdatafrom token";

import { NextRequest, NextResponse } from "next/server";
import  User from '../../../../models/user'
import dbConnect from '../../../../utils/dbConnect'
import { get } from "http";

dbConnect();
export async function GET(request : NextRequest , response : NextResponse){

	try{
		const userid = await getdatafromtoken(request);

		const  user = await User.findOne({
			_id : userid
		}).select('-password');

		return NextResponse.json({
			msg : "User Data",
			status : 200,
			body : {
				data : user
			}
		});




	}catch(error : any){

		return NextResponse.json({
			msg : error.message,
			status : 500,
			body : {
				error : "Internal Server Error"
			}
		})

	}

}