module.exports = async bot => {
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("User Commands", { type: 'WATCHING' });
}