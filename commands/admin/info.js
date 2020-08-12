const Pterodactyl = require('pterodactyl.js');
const { MessageEmbed } = require("discord.js")
var admin = require("firebase-admin");
module.exports = {
    config: {
        name: "info",
        description: "Gets the information of a certain user.",
        usage: "<user>",
        category: "admin",
        accessableby: "Admins"
    },
    run: async (bot, message, args) => {
        message.delete()
        //Check if used properly
        let targetUser = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username === args[0]) || message.guild.members.cache.get(args[0])
        if (!targetUser) targetUser = await message.guild.members.cache.get(message.author.id)

        //Check for user in DB
        const db = admin.firestore();
        let userID
        let docRef = await db.collection('guilds').doc(message.guild.id).collection('users').doc(targetUser.id)
        await docRef.get().then(async doc => {
            if (doc.exists) {
                userID = doc.data().id
                const node = require('nodeactyl');
                const Application = node.Application;

                Application.login('http://0.0.0.0/', 'REDACTED', (logged_in, err) => {
                    /** If you want call the function in here, 
                     * But we prefer you do have Application.login() at the top of your
                     * project and use the following syntax:
                     */
                });
                const infoEmbed = new MessageEmbed().setTitle(`${targetUser.user.username}'s Servers`).setDescription(`Here is a list of all the servers that ${targetUser.user.username} has access to:`).setColor(12745742)
                Application.getUserInfo(userID).then(async user => {
                    for (i = 0; i < user.relationships.servers.data.length; i++) {
                        infoEmbed.addField(`**Server ${i + 1}**`, `**Name:** ${user.relationships.servers.data[i].attributes.name}\n**Identifier:** ${user.relationships.servers.data[i].attributes.identifier}\n**Suspended:** ${user.relationships.servers.data[i].attributes.suspended}\n**Description:** ${user.relationships.servers.data[i].attributes.description}\n**Nest** ${user.relationships.servers.data[i].attributes.nest}`)
                    }
                    message.channel.send(infoEmbed)
                }).catch(err => {
                    console.log(err);
                })
            } else {
                const missingDatabaseEntry = new MessageEmbed().setTitle(`Missing User Profile`).setDescription(`${targetUser} is not registered in the database.`).setFooter(`Dax Services’ Manager Bot`).setColor(10038562)
                return message.channel.send(missingDatabaseEntry)
            }
        })

    }
}
