const express = require("express");
const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const  DISCORD_TOKEN  = process.env.DISCORD_TOKEN;
const  MONGO_URL  = process.env.MONGO_URL;
const { connectToMongoDb } = require("./connect");
const shortid = require("shortid");
const URL = require("./models/url");
const PORT = process.env.PORT;

const path = require("path");

const staticRouter = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");

const {restrictToLoggedInUser,restrictTo} = require("./middlewares/auth_middleware");

const app = express();
// const PORT = 8001;

connectToMongoDb(MONGO_URL).then(()=>{
    console.log("Database Connected");
});

app.set("view engine","ejs");    
app.set("views",path.resolve("./views"));   // telling where ejs files are

app.use(express.json());  // to parse json data
app.use(express.urlencoded({extended:false}));  // to parse form data
app.use(cookieParser()); // to parse cookeis

app.use("/url",restrictToLoggedInUser,restrictTo(["NORMAL","ADMIN"]),urlRoute);
app.use("/user",userRoute);
app.use("/",staticRouter);

app.listen(PORT,()=>{
    console.log(`Server started at PORT - ${PORT}`);
})



// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMessages] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


//message actions
client.on("messageCreate",async message=>{
    if(message.author.bot)
        return;
    
    else if(message.content.startsWith("create"))
    {
        const url = message.content.split("create")[1].trim();
        const shortID = shortid();
        await URL.create({
            shortId : shortID,
            redirectURL: url,
            visitHistory:[],
        });
        return message.reply({
            content:`Short Url for the above URL is - http://localhost:${PORT}/url/`+shortID
        });
    }

    message.reply("Hi from Lakshya's Bot");
});

// Log in to Discord with your client's token
client.login(DISCORD_TOKEN);