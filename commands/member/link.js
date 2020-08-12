const { MessageEmbed } = require("discord.js");
const Pterodactyl = require('pterodactyl.js');
var admin = require("firebase-admin");
module.exports = {
    config: {
        name: "link",
        usage: "<username> <email>",
        category: "member",
        description: "Links a user's account to themselves.",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        message.delete()
        if (!args[0] || !args[1]) {
            const failMsg = new MessageEmbed().setTitle('Invalid Command').setDescription('Please use: ```!link <username> <email>``` to link your account').setColor(10038562)
            return message.channel.send(failMsg)
        }
        const client = new Pterodactyl.Builder()
            .setURL('http://139.99.134.53/')
            .setAPIKey('m2Za9VIzcD2nPFtrCUlv9Gl0IbKVkqeAt7ZjWb6L8mfn1OsF')
            .asAdmin();

        let isAccountCredentials = (username, email) => {
            return new Promise((resolve, reject) => {
                client.getUsers()
                    .then(async users => {
                        let user = users.filter(user => user.username === username);
                        if (user.length > 0) {
                            if (user[0].email === email) {
                                resolve({ correct: true, user });
                            } else {
                                resolve({ correct: false });
                            }
                        } else {
                            message.channel.send(new MessageEmbed().setTitle('Incorrect!').setDescription('The username provided is invalid').setColor(10038562));
                        }
                    }).catch(error => reject(error));
            });
        };

        isAccountCredentials(args[0], args[1]).then(async account => {
            if (account.correct) {
                message.channel.send(new MessageEmbed().setTitle('Correct!').setDescription('The username and email provided are valid.\nThe account has now been linked to your discord.').setColor(12745742));
                //Store Info in DB
                const db = admin.firestore();
                await db.collection('guilds').doc(message.guild.id).collection('users').doc(message.author.id).set({
                    'id': message.author.id,
                    'username': args[0],
                    'email': args[1],
                    'pteroID': account.user[0].id
                })
            } else {
                message.channel.send(new MessageEmbed().setTitle('Incorrect!').setDescription('The username and email provided do not match.').setColor(10038562));
            }
        }).catch(error => console.log(error));
    }
}