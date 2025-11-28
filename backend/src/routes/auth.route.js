const express=require('express');

const {signup,login,logout,check}=require("../controllers/auth.controller.js");

const router=express.Router();


module.exports= router;


router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.post("/check",check);