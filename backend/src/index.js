const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const  router=require('./routes/auth.route.js');
const  messageRouter=require('./routes/message.route.js');

const connectionDB=require("./lib/db.js");
const cookieParser = require("cookie-parser");



const app=express();
dotenv.config();
const PORTX=process.env.PORT; //portconfig......



app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true

}));
app.use(cookieParser());

app.listen(PORTX,()=>{
    console.log(`listening on ${PORTX}`);
    connectionDB();  //x

});

app.use("/api/auth",router);
app.use("/api/message",messageRouter);





