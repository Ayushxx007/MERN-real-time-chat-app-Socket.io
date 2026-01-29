const mongoose=require("mongoose");
const validator=require("validator");



const messageSchema=mongoose.Schema({

   senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

    text:{
        type:String



    },
    image:{

        type:String



    }

//n



},{timestamps:true});



const Message=mongoose.model('Message',messageSchema);

module.exports=Message;
