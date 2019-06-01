const Discord = require("discord.js")
module.exports.run = async(bot, message, prefix) =>{
  const fs = require('fs');
  // const whitelistname = JSON.parse(fs.readFileSync("./storage/namewhitelist.json", "utf8")).names
  try{
    var adoptablepets = JSON.parse(fs.readFileSync("./storage/pets.json", "utf8"))
    setTimeout(async function(){
      var args = message.content.split(" ").slice(1)
      if(!args[0]){
        return await message.channel.send("You must provide a type of pet and a name")
      }
      var toAdopt = args[0].toLowerCase()
      if(!args || !toAdopt){
        return await message.channel.send("You must provide a type of pet and a name")
      }
      for(var p in adoptablepets){
        if(p == toAdopt){
          args.shift()
          var name = args.join(" ").toLowerCase().split(" | ")[0]
          let gender;
          if(name.split(" ")[name.split(" ").length - 1] == "male" || name.split(" ")[name.split(" ").length - 1] == "female"){
            gender = name.split(" ")[name.split(" ").length - 1]
            name = name.split(" ").slice(0, -1).join(" ")
            await message.channel.send("I have detected a gender in your pet's name, it will be converted automatically.")
          }
          if(name.length >= 50) return await message.channel.send("Names must be fewer than 51 characters")
          if(name && name.includes(",")) return await message.channel.send("Names cannot have a ',' in them")
          let testerino = bot.playerpets.get(message.author.id) || {}
          if(testerino[name]) return await message.channel.send("You already have a pet with that name")
          if(!gender) gender = args.join(" ").toLowerCase().split(" | ")[1]
          if(!gender){
            let rand = Math.random()
            if(rand > 0.5){ 
              gender = "male" 
            }else{
              gender = "female"
            }
          }
          if(gender != "male" && gender != "female") return await message.channel.send("Sorry, only male and female genders are allowed.")
          if(!name){
            return await message.channel.send("You must provide a type of pet and a name")
          }
          if(name.includes("|")) return await message.channel.send("Names cannot have the '|' character in them")
          let theirPets = bot.playerpets.get(message.author.id) || {}
          let allPets = Object.keys(theirPets).concat(await findSharedPets(message.author.id, bot))
          if(allPets.includes(name)) return await message.channel.send("You already have access to a pet with that name")
          // for(var i = 0; i < notAllowed.length; i++){
          //   if(name.includes(notAllowed[i]) && !name.includes("muf") && !name.includes("sassy") && !name.includes("peach")){
          //     var t = bot.playerstorage.get(message.author.id)
          //     t = t || {}
          //     if(!t["warnings"]) t["warnings"] = 0
          //     t["warnings"] += 1
          //     var warns = t["warnings"]
          //     bot.playerstorage.set(message.author.id, t)
          //     if(warns >= 2){
          //       var logs;
          //       var logs1 = message.channel.fetchMessages(50).then(mess =>{
          //         var messages = mess.filter(m => m.author.id == message.author.id)
          //         logs = messages.map(me => `${me.content}: ${me.createdAt}`)
          //       })
          //       setTimeout(function(){
          //         var blacklist = JSON.parse(fs.readFileSync("./storage/blacklist.json", "utf8"))
          //         let toBlacklist = message.author.id
          //         let reason = "Autoblacklist: Inappropriate names"
          //         var t = blacklist
          //         var v = toBlacklist
          //         t[v] = {}
          //         t[v].logs = logs
          //         t[v].reason = reason;
          //         if(message.author.id != "353782817777385472"){
          //           fs.writeFileSync('./storage/blacklist.json', JSON.stringify(t))
          //         }
          //       }, 1000)
          //       return await message.channel.send(`You have been auto blacklisted with the reason: Inappropriate names`)
          //     }
          //     return await message.channel.send(`Names like ${name} are not acceptable. You will be blacklisted if you attempt again`)
          //   }
          // }
          var t = bot.playerpets.get(message.author.id)
          t = t || {}
          var lifespan = Math.random() * (14 - 10) + 10
          t[name] = {
            type: toAdopt,
            gender: gender,
            health: 100,
            food: 100,
            water: 100,
            happiness: 100,
            age: 0,
            exercise: 100,
            socialization: 100,
            maxhp: 100,
            sharedto: [""],
            healthproblems: {},
            immunities: {},
            lifespan: lifespan,
            usedin: [message.guild.id]
          }
          bot.playerpets.set(message.author.id, t)
          var l = bot.playerstorage.get(message.author.id) || {}
          if(!l.balance){
            bot.playerstorage.delete(message.author.id)
            l = {}
            l["balance"] = 0
            l["warnings"] = l["warnings"] || 0
            l["achievements"] = {}
            bot.playerstorage.ensure(message.author.id, l)
          }
          if(!l.achievements){
            l.achievements = {}
            bot.playerstorage.set(message.author.id, l)
          }
          if(!l.achievements["Man's best friend."]){
            l.achievements["Man's best friend."] = new Date()
            bot.playerstorage.set(message.author.id, l)
          }
          if(Object.keys(bot.playerpets.get(message.author.id)).length >= 10){
            if(!l.achievements["There's never too many."]){
              l.achievements["There's never too many."] = new Date()
              bot.playerstorage.set(message.author.id, l)
            }
          }
          bot.events.emit('adopt', message.member, message.guild, name, t[name])
          return await message.channel.send(`You have adopted a ${gender} ${toAdopt} named ${name.charAt(0).toUpperCase() + name.slice(1)}`)
        }
      }
      var pets = []
      for(var p in adoptablepets){
        pets.push(p)
      }
      return await message.channel.send("Currently you can only adopt: " + pets.join(", "))
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

async function findSharedPets(id, bot){
  return new Promise((resolve, reject) => {
    let arr = []
    for(let [key, val] of bot.playerpets){
      let pets = val
      for(let pet in pets){
        try{
          if(pets[pet].sharedto.includes(id)) arr.push(pet)
        }catch(e){}
      }
    }
  return resolve(arr)
  })
}
