var cooldowns = {}
module.exports.run = async(bot, message, prefix) =>{
  if(cooldowns[message.author.id]){
    if(message.createdTimestamp < cooldowns[message.author.id]["time"]){
      let cooldownTime = cooldowns[message.author.id]["time"] - message.createdTimestamp
      let seconds = ~~(cooldownTime/1000)
      let minutes = ~~(cooldownTime/(1000 * 60))
      let hours = ~~(cooldownTime/(1000 * 60 * 60))
      if(hours >= 1){
        minutes %= 60
        while(minutes % 60 >= 60){
          minutes %= 60
        }
      }
      if(minutes >= 1){
        seconds %= 60;
        while(seconds % 60 >= 60){
          seconds %= 60
        }
      }
      return await message.channel.send(`Sorry ${message.guild.members.get(message.author.id).nickname || message.author.username}, that command is on cooldown for another ${hours} hour(s), ${minutes} minute(s) and ${seconds} second(s)`)
    }
  }
  let cooldown = message.createdTimestamp + (1000 * 60 * 0.5)
  cooldowns[message.author.id] = {time: cooldown}
  const fs = require('fs');
  const Discord = require("discord.js")
  try{
    var playerpets = bot.playerpets.get(message.author.id)
    var playerstorage = bot.playerstorage.get(message.author.id)
    setTimeout(async function(){
      var args = message.content.split(" ").slice(1)
      if(!args[0]){
        delete cooldowns[message.author.id]
        return await message.channel.send("Please specify one of your pets")
      }
      var str = args.join(" ").toLowerCase()
      var name = str
      for(var p in playerpets){
        if(p == name){
          var q = playerpets
          var w = message.author.id
          var e = name
          
          if(!q[e].tricks){ 
            q[e].tricks = {} 
             delete cooldowns[message.author.id]
            return await message.channel.send("Your pet doesn't know any tricks")
          }
          
          let tp = []
          for(var t in q[e].tricks){
            tp.push(t.charAt(0).toUpperCase() + t.slice(1) + ":")
            tp.push(q[e].tricks[t] + ",")
          }
          let trocks = tp.join(" ")
          return await message.channel.send(`${name.charAt(0).toUpperCase() + name.slice(1)}'s tricks: ${trocks.slice(0, -1)}`)
        }
      }
      for(var id1 of bot.playerpets.fetchEverything()){
        try{
          var id = id1[0]
          var arr = bot.playerpets.get(id, `${name}.sharedto`) || []
          console.log(arr)
          if(arr.includes(message.author.id)){
            console.log("yeet")
            var q = bot.playerpets.get(id)
            var e = name
            if(!q[e].tricks){ 
                  q[e].tricks = {} 
                   delete cooldowns[message.author.id]
                  return await message.channel.send("Your pet doesn't know any tricks")
                }
                
                let tp = []
                for(var t in q[e].tricks){
                  tp.push(t.charAt(0).toUpperCase() + t.slice(1) + ":")
                  tp.push(q[e].tricks[t] + ",")
                }
                let trocks = tp.join(" ")
                return await message.channel.send(`${name.charAt(0).toUpperCase() + name.slice(1)}'s tricks: ${trocks.slice(0, -1)}`)
          }
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
        }
        }
      delete cooldowns[message.author.id]
      return await message.channel.send(`Pet with name: ${name.charAt(0).toUpperCase() + name.slice(1)} non-existent`)
    }, 1000)
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
