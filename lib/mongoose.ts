import {connect, set} from 'mongoose';

let isConnected = false;
export const connectToDB =async()=>{
    set('strictQuery',true);
        if (!process.env.MONGODB_URI) return console.log('MONGODB_URI DOES NOT EXISTS')
        if (isConnected) return console.log('Using Existing Connection')
    try {
        await connect(process.env.MONGODB_URI);
        isConnected  = true;
        console.log('monogodb Connected Successfully')

    } catch (error:any) {
        console.log(`Unable to connect to mongodb ${error.message}`)
    }
}