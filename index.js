const { Client, Collection } = require("discord.js");
const { token } = require("./config.json");
const bot = new Client();
["aliases", "commands"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));
//Initiating the Database
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pterodactyl-bot.firebaseio.com"
});

bot.login(token);