module.exports.run = async(bot, message, prefix) =>{
  const Discord = require('discord.js')
  const caller = message.author
  var petsnum = 0;
  var commonarray = []
  var commonpet = []
  const fs = require("fs")
  var blacklist = JSON.parse(fs.readFileSync("./storage/blacklist.json", "utf8"))
  for(var id1 of bot.playerpets.fetchEverything()){
    var id = id1[0]
    for(var pet in bot.playerpets.get(id)){
      petsnum++
      commonarray.push(pet)
      let type = bot.playerpets.get(id, pet).type
      commonpet.push(type)
    }
  }
  
  var frequency = {}; 
  var max = 0;  
  var result;
  for(var v in commonarray) {
    frequency[commonarray[v]]=(frequency[commonarray[v]] || 0)+1;
    if(frequency[commonarray[v]] > max) { 
      max = frequency[commonarray[v]];
      result = `${commonarray[v]}: ${max}`;
    }
  }
  
  frequency = {}; 
  max = 0;  
  var result1;
  for(var tv in commonpet) {
    frequency[commonpet[tv]]=(frequency[commonpet[tv]] || 0)+1;
    if(frequency[commonpet[tv]] > max) { 
      max = frequency[commonpet[tv]];
      result1 = `${commonpet[tv]}: ${max}`;
    }
  }
  var num_blacklist = 0
  for(var list in blacklist){
    num_blacklist++;
  }
  
  var read = bot.stats.get("stats1", "messages_read")
  var ran = bot.stats.get("stats1", "commands_ran")
  
  bot.stats.set("stats1", {
    messages_read: read,
    commands_ran: ran,
    num_pets: petsnum,
    most_common_name: result,
    most_common_pet: result1
  })
  try{
    let m = new Discord.RichEmbed()
    .setDescription(`**${bot.user.username}'s Stats**`)
    .setColor(0x00ffff)
    .addField("Shard ID", `${bot.shard.id}`)
    .addField("Guilds", `${bot.guilds.size}`)
    .addField("Messages read", read)
    .addField("Commands ran", ran)
    .addField("Number of pets", petsnum)
    .addField("Most common pet", result1.charAt(0).toUpperCase() + result1.slice(1))
    .addField("Most common name", result.charAt(0).toUpperCase() + result.slice(1))
    .addField("Blacklisted users", num_blacklist)
    .setFooter(`Last restarted at ${bot.readyAt}`, bot.user.avatarURL)
    return await message.channel.send(m)
  }catch(err){
    await message.channel.send(`There was an error, it could be permissions. Would you like an error log? 'Y' to get a log`)
    try{
            var response = await message.channel.awaitMessages(message2 => message2.content.toLowerCase() == "y" && message2.author.id == caller.id , {
                            maxMatches: 1,
                            time: 10000,
                            errors: ['time']
                    });
            if(response){
                    return await message.channel.send(`Error: \`\`\`\n${err}\n\`\`\``)
            }
    }catch(err){
            return
    }
  }
};
