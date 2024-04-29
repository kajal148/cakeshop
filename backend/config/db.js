import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`Mongoose Connected ${connect}`.cyan.underline);
    }catch (err){
        console.log(`ERROR ${err}`.red.underline.bold);
        process.exit(1);
    }
}


export default connectDB;