const mongoose=require("mongoose");
const validator=require("validator");

const userSchema=mongoose.Schema({

    fullname:{
        type:String,
        required:true,
      
    },


       email:{
         type:String,
        required:true,
        unique:true,
        validate:{
            validator:(value)=>{

                return validator.isEmail(value);

            }


        }


        
    },

password: {
  type: String,
  required: true,
  minlength:6,
  validate: {
    validator: function (value) {
      return validator.isStrongPassword(value);
    },
    message: "Password must be strong (min 8 chars, uppercase, lowercase, number, symbol)"
  }
},


       profilePic:{
        type:String,
        Default:""
        
    }














},{timestamps:true});


const User =mongoose.model("User",userSchema);


module.exports=User;