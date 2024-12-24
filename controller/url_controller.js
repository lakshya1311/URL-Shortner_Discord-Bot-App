const URL = require("../models/url");
const shortid = require("shortid");

async function handleGenerateNewShortURL(req,res){
    const shortID = shortid();
    const body = req.body;

    if(!body.url)
        return res.status(400).json({ error : "url is required"});

    

    await URL.create({
        shortId : shortID,
        redirectURL: body.url,
        visitHistory:[],
        createdBy:req.user.id
    });

    return res.render("home",{
        shortId : shortID
    });
}

async function handleRedirectUrl(req,res){
    
    const url = req.baseUrl.slice(1);
    
    const entry = await URL.findOneAndUpdate( {shortId:req.params.shortId},
        { $push:{ visitHistory : 
            { timestamp : Date.now() }
                }
        });
    console.log(entry);

    return res.redirect(entry.redirectURL);
}

async function handleAnalytics(req, res){
    var entry = await URL.findOne({shortId:req.params.shortId});
    return res.status(200).json({
        clicks : entry.visitHistory.length,
        analytics:entry.visitHistory
    });
}

module.exports={
    handleGenerateNewShortURL,handleRedirectUrl,handleAnalytics
}