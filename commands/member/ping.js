const {MessageEmbed} = require("discord.js")
const ms = require('ms')
module.exports = {
    config: {
        name: "ping",
        description: "Displays the api & bot latency",
        usage: "",
        category: "member",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        message.delete()
		let sEmbed = new MessageEmbed()
            .setColor(12745742)
            .setTitle("Pinging...")
       
        message.channel.send(sEmbed).then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp
            sEmbed.setDescription(`Bot Latency: \`${ping}\`, API Latency: \`${Math.round(bot.ws.ping)}\`, Uptime: \`${ms(bot.uptime)}\``)
            m.edit(sEmbed)
        })
    }
}