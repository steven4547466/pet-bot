module.exports.run = async(bot, message, prefix) =>{
  const Discord = require("discord.js")
  const fs = require('fs')
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return await message.channel.send("No permissions")
  if(!message.guild.me.hasPermission("MANAGE_CHANNELS") || !message.guild.me.hasPermission("MANAGE_ROLES")) return await message.channel.send("In order to execute that command, please give me the manage channels and manage roles permission.")
  if(message.guild.channels.find(c => c.name == "pet-bot-announcements")) return await message.channel.send(`The channel already exists! To remove it do ${prefix}disableannouncements`)
  message.guild.createChannel("pet-bot-announcements", "text").then(c => {
    let everyone = message.guild.roles.find(role => role.name === "@everyone");
    let bot1 = message.guild.me.user
    c.overwritePermissions(everyone, {
      "SEND_MESSAGES": false
    })
    c.overwritePermissions(bot1, {
      "SEND_MESSAGES": true
    })
    var id = JSON.parse(fs.readFileSync('./storage/announcements.json', "utf8"))
    id.ids.push(c.id)
    fs.writeFileSync("./storage/announcements.json", JSON.stringify(id))
    return message.channel.send("I have created the channel, don't change the name, you can edit permissions and position, however")
  })
};

module.exports.aliases = {
  aliases: ["ea"],
  command: "enableannouncements"
}