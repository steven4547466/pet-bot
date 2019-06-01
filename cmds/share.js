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
      var str = args.join(" ").toLowerCase()
      var name = str.split("|").shift().slice(0, -1);
      if(!message.mentions.members) return await message.channel.send("Please mention a member!")
      var shareto = message.mentions.members.first()
      if(!shareto || !shareto.id) return await message.channel.send("There was an error getting the user. Please try again soon.")
      for(var p in playerpets){
        if(p == name){
          var q = playerpets
          var w = message.author.id
          var e = name
          if(!q[e].sharedto) q[e].sharedto = []
           if(q[e].sharedto.indexOf(shareto.id) >= 0){
            return await message.channel.send("They can already access your pet!")
          }
          let sharePets = bot.playerpets.get(shareto.id) || {}
          let allPets = Object.keys(sharePets).concat(await findSharedPets(shareto.id, bot))
          if(allPets.includes(name)) return await message.channel.send("They already have a pet shared to them with that name or have a pet with that name")
          q[e].sharedto.push(shareto.id)
          if(!q[e].usedin.includes(message.guild.id)) q[e].usedin.push(message.guild.id)
          bot.playerpets.set(message.author.id, q)
          return await message.channel.send(`You allowed ${shareto.displayName} to access your pet named: ${name.charAt(0).toUpperCase() + name.slice(1)}`)
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
