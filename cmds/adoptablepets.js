const Discord = require("discord.js")
module.exports.run = async(bot, message, prefix) =>{
  const fs = require('fs');
  try{
    let args = message.content.toLowerCase().split(" ").slice(1)
    var adoptablepets = JSON.parse(fs.readFileSync("./storage/pets.json", "utf8"))
    if(args[0]){
      for(var p in adoptablepets){
        if(args[0] == p){
          return await message.channel.send(`Info on ${p.charAt(0).toUpperCase() + p.slice(1)}: ${adoptablepets[p].description}`)
        }
      }
      return await message.channel.send(`Pet: ${args[0]} not found, do ${prefix}adoptablepets to see all available pets`)
    }
    var pets = []
    for(var p in adoptablepets){
      pets.push(p.charAt(0).toUpperCase() + p.slice(1))
    }
    return await message.channel.send("Currently you can only adopt: " + pets.join(", "))
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


module.exports.aliases = {
  aliases: ["ap"],
  command: "adoptablepets"
}