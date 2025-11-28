const jwt=require("jsonwebtoken");
const User =require("../models/user.model.js")



const protectRoute=async(req,res,next)=>{

    try{

        const token = req.cookies.jwt;  // ✔ correct

         if (!token) {
      return res.status(401).json({ error: "Not authorized" });
    }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){

              return res.status(401).json({ error: "Invalid Token" });


        }

        const user =await User.findById(decoded.id).select("-password");

        if(!user){

            return res.status(404).json({message:"user not found"});
        }

        req.user=user;

    next();

      
    }catch(error){

        console.log("Error in protectRoute middleware",error.message);

         return res.status(500).json({ error: "Internal Server Error" });



    }

  







}

module.exports=protectRoute;