const express = require('express');
const app = express();

const {connectToMongoDb} = require("./connect")
 const urlRoutes =require("./routes/url")
const URL = require('./models/url')
const PORT  =8001;~
connectToMongoDb("mongodb://127.0.0.1:27017/shortUrl").then(
    console.log("mongo Db is Connected")
);

app.use(express.json());

app.get("/:shortId", async (req, res) => {
    try {
        const shortId = req.params.shortId;
        // Assume URL is your Mongoose model
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: Date.now() // Push current date/time directly
                }
            }
        );
        if (!entry) {
            return res.status(404).send("Short URL not found");
        }
        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.use("/url",urlRoutes);
app.listen(PORT,()=>
console.log(`server is started at ${PORT}`));