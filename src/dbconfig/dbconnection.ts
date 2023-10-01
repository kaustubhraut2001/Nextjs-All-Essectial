import mongoose from 'mongoose';
import { type } from 'os';

// MongoDB Connection
export const conneccttodb = async () => {

	try{
		const connect = await mongoose.connect(process.env.MONGO_URI!);
		console.log(`MongoDB Connected: ${connect.connection.host}`);

	}
	catch(err){
		console.log(err);
	}

};

