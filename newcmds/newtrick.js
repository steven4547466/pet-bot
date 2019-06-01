var cooldowns = {}
module.exports.run = async(bot, message, prefix) =>{
  let cooldown = message.createdTimestamp + (1000 * 60 * 20)
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
      var str = args.join(" ").toLowerCase()
      var name = str.split("|").shift().slice(0, -1);
      var trick = str.split("|").pop().slice(1);
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
      if(!trick){
        return await message.channel.send("Please specify a trick!")
      }
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
          if(!q[e].tricks){
            q[e].tricks = {}
            bot.playerpets.set(message.author.id, q)
          } 
          if(!q[e].tricks[trick]) q[e].tricks[trick] = 0
          if(q[e].tricks[trick] == 100){
            delete cooldowns[message.author.id][name]
            return await message.channel.send("Your pet is already full skill with that trick, they can now perform it to earn money")
          }
          if(!q[e].usedin.includes(message.guild.id)) q[e].usedin.push(message.guild.id)
          let rand = ~~(Math.random()*((5-1)+1))+1
          let rand2 = ~~(Math.random()*((100-1)+1))+1
          if(rand2 > 85){
            q[e].happiness -= 10
            q[e].health -= 20
            q[e].food -= 5
            q[e].water -= 7
            bot.playerpets.set(message.author.id, q)
            if(q[e].health <= 0){
              delete q[e]
              var nodm = JSON.parse(fs.readFileSync("./storage/dontdm.json", "utf8"))
              var y = nodm
              var x = message.author.id
              if(!y.dontdm.includes(x)){
                let type = q[e].type
                bot.users.get(w).send(`Your pet ${type} named ${pet.charAt(0).toUpperCase() + pet.slice(1)} has died! (To stop receiving these messages, reply stop)`)
              }
            }
            return await message.channel.send(`There was an accident! ${name.charAt(0).toUpperCase() + name.slice(1)} did not gain any skill on the trick.`)
          }
          q[e].tricks[trick] += rand
          if(q[e].socialization < 100){
            q[e].socialization += 10
          }
          if(q[e].happiness < 100){
            q[e].happiness += 2
          }
          if(q[e].tricks[trick] > 100){
            q[e].tricks[trick] = 100
            if(!playerstorage.achievements){
              playerstorage.achievements = {}
              bot.playerstorage.set(message.author.id, playerstorage)
            }
            if(!playerstorage.achievements["First trick."]){
              playerstorage.achievements["First trick."] = new Date()
              bot.playerstorage.set(message.author.id, playerstorage)
            }
            bot.playerpets.set(message.author.id, q)
            return await message.channel.send(`Congrats! ${name.charAt(0).toUpperCase() + name.slice(1)} is now fully taught ${trick}!`)
          }
          if(q[e].food <= 5 || q[e].water <= 5){
            delete cooldowns[message.author.id][name]
            return await message.reply(`${name.charAt(0).toUpperCase() + name.slice(1)} is dangerously low on food or water, you are unable to do this activity`)
          }
          q[e].food -= 2
          q[e].water -= 5
          bot.playerpets.set(message.author.id, q)
          return await message.channel.send(`You taught ${name.charAt(0).toUpperCase() + name.slice(1)} ${trick}, they are now ${q[e].tricks[trick]}% skilled with the trick!`)
        }
      }
      for(var id1 of bot.playerpets.fetchEverything()){
        try{
          var id = id1[0]
          try{
            var arr = bot.playerpets.get(id, `${name}.sharedto`) || []
            }catch(e){}
          if(arr.includes(message.author.id)){
            var q = bot.playerpets.get(id)
            var e = name
            if(!cooldowns[message.author.id]) cooldowns[message.author.id] = {}
            cooldowns[message.author.id][name] = {time: cooldown, day: new Date().getDay()}
            if(!q[e].tricks){
              q[e].tricks = {}
              bot.playerpets.set(id, q)
            } 
            if(!q[e].tricks[trick]) q[e].tricks[trick] = 0
            if(q[e].tricks[trick] == 100){
              delete cooldowns[message.author.id][name]
              return await message.channel.send("Your pet is already full skill with that trick, they can now perform it to earn money")
            }
            if(q[e].sit){
              delete cooldowns[message.author.id][name]
              return await message.channel.send("Your pet is with the sitter!")
            }
            let rand = ~~(Math.random()*((5-1)+1))+1
            let rand2 = ~~(Math.random()*((100-1)+1))+1
            if(rand2 > 75){
              q[e].happiness -= 10
              q[e].health -= 20
              q[e].food -= 5
              q[e].water -= 7
              bot.playerpets.set(id, q)
              if(q[e].health <= 0){
                let type = q[e].type
                delete q[e]
                bot.users.get(w).send(`Your pet ${type} named ${pet.charAt(0).toUpperCase() + pet.slice(1)} has died!`)
              }
              return await message.channel.send(`There was an accident! ${name.charAt(0).toUpperCase() + name.slice(1)} did not gain any skill on the trick.`)
            }
            q[e].tricks[trick] += rand
            if(q[e].socialization < 100){
              q[e].socialization += 10
            }
            if(q[e].happiness < 100){
              q[e].happiness += 2
            }
            if(q[e].tricks[trick] > 100){
              q[e].tricks[trick] = 100
              if(!playerstorage.achievements){
                playerstorage.achievements = {}
                bot.playerstorage.set(message.author.id, playerstorage)
              }
              if(!playerstorage.achievements["First trick."]){
                playerstorage.achievements["First trick."] = new Date()
                bot.playerstorage.set(message.author.id, playerstorage)
              }
              bot.playerpets.set(id, q)
              return await message.channel.send(`Congrats! ${name.charAt(0).toUpperCase() + name.slice(1)} is now fully taught ${trick}!`)
            }
            if(q[e].food <= 5 || q[e].water <= 5){
              delete cooldowns[message.author.id][name]
              return await message.reply(`${name.charAt(0).toUpperCase() + name.slice(1)} is dangerously low on food or water, you are unable to do this activity`)
            }
            q[e].food -= 2
            q[e].water -= 5
            bot.playerpets.set(id, q)
            return await message.channel.send(`You taught ${name.charAt(0).toUpperCase() + name.slice(1)} ${trick} they are now ${q[e].tricks[trick]}% skilled with the trick!`)
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
        }
      }
      return await message.channel.send(`Pet with name: ${name.charAt(0).toUpperCase() + name.slice(1)} non-existent. This error will happen if you don't follow the proper syntax: ${prefix}newtrick <pet> | <trick> the "|" is required!`)
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

module.exports.aliases = {
  aliases: ["nt"],
  command: "newtrick"
}

