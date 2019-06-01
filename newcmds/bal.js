const Discord = require("discord.js")
module.exports.run = async(bot, message, prefix) =>{
  const fs = require('fs');
  try{
    var t = bot.playerstorage.get(message.author.id)
    var v = "balance"
    var bal = t[v]
    if(!bal) return await message.channel.send("No balance found!")
    return await message.reply(`You have a total of $${bal.toFixed(2)}`)
  }catch(err){
    let embed = new Discord.MessageEmbed()
    .setTitle("New Error")
    .setColor("#ff0000")
    .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
    .setFooter(`Error on shard: ${bot.shard.id}`)
    // bot.webhookRequests.push(embed)
    if(!bot.webhookId){
      // bot.webhookId = setInterval(bot.sendHooks, 1000)
    }
    console.log(err)
  }
};
