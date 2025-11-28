const User=require("../models/user.model.js");
const Message=require("../models/message.model.js");
const cloudinary =require('../lib/cloudinary.js');

const getUsersForSideBar=async(req,res)=>{

    try{
        const loggedInUserId=req.user._id;

        const filteredUsers = await User.find({
    _id: { $ne: loggedInUserId }
})
  .select("-password")
  .sort({ fullname: 1 });  // sort A → Z

        res.status(200).json(filteredUsers);


    }catch(error){

        console.log("error in getUsersForSideBar Controller");
          res.status(500).json({message:"internal server error"});




    }



}

const getMessages= async(req,res)=>{

    try{
        const {id:userToChatId}=req.params;
        const myId=req.user._id;

        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);



    }catch(error){


        console.log("error in getMessages Controller");
          res.status(500).json({message:"internal server error"});






    }

}

const sendMessage=async(req,res)=>{

    try{

        const senderId=req.user._id;
        const {id: receiverId}=req.params;
        const {text,image}=req.body;

        if (!text && !image) {
  return res.status(400).json({ message: "Message cannot be empty" });
}

        let imageUrl;

        if(image){

            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;


        }

        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl


        });

        await newMessage.save();

        // todo realtime Functionilty socket.io


        res.status(201).json(newMessage);



    }catch(error){



        console.log("error in sendMessage Controller");
          res.status(500).json({message:"internal server error"});





    }

}



















module.exports={getUsersForSideBar, getMessages,sendMessage};