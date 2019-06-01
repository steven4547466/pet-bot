module.exports.run = async(bot, message, prefix) =>{
  const fs = require('fs');
  const Discord = require("discord.js")
  try{
    var playerpets = bot.playerpets.get(message.author.id)
    var playerstorage = bot.playerstorage.get(message.author.id)
    setTimeout(async function(){
      var args = message.content.toLowerCase().split(" ").slice(1)
      if(!args[0]){
        return await message.channel.send("Please specify one of your pets")
      }
      var name = args.slice(0, -1).join(" ");
      var num = args[args.length - 1];
      if(name.length < 1){ 
        name = num
        num = 1
      }
      if(!playerpets) return await message.channel.send("Could not find any pets")
      if(!playerpets[name]){
        name = name + " " + num
        num = 1
        let tempnum
        if(!playerpets[name]){
          name = name.split(" ").slice(0, -1).join(" ")
          tempnum = parseInt(args[args.length - 1]);
          if(Number.isInteger(tempnum)){ 
            let pet = await findSharedPet(message.author.id, bot, name)
            try{
              if(pet){
                let id = pet.id
                var q = bot.playerpets.get(id)
                var e = name
                if(playerstorage.items.water && playerstorage.items.water >= tempnum){
                  if(q[e].water >= 100) return await message.channel.send("Your pet is already hydrated!")
                  if(q[e].sit){
                    return await message.channel.send("Your pet is with the sitter!")
                  }
                  if(!playerstorage.achievements){
                    playerstorage.achievements = {}
                    bot.playerstorage.set(message.author.id, playerstorage)
                  }
                  if(!playerstorage.achievements["Sustenance."]){
                    playerstorage.achievements["Sustenance."] = new Date()
                    bot.playerstorage.set(message.author.id, playerstorage)
                  }
                  if(q[e].happiness < 100){
                    q[e].happiness += 2
                  }
                  q[e].water += 20 * tempnum
                  if(q[e].water >= 160) return await message.channel.send("Don't over-water your pet!")
                  if(!q[e].usedin.includes(message.guild.id)) q[e].usedin.push(message.guild.id)
                  bot.playerpets.set(id, q)
                  var t = playerstorage
                  var v = message.author.id
                  t.items.water -= num
                  bot.playerstorage.set(message.author.id, t)
                  return await message.channel.send(`Successfully gave ${name.charAt(0).toUpperCase() + name.slice(1)} water.`)
                }else{
                  return await message.channel.send(`You don't have enough water.`)
                }
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
          }else{
            name = args.join(" ")
            num = 1
            let pet = await findSharedPet(message.author.id, bot, name)
            try{
              if(pet){
                let id = pet.id
                let q = bot.playerpets.get(id)
                let e = name
                if(playerstorage.items.water && playerstorage.items.water >= num){
                  if(q[e].water >= 100) return await message.channel.send("Your pet is already hydrated!")
                  if(q[e].sit){
                    return await message.channel.send("Your pet is with the sitter!")
                  }
                  if(!playerstorage.achievements){
                    playerstorage.achievements = {}
                    bot.playerstorage.set(message.author.id, playerstorage)
                  }
                  if(!playerstorage.achievements["Sustenance."]){
                    playerstorage.achievements["Sustenance."] = new Date()
                    bot.playerstorage.set(message.author.id, playerstorage)
                  }
                  if(q[e].happiness < 100){
                    q[e].happiness += 2
                  }
                  q[e].water += 20 * num
                  if(q[e].water >= 160) return await message.channel.send("Don't over-water your pet!")
                  bot.playerpets.set(id, q)
                  var t = playerstorage
                  var v = message.author.id
                  t.items.water -= num
                  bot.playerstorage.set(message.author.id, t)
                  return await message.channel.send(`Successfully gave ${name.charAt(0).toUpperCase() + name.slice(1)} water.`)
                }else{
                  return await message.channel.send(`You don't have enough water.`)
                }
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
        }
      }else {
        num = parseInt(num)
      }
      for(var p in playerpets){
        if(p == name){
          var q = playerpets
          var w = message.author.id
          var e = name
          if(q[e].sit){
            return await message.channel.send("Your pet is with the sitter!")
          }
          if(!playerstorage.items){
            return await message.channel.send(`You have no items, make sure you buy some!`)
          }
          if(!playerstorage.achievements){
            playerstorage.achievements = {}
            bot.playerstorage.set(message.author.id, playerstorage)
          }
          if(!playerstorage.achievements["Sustenance."]){
            playerstorage.achievements["Sustenance."] = new Date()
            bot.playerstorage.set(message.author.id, playerstorage)
          }
          if(playerstorage.items.water && playerstorage.items.water >= num){
            if(q[e].water >= 100) return await message.channel.send("Your pet is already hydrated!")
            if(q[e].happiness < 100){
              q[e].happiness += 2
            }
            q[e].water += 20 * num
            if(q[e].water >= 160) return await message.channel.send("Don't over-water your pet!")
            bot.playerpets.set(message.author.id, q)
            var t = playerstorage
            var v = message.author.id
            t.items.water -= num
            bot.playerstorage.set(message.author.id, t)
            return await message.channel.send(`Successfully gave ${name.charAt(0).toUpperCase() + name.slice(1)} water.`)
          }else{
            return await message.channel.send(`You don't have enough water.`)
          }
        }
      }
      return await message.channel.send("Pet not found")
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


async function findSharedPet(id, bot, name){
  return new Promise((resolve, reject) => {
    for(let [key, val] of bot.playerpets){
      let pets = val
      if(pets[name] && pets[name].sharedto.includes(id)){
        resolve({pet:pets[name],id:key})
      }
    }
  resolve(false)
  })
}