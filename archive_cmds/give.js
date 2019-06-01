module.exports.run = async(bot, message, prefix) =>{
  const fs = require('fs');
  const Discord = require("discord.js")
  try{
    var playerpets = bot.playerpets.get(message.author.id)
    var playerstorage = bot.playerstorage.get(message.author.id)
    var pets = JSON.parse(fs.readFileSync("./storage/pets.json", "utf8"))
    setTimeout(async function(){
      var args = message.content.split(" ").slice(1)
      if(!args[0]){
        return await message.channel.send("Please specify one of your pets")
      }
      if(message.mentions.members.first()){
        args = message.content.split(" ").slice(3).join(" ").toLowerCase()
        let user = message.mentions.members.first()
        if(parseInt(args)){
          args = parseInt(args)
          let storage = await bot.playerstorage.get(user.id) || {}
          if(playerstorage.balance - args < 0) return await message.channel.send("You can't afford this")
          storage.balance += args
          playerstorage.balance -= args
          bot.playerstorage.set(message.author.id, playerstorage)
          bot.playerstorage.set(user.id, storage)
          return await message.channel.send(`You gave ${user.displayName} $${args}`)
        }
        let playerpets2 = Object.keys(bot.playerpets.get(user.id) || {}) || []
        let j = playerpets2.concat(await findSharedPets(user.id, bot)) || {}
        let otherpets = bot.playerpets.get(user.id) || {}
        var name = args
        if(playerpets[name]){
          if(j.includes(name)) return await message.channel.send("This user already has a pet with that name!")
          let t = playerpets[name]
          otherpets[name] = t
          let m = await message.channel.send(`${user.toString()} would you like to accept ${message.author.toString()}'s pet?`)
          setTimeout(async () => {
            await m.react("✅").then(async () => {
              await m.react("❌")
            })
            const filter = (reaction, user1) => (reaction.emoji.name == '✅' || reaction.emoji.name == '❌') && user1.id === user.id
            m.awaitReactions(filter, {time: 60000, max: 1})
            .then(async (collected) => {
              console.log(collected.first())
              if(collected.first().emoji.name == '✅'){
                await message.channel.send("You have accepted the pet")
                bot.playerpets.delete(message.author.id, name)
                return bot.playerpets.set(user.id, otherpets)
              }else{
                return await message.channel.send("You did not accept the pet")
              }
            })
            .catch(console.error)
          }, 1000)
          return
        }
      }else{
        var str = args.join(" ").toLowerCase()
        var name = str.split("|").shift().slice(0, -1);
        var item = str.split("|").pop().slice(1);
        if(!item) return await message.channel.send("Please include an item")
        if(item == "water" || item == "food") return await message.channel.send(`Please use ${prefix}water (pet) or ${prefix}feed (pet) to feed or water your pets.`)
        for(var p in playerpets){
          if(p == name){
            var q = playerpets
            var e = name
            if(q[e].sit){
              return await message.channel.send("Your pet is with the sitter!")
            }
            if(!playerstorage.items){
              return await message.channel.send(`You have no items, make sure you buy some!`)
            }
            if(playerstorage.items[item] && playerstorage.items[item] >= 1){
              let type = q[e].type
              if(pets[type].cantgive.includes(item)){
                return await message.channel.send(`Why did you try to give your ${type} a(n) ${item}?`)
              }
              if(item == "heartworm prevention"){
                if(!q[e].immunities) q[e].immunities = {}
                q[e].immunities["heartworm"] = true
              }
              if(item == "heartworm treatment"){
                if(!q[e].immunities) q[e].immunities = {}
                q[e].immunities["heartworm"] = true
                try{
                  delete q[e].healthproblems["heartworm"]
                }catch(err){}
              }
              if(item == "lotion"){
                try{
                  delete q[e].healthproblems["skin allergies"]
                }catch(err){}
              }
              if(item == "flea collar"){
                if(!q[e].immunities) q[e].immunities = {}
                q[e].immunities["fleas"] = true
                try{
                  delete q[e].healthproblems["fleas"]
                }catch(err){}
              }
              if(item == "bone"){
                q[e].happiness += 10
                q[e].food += 5
              }
              if(item == "ball"){
                q[e].happiness += 15
              }
              if(item == "yarn"){
                q[e].happiness += 15
              }
              if(item == "plush"){
                q[e].happiness += 20
                q[e].socialization += 10
              }
              if(item == "scratching post"){
                q[e].happiness += 15
              }
              if(item == "laser pointer"){
                q[e].socialization += 10
                q[e].happiness += 10
              }
              if(item == "stick"){
                q[e].socialization += 5
                q[e].happiness += 5
              }
              if(!q[e].usedin.includes(message.guild.id)) q[e].usedin.push(message.guild.id)
              bot.playerpets.set(message.author.id, q)
              var t = playerstorage
              t.items[item] -= 1
              if(t.items[item] <= 0){
                delete t.items[item]
              }
              bot.playerstorage.set(message.author.id, t)
              return await message.channel.send(`Successfully gave ${name.charAt(0).toUpperCase() + name.slice(1)} a(n) ${item}.`)
            }else{
              return await message.channel.send(`You are all out of ${item}.`)
            }
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
              if(q[e].sit){
                return await message.channel.send("Your pet is with the sitter!")
              }
              if(playerstorage.items[item] && playerstorage.items[item] >= 1){
                if(item == "heartworm prevention"){
                  if(!q[e].immunities) q[e].immunities = {}
                  q[e].immunities["heartworm"] = true
                }
                if(item == "heartworm treatment"){
                  if(!q[e].immunities) q[e].immunities = {}
                  q[e].immunities["heartworm"] = true
                  delete q[e].healthproblems["heartworm"]
                }
                if(item == "lotion"){
                  delete q[e].healthproblems["skin allergies"]
                }
                if(item == "flea collar"){
                  if(!q[e].immunities) q[e].immunities = {}
                  q[e].immunities["fleas"] = true
                  try{
                    delete q[e].healthproblems["fleas"]
                  }catch(err){}
                }
                if(item == "bone"){
                  q[e].happiness += 10
                  q[e].food += 5
                }
                if(item == "ball"){
                  q[e].happiness += 15
                }
                if(item == "yarn"){
                  q[e].happiness += 15
                }
                if(item == "plush"){
                  q[e].happiness += 20
                  q[e].socialization += 10
                }
                if(item == "scratching post"){
                  q[e].happiness += 15
                }
                if(item == "laser pointer"){
                  q[e].socialization += 10
                  q[e].happiness += 10
                }
                if(item == "stick"){
                  q[e].socialization += 5
                  q[e].happiness += 5
                }
                bot.playerpets.set(id, q)
                var t = playerstorage
                t.items[item] -= 1
                if(t.items[item] == 0){
                  delete t.items[item]
                }
                bot.playerstorage.set(message.author.id, t)
                return await message.channel.send(`Successfully gave ${name.charAt(0).toUpperCase() + name.slice(1)} ${item}.`)
              }else{
                return await message.channel.send(`You are all out of ${item}.`)
              }
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

      }
      return await message.channel.send(`Pet with name: ${name.charAt(0).toUpperCase() + name.slice(1)} non-existent or you have no access. This error will happen if you don't follow the proper syntax: ${prefix}give <pet OR @user> | <item OR pet> the "|" is required!`)
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
