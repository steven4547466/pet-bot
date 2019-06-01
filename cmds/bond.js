var cooldowns = {}
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
      if(cooldowns[message.author.id]){
        if(cooldowns[message.author.id][name]){
          if(message.createdTimestamp < cooldowns[message.author.id][name]["time"]){
            if((new Date().getDay() > cooldowns[message.author.id][name]["day"]) || (cooldowns[message.author.id][name]["day"] == 6 && new Date().getDay() == 0)){
  
            }else{
              let cooldownTime = cooldowns[message.author.id][name]["time"] - message.createdTimestamp
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
        }
      }
      let cooldown = message.createdTimestamp + (1000 * 60 * 5)
      for(var p in playerpets){
        if(p == name){
          var q = playerpets
          var e = name
          if(!cooldowns[message.author.id]) cooldowns[message.author.id] = {}
          cooldowns[message.author.id][name] = {time: cooldown, day: new Date().getDay()}
          if(q[e].sit){
            delete cooldowns[message.author.id][name]
            return await message.channel.send("Your pet is with the sitter!")
          }
          if(q[e].socialization < 100){
            q[e].socialization += 10
          }
          if(q[e].happiness < 100){
            q[e].happiness += 15
          }
          q[e].food -= 1
          q[e].water -= 1
          if(!q[e].usedin.includes(message.guild.id)) q[e].usedin.push(message.guild.id)
          bot.playerpets.set(message.author.id, q)
          var capname = name.charAt(0).toUpperCase() + name.slice(1)
          var responses = [
            `You spent time cuddling with ${capname}, it was a great bonding session`,
            `You played with ${capname}`,
            `You went shopping with ${capname}`,
            `You spent time petting ${capname}`,
            `You went swimming with ${capname}`
          ]
          var rand = ~~(Math.random() * ((responses.length)))
          return await message.channel.send(responses[rand])
        }
      }
      var pets1 = bot.playerpets.fetchEverything()
      for(var id1 of pets1){
        try{
          var id = id1[0]
          var arr = bot.playerpets.get(id, `${name}.sharedto`) || []
          if(arr.includes(message.author.id)){
            var q = bot.playerpets.get(id)
            var e = name
            if(!cooldowns[message.author.id]) cooldowns[message.author.id] = {}
            cooldowns[message.author.id][name] = {time: cooldown, day: new Date().getDay()}
            if(q[e].sit){
              delete cooldowns[message.author.id][name]
              return await message.channel.send("Your pet is with the sitter!")
            }
            if(q[e].socialization <= 100){
              q[e].socialization += 10
            }
            if(q[e].happiness <= 100){
              q[e].happiness += 15
            }
            q[e].food -= 1
            q[e].water -= 1
            bot.playerpets.set(id, q)
            var capname = name.charAt(0).toUpperCase() + name.slice(1)
            var responses = [
              `You spent time cuddling with ${capname}, it was a great bonding session`,
              `You played with ${capname}`,
              `You went shopping with ${capname}`,
              `You spent time petting ${capname}`,
              `You went swimming with ${capname}`
            ]
            var rand = ~~(Math.random() * ((responses.length)))
            return await message.channel.send(responses[rand])
          }
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
        }
      }
      return await message.channel.send(`Pet with name: ${name.charAt(0).toUpperCase() + name.slice(1)} non-existent or you have no access`)
    }, 1000)
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
