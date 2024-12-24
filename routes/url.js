const { handleGenerateNewShortURL,handleRedirectUrl,handleAnalytics } = require ("../controller/url_controller");
const express = require("express");
const router = express.Router();

router.post("/",handleGenerateNewShortURL);
router.get("/:shortId",handleRedirectUrl);
router.get("/analytics/:shortId",handleAnalytics);


module.exports=router;

