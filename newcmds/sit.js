module.exports.run = async(bot, message, prefix) =>{
  const fs = require('fs');
  const Discord = require("discord.js")
  try{
    var playerpets = bot.playerpets.get(message.author.id)
    var playerstorage = bot.playerstorage.get(message.author.id)
    setTimeout(async function(){
      var args = message.content.split(" ").slice(1)
      if(!args[0]){
        return await message.channel.send("Please specify one of your pets")
      }
      var name = args.join(" ").toLowerCase()
      for(var p in playerpets){
        if(p == name){
          var q = playerpets
          var w = message.author.id
          var e = name
          if(!q[e].sit){
            q[e].sit = true
            var t = playerstorage
            t.balance -= 50;
            bot.playerstorage.set(message.author.id, t)
            await message.channel.send(`You took ${name.charAt(0).toUpperCase() + name.slice(1)} to sitter, do this command again to retrieve them (it costs $50 per hour).`)
          }else{
            q[e].sit = false
            await message.channel.send(`You got ${name.charAt(0).toUpperCase() + name.slice(1)} from the sitter.`)
          }
          if(!q[e].usedin.includes(message.guild.id)) q[e].usedin.push(message.guild.id)
          bot.playerpets.set(message.author.id, q)
          return
        }
      }
      return await message.channel.send(`Pet with name: ${name.charAt(0).toUpperCase() + name.slice(1)} non-existent`)
    }, 200)
  }catch(err){
    let channel = bot.channels.get("530418022465273867")
      channel.send("Mate, there was an error somewhere")
      let embed = new Discord.MessageEmbed()
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
