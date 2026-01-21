const mongoose=require("mongoose");





const connectionDB= async()=>{

    try{

          const conn=await mongoose.connect(process.env.MONGO_URI);

          console.log(`MongoDB Connected ${conn.connection.host}`)
    }
    catch(error){

        console.log("MongoDB Connection Error",error);


    }

  

//dbx
}

module.exports=connectionDB;
