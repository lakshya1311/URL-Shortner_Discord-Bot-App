const express = require("express");
const URL = require("../models/url");
 const {getUser}=require("../services/auth");
const { restrictTo,restrictToLoggedInUser } = require("../middlewares/auth_middleware");

const router = express.Router();

router.get("/admin",restrictToLoggedInUser,restrictTo(["ADMIN"]), async (req,res)=>{
    const allUrls = await URL.find({});
    return res.render("home",{
        urls:allUrls
    });
});

router.get("/",restrictToLoggedInUser,async (req,res)=>{

    const token = getUser(req.cookies.uid);
    // console.log(req);
    
    const allUrls = await URL.find({
        createdBy:req.user.id
    });

         return res.render("home",{
             urls:allUrls
         });
    });

router.get("/login",(req,res)=>{
    return res.render("login");
});
router.get("/signup",(req,res)=>{
    return res.render("signup");
});

module.exports=router;