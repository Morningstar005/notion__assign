const mongoose= require("mongoose")
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(`${process.env.DB_CONNECTION}/notion`,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        family:4
    })
    .then((res)=>{       
        console.log("DB connected successfully🥳🥳🥳")
    }).catch((err)=>{
        console.log("DB is not connected");
        console.error(err);
        process.exit(1);
    })
}