module.exports.run = async(bot, message, prefix) =>{
  const Discord = require('discord.js')
  const fs = require('fs');
  try{
    var adoptablepets = JSON.parse(fs.readFileSync("./storage/pets.json", "utf8"))
    setTimeout(async function(){
      var args = message.content.split(" ").slice(1)
      if(!args[0]){
        return await message.channel.send("You must provide the pets name!")
      }
      var name = args.join(" ").toLowerCase() || null
      if(!name){
        return await message.channel.send("You must provide the pets name!")
      }
      try{
        var pet = bot.retrieve.get(message.author.id, name)
        if(!pet) return await message.channel.send(`Could not find pet with name ${name}`)
        var curpets = bot.playerpets.get(message.author.id)
        }catch(err){
          return await message.channel.send("The pet you provided was not found!")
        }

      if(pet.timesRetrieved === undefined || pet === undefined){
        return await message.channel.send("The pet you provided was not found!")
      }
      if(pet.timesRetrieved >= 1){
        var petsi = bot.retrieve.get(message.author.id)
        var t = petsi
        delete t[name]
        bot.retrieve.set(message.author.id, t)
        return await message.channel.send("The pet you provided was removed from you forever as they were taken away once before!")
      }
      pet.timesRetrieved += 1
      curpets[name] = pet
      bot.playerpets.set(message.author.id, curpets)
      var petsi = bot.retrieve.get(message.author.id)
      var t = petsi
      delete t[name]
      bot.retrieve.set(message.author.id, t)
      bot.playerstorage.ensure(message.author.id, {
        balance: 0
      })
      return await message.channel.send(`You got ${name.charAt(0).toUpperCase() + name.slice(1)} from the shelter.`)


    },200)
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
    return console.log(err)
  }
};

module.exports.aliases = {
  aliases: ["ret"],
  command: "retrieve"
}