const Discord = require('discord.js')
module.exports.run = async(bot, message, prefix) =>{
  const fs = require('fs');
  try{
    var args = message.content.split(" ").slice(1)
    if(!args[0]){
      return await message.channel.send("You must provide a pet")
    }
    var playerpets = bot.playerpets.get(message.author.id)
    var name = args.join(" ").toLowerCase()
    if(!name){
      return await message.channel.send("You must provide a type of pet and a name")
    }
    for(var p in playerpets){
      if(p == name){
        bot.playerpets.delete(message.author.id, name)
        return await message.channel.send(`You have removed your pet named ${name.charAt(0).toUpperCase() + name.slice(1)}`)
      }
    }
    return await message.channel.send(`Pet with name ${name} non-existent`)
  }catch(err){
    let channel = bot.channels.get("530418022465273867")
    channel.send("Mate, there was an error somewhere")
    let embed = new Discord.RichEmbed()
    .setTitle("Bad coding = error")
    .setDescription("F to pay respects")
    .setColor("#ff0000")
    .addField("Author", `${message.author.username} AKA ${message.member.nickname || "no nick cuz lame"}`)
    .addField("Message", message.content)
    .addField("Got this error bro", err)
    channel.send(embed)
    console.log(err)
  }
};
