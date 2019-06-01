module.exports.run = async(bot, message, prefix) =>{
  const Discord = require("discord.js")
  const fs = require('fs')
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return await message.channel.send("No permissions")
  if(!message.guild.me.hasPermission("MANAGE_CHANNELS") || !message.guild.me.hasPermission("MANAGE_ROLES")) return await message.channel.send("In order to execute that command, please give me the manage channels and manage roles permission.")
  if(!message.guild.channels.find(c => c.name == "pet-bot-announcements")) return await message.channel.send(`The channel doesn't exist! To enable it do ${prefix}enableannouncements`)
  var c = message.guild.channels.find(c => c.name == "pet-bot-announcements")
  c.delete()
  var id = JSON.parse(fs.readFileSync('./storage/announcements.json', "utf8"))
  var idx = id.ids.indexOf(c.id)
  id.ids.splice(idx)
  fs.writeFileSync("./storage/announcements.json", JSON.stringify(id))
  return message.channel.send("I have removed the channel, you can enable it again at any time")

};


module.exports.aliases = {
  aliases: ["da"],
  command: "disableannouncements"
}