const Discord = require("discord.js")
module.exports.run = async(bot, message, prefix) =>{
  const fs = require('fs');
  let playerpets = await bot.playerpets.get(message.author.id)
  let msg = message.content.toLowerCase().split(" ").slice(1).join(" ")
  let name = msg.split(" | ")[0] || false
  let playWith = msg.split(" | ")[1] || false
  if(!name || !playWith) return await message.channel.send("Please provide 2 pets")
  let pet = playerpets[name]
  let petId = false
  if(!pet){
    let sharedPet = await findSharedPet(message.author.id, bot, playWith)
    pet = sharedPet.pet || false
    petId = sharedPet.id || false
    if(!pet) return await message.channel.send("First pet not found")
  }
  let pet2 = playerpets[playWith]
  let pet2Id = false
  if(!pet2){
    let sharedPet = await findSharedPet(message.author.id, bot, playWith)
    pet2 = sharedPet.pet || false
    pet2Id = sharedPet.id || false
    if(!pet2) return await message.channel.send("Second pet not found")
  }
  pet.happiness + 20 <= 120 ? pet.happiness += 20 : pet.happiness = 120
  pet2.happiness + 20 <= 120 ? pet2.happiness += 20 : pet2.happiness = 120
  pet.socialization + 20 <= 120 ? pet.socialization += 20 : pet.socialization = 120
  pet2.socialization + 20 <= 120 ? pet2.socialization += 20 : pet2.socialization = 120
  pet.exercise + 20 <= 120 ? pet.exercise += 20 : pet.exercise = 120
  pet2.exercise + 20 <= 120 ? pet2.exercise += 20 : pet2.exercise = 120
  if(petId){
    bot.playerpets.set(petId, pet, name)
  }else{
    if(!playerpets[name].usedin.includes(message.guild.id)) playerpets[name].usedin.push(message.guild.id)
    bot.playerpets.set(message.author.id, pet, name)
  }
  if(pet2Id){
    bot.playerpets.set(pet2Id, pet2, playWith)
  }else{
    if(!playerpets[playWith].usedin.includes(message.guild.id)) playerpets[playWith].usedin.push(message.guild.id)
    bot.playerpets.set(message.author.id, pet2, playWith)
  }
  return await message.channel.send(`${name.charAt(0).toUpperCase() + name.slice(1)} played with ${playWith.charAt(0).toUpperCase() + playWith.slice(1)}`)
}


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

// module.exports.aliases = {
//   aliases: [],
//   command: "play"
// }