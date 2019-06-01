module.exports.run = async(bot, message, prefix) =>{
  const fs = require('fs');
  const Discord = require("discord.js")
  try{
    var playerpets = bot.playerpets.get(message.author.id)
    var playerstorage = JSON.parse(fs.readFileSync("./storage/playerstorage.json", "utf8"))
    setTimeout(async function(){
      var args = message.content.split(" ").slice(1)
      if(!args[0]){
        return await message.channel.send("Please specify one of your pets")
      }
      var str = args.join(" ").toLowerCase()
      var name = str.split("|").shift().slice(0, -1);
      if(!message.mentions.members) return await message.channel.send("Please mention a member!")
      var shareto = message.mentions.members.first()
      for(var p in playerpets){
        if(p == name){
          var q = playerpets
          var w = message.author.id
          var e = name
          if(!q[e].sharedto) q[e].sharedto = []
           if(q[e].sharedto.indexOf(shareto.id)  < 0){
            return await message.channel.send("They can't access your pet anyways")
          }
          var idx = q[e].sharedto.indexOf(shareto.id)
          delete q[e].sharedto.splice(idx, 1)
          bot.playerpets.set(message.author.id, q)
          return await message.channel.send(`You disallowed ${shareto.displayName} to access your pet named: ${name.charAt(0).toUpperCase() + name.slice(1)}`)
        }
      }
      
      return await message.channel.send(`Pet with name: ${name.charAt(0).toUpperCase() + name.slice(1)} non-existent`)
    }, 1000)
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
