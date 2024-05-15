const express = require("express");
const {HandleGenrateNewShortUrl}=require ("../controllers/url")
const router = express.Router();

router.post("/",HandleGenrateNewShortUrl);

module.exports=router;