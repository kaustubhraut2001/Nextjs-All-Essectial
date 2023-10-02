import { getdatafromtoken } from "@/helper/getdatafrom token";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/Usermodel";
import { conneccttodb } from "@/dbconfig/dbconnection";
import { get } from "http";

conneccttodb();
export async function GET(request : NextRequest ){

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