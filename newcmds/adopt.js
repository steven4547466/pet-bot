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
          var t = await bot.db.collection('pets').findOne({id:message.author.id})
          t = t.storage || {}
          let theirPets = t
          let allPets = Object.keys(theirPets).concat(await bot.findSharedPets(message.author.id))
          if(allPets.includes(name)) return await message.channel.send("You already have access to a pet with that name")
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
          await bot.db.collection('pets').findOneAndUpdate({id:message.author.id}, {$set:{storage:t}}, {upsert:true})
          let l = await bot.db.collection('users').findOne({id:message.author.id})
          if(l){
            l = await l.storage || {}
          }
          if(!l.balance){
            l = {}
            l["balance"] = 0
            l["warnings"] = l["warnings"] || 0
            l["achievements"] = {}
            bot.db.collection('users').insertOne({id:message.author.id, storage: l})
          }
          if(!l.achievements){
            l.achievements = {}
            bot.db.collection('users').findOneAndUpdate({id:message.author.id}, {$set:{storage: l}})
          }
          if(!l.achievements["Man's best friend."]){
            l.achievements["Man's best friend."] = new Date()
            bot.db.collection('users').findOneAndUpdate({id:message.author.id}, {$set:{storage: l}})
          }
          if(Object.keys(bot.playerpets.get(message.author.id)).length >= 10){
            if(!l.achievements["There's never too many."]){
              l.achievements["There's never too many."] = new Date()
              bot.db.collection('users').findOneAndUpdate({id:message.author.id}, {$set:{storage: l}})
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
    // .setFooter(`Error on shard: ${bot.shard.id}`)
    // bot.webhookRequests.push(embed)
    if(!bot.webhookId){
      // bot.webhookId = setInterval(bot.sendHooks, 1000)
    }
    console.log(err)
  }
};