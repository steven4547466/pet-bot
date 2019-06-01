var cooldowns = {}
module.exports.run = async(bot, message, prefix) =>{
  var args = message.content.split(" ").slice(1)
  if(!args[0]){
    return await message.channel.send("Please specify one of your pets")
  }
  const fs = require('fs');
  const Discord = require("discord.js")
  try{
    var playerpets = bot.playerpets.get(message.author.id)
    var playerstorage = bot.playerstorage.get(message.author.id)
    setTimeout(async function(){
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
      let cooldown = message.createdTimestamp + (1000 * 60 * 30)
      for(var p in playerpets){
        if(p == name){
          var q = playerpets
          var w = message.author.id
          var e = name
          if(!cooldowns[message.author.id]) cooldowns[message.author.id] = {}
          cooldowns[message.author.id][name] = {time: cooldown, day: new Date().getDay()}
          if(q[e].sit){
            delete cooldowns[message.author.id][name]
            return await message.channel.send("Your pet is with the sitter!")
          }
          var issue = []
          for(var sick in q[e].healthproblems){
            if(q[e].healthproblems[sick] == false){
              q[e].healthproblems[sick] = true;
              issue.push(sick)
            }
          }
          q[e].happiness -= 5
          var t = playerstorage
          var v = message.author.id
          var bal = t.balance - 100
          if(bal < 0){
            delete cooldowns[message.author.id][name]
            return await message.channel.send(`You have insufficient funds to take your pet to the vet`)
          }
          if(q[e].health != q[e].maxhp){
            var temphealth = q[e].health + 20
            if(temphealth > q[e].maxhp){
              q[e].health = q[e].maxhp
            }else{
              q[e].health = temphealth
            }
          }
          if(!q[e].usedin.includes(message.guild.id)) q[e].usedin.push(message.guild.id)
          bot.playerpets.set(message.author.id, q)
          t.balance -= 100
          bot.playerstorage.set(message.author.id, t)
          return await message.channel.send(`You took ${name.charAt(0).toUpperCase() + name.slice(1)} to the vet, and ${issue.join(", ") || "no"} health problem(s) were found!`)
        }
      }
      for(var id1 of bot.playerpets.fetchEverything()){
        try{
          var id = id1[0]
          var arr = bot.playerpets.get(id, `${name}.sharedto`) || []
          if(arr.includes(message.author.id)){
            console.log("yeet")
            var q = bot.playerpets.get(id)
            var e = name
            var issue = []
            for(var sick in q[e].healthproblems){
              if(q[e].healthproblems[sick] == false){
                q[e].healthproblems[sick] = true;
                issue.push(sick)
              }
            }
            if(q[e].sit){
              delete cooldowns[message.author.id][name]
              return await message.channel.send("Your pet is with the sitter!")
            }
            q[e].happiness -= 5
            var t = playerstorage
            var v = message.author.id
            var bal = t.balance - 100
            if(bal < 0){
              return await message.channel.send(`You have insufficient funds to take your pet to the vet`)
            }
            if(q[e].sit){
              return await message.channel.send("Your pet is with the sitter!")
            }
            if(q[e].health != q[e].maxhp){
              var temphealth = q[e].health + 10
              if(temphealth > q[e].maxhp){
                q[e].health = q[e].maxhp
              }else{
                q[e].health = temphealth
              }
            }
            bot.playerpets.set(id, q)
            t.balance -= 100
            bot.playerstorage.set(message.author.id, t)
            return await message.channel.send(`You took ${name.charAt(0).toUpperCase() + name.slice(1)} to the vet, and ${issue.join(", ") || "no"} health problem(s) were found!`)
          }
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
