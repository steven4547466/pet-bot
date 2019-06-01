var cooldowns = {}
module.exports.run = async(bot, message, prefix) =>{
  const fs = require('fs');
  const Discord = require("discord.js")
  const petstorage = JSON.parse(fs.readFileSync("./storage/pets.json", "utf8"))
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
      let cooldown = message.createdTimestamp + (1000 * 60 * 20)
      for(var p in playerpets){
        if(p == name){
          var q = playerpets
          var w = message.author.id
          var e = name
          if(!cooldowns[message.author.id]) cooldowns[message.author.id] = {}
          cooldowns[message.author.id][name] = {time: cooldown, day: new Date().getDay()}
          if(!q[e]) return await message.channel.send("Pet doesnt exist!")
          if(q[e].sit){
            delete cooldowns[message.author.id][name]
            return await message.channel.send("Your pet is with the sitter!")
          }
          let type = q[e].type
          try{

            var string = petstorage[type]["cantdo"].join(" ")
            console.log(string)
            if(string.includes("park")){ 
              delete cooldowns[message.author.id][name]
              return await message.channel.send(`You can't take your ${type} to a park`) 
            }
          }catch(err){}
          if(q[e].socialization < 100){
            q[e].socialization += 10
          }
          if(q[e].happiness < 100){
            q[e].happiness += 2
          }
          if(q[e].food <= 5 || q[e].water <= 5){
            return await message.reply(`${name.charAt(0).toUpperCase() + name.slice(1)} is dangerously low on food or water, you are unable to do this activity`)
          }
          q[e].food -= 1
          q[e].water -= 3
          if(!q[e].usedin.includes(message.guild.id)) q[e].usedin.push(message.guild.id)
          try{
            var arr = petstorage[type]["cantdevelop"]
            var gen = ~~(Math.random()*((100-1)+1))+1

            if(gen > 60){
              if(!arr.includes("fleas")){
                if(!q[e].healthproblems) q[e].healthproblems = {}
                if(!q[e].immunities) q[e].immunities = {}
                if(!q[e].healthproblems["fleas"] && !q[e].immunities["fleas"]) q[e].healthproblems["fleas"] = true
              }
            }
          }catch(err){}
          bot.playerpets.set(message.author.id, q)
          return await message.channel.send(`You took ${name.charAt(0).toUpperCase() + name.slice(1)} to the park and they loved it!`)
        }
      }
      for(var id1 of bot.playerpets.fetchEverything()){
        try{
          var id = id1[0]
          try{
            var arr = bot.playerpets.get(id, `${name}.sharedto`) || []
            }catch(e){}
          console.log(arr)
          if(arr.includes(message.author.id)){
            console.log("yeet")
            var q = bot.playerpets.get(id)
            var e = name
            if(!cooldowns[message.author.id]) cooldowns[message.author.id] = {}
            cooldowns[message.author.id][name] = {time: cooldown, day: new Date().getDay()}
            if(q[e].sit){
              delete cooldowns[message.author.id][name]
              return await message.channel.send("Your pet is with the sitter!")
            }
            try{
              var string = petstorage[type]["cantdo"].join(" ")
              console.log(string)
              if(string.includes("park")){ 
                delete cooldowns[message.author.id][name]
                return await message.channel.send(`You can't take your ${type} to a park`) 
              }
            }catch(err){}
            if(q[e].socialization < 100){
              q[e].socialization += 10
            }
            if(q[e].happiness < 100){
              q[e].happiness += 2
            }
            if(q[e].food <= 5 || q[e].water <= 5){
              return await message.reply(`${name.charAt(0).toUpperCase() + name.slice(1)} is dangerously low on food or water, you are unable to do this activity`)
            }
            q[e].food -= 1
            q[e].water -= 3
            bot.playerpets.set(id, q)
            return await message.channel.send(`You took ${name.charAt(0).toUpperCase() + name.slice(1)} to the park and they loved it!`)
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
