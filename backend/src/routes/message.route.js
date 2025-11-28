const express=require("express");
const protectRoute=require("../middleware/auth.middleware.js");
const {getUsersForSideBar, getMessages,sendMessage}=require("../controllers/message.controller.js")

const messageRouter=express.Router();

messageRouter.get("/users",protectRoute,getUsersForSideBar);
messageRouter.get("/:id",protectRoute, getMessages);
messageRouter.post("/send/:id",protectRoute,sendMessage );




module.exports=messageRouter;