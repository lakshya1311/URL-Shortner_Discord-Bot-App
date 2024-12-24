const {getUser}= require("../services/auth");

async function restrictToLoggedInUser(req,res,next){
    const userUid=req.cookies?.uid;
    if(!userUid)
        return res.redirect("/login");

    const user = getUser(userUid);

    if(!user)
        return res.redirect("/login");

    req.user=user;
    return next();
}

function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user)
            return res.redirect("/login");
    
        if(!roles.includes(req.user.role))
            return res.end("UNAUTHORIZED");
    
        return next();
    };
}


module.exports={
    restrictToLoggedInUser,restrictTo
};