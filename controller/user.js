const {User}= require("../models/user_model");
const { setUser } = require("../services/auth");

async function handleUserSignup(req,res) {

    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    });

    return res.render("home");
}

async function handleUserLogin(req,res){
    const{email,password}= req.body;
    const user = await User.findOne({
        email:email,
        password:password
    });

    if(!user){
        console.log("Error in finding user in handleUserLogin");
        return res.render("login",{
        error:"Invalid email or password"
        });
    }

    const token = setUser(user);
    res.cookie("uid",token);
    return res.redirect("/");
}

module.exports={
    handleUserSignup,handleUserLogin
}