module.exports.run = async(bot, message, prefix) =>{
  const fs = require('fs');
  const Discord = require('discord.js')
  try{
    var playerpets = bot.playerpets.get(message.author.id)
    var pets = []
    for(var p in playerpets){
      pets.push(p.charAt(0).toUpperCase() + p.slice(1))
    }
    let sharedPets = await findSharedPets(message.author.id, bot)
    if(sharedPets.length >= 1) pets = pets.concat(sharedPets)
    if(!pets[0]){
      return await message.reply("You have no pets!")
    }
    return await message.channel.send(`${message.guild.members.get(message.author.id).nickname || message.author.username}'s pets and pets they have access to: ${pets.join(", ")}`)
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
          if(pets[pet].sharedto.includes(id)) arr.push(pet.charAt(0).toUpperCase() + pet.slice(1))
        }catch(e){}
      }
    }
  return resolve(arr)
  })
}