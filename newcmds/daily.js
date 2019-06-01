var cooldowns = {}
const Discord = require('discord.js')
module.exports.run = async(bot, message, prefix) =>{
  const fs = require('fs');
  if(cooldowns[message.author.id]){
    if(message.createdTimestamp < cooldowns[message.author.id]["time"]){
      if((new Date().getDay() > cooldowns[message.author.id]["day"]) || (cooldowns[message.author.id]["day"] == 6 && new Date().getDay() == 0)){
        
      }else{
        let cooldownTime = cooldowns[message.author.id]["time"] - message.createdTimestamp
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

  let cooldown = message.createdTimestamp + (60000 * 60 * 24)
  cooldowns[message.author.id] = {time: cooldown, day: new Date().getDay()}
  try{
    var moneygained = ~~(Math.random()*((1500-1000)+1))+1000; 
    var player = bot.playerstorage.get(message.author.id)
    var t = player
    var v = message.author.id
    t.balance += moneygained
    bot.playerstorage.set(message.author.id, t)
    return await message.reply(`You collected your daily money! Gained $${moneygained}.`)
  }catch(err){
    let embed = new Discord.RichEmbed()
    .setTitle("New Error")
    .setColor("#ff0000")
    .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
    
    // bot.webhookRequests.push(embed)
    if(!bot.webhookId){
      // bot.webhookId = setInterval(bot.sendHooks, 1000)
    }
  }
};
