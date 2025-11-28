const validator=require('validator');
const bcrypt=require("bcrypt");
const User=require("../models/user.model.js");
const generateToken = require("../lib/utils");

const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // 1. Basic required checks
    if (!fullname || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 2. Email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    // 3. Strong password check
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Weak password" });
    }

    // 4. User exists?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Create user
    const user =  new User({
      fullname,
      email,
      password: hashedPassword,
    });

      await user.save();

    // 7. Create JWT cookie
    generateToken(user._id, res);

  


    // 8. Send response
    return res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.log("Signup error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};



const login= async(req,res)=>{

      try{

        const {email,password}=req.body;

        if(!email || !password){
           return res.status(400).json({ error: "All fields are required" });

        }

        const user =await User.findOne({email});

        if(!user){
             return res.status(400).json({ error: "Invalid Credentials" });

        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
           return res.status(400).json({ error: "Invalid Credentials" });

        }

        generateToken(user._id,res);


  return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic,
    });


        

    }catch(error){

       console.log("Login error:", error.message);
return res.status(500).json({ error: "Internal server error" });


    }

    
}

const logout=(req,res)=>{

     try{
      res.cookie("jwt",'',{maxAge:0});
       return res.status(200).json({
        message:"Logged Out Successfully"
      })

         


    }catch(error){

      console.log('ERROR in Loguout Controller',error.message)

              return res.status(500).json({message:"Internal Servewr Error"})


    }

    
}

const check=(req,res)=>{

     try{

            res.send("check");


    }catch(error){

          res.status(500).send("error ", error)


    }


}

module.exports={signup,login,logout,check};