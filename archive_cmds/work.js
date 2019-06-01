var cooldowns = {}
const Discord = require('discord.js')
module.exports.run = async(bot, message, prefix) =>{
  var test = bot.playerstorage.get(message.author.id)
  if(!test) return await message.channel.send("You have never adopted a pet before! get started with pet!adopt")
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
  let cooldown = message.createdTimestamp + (60000 * 60 * 1)
  cooldowns[message.author.id] = {time: cooldown, day: new Date().getDay()}
  try{
    var moneygained = ~~(Math.random()*((300-50)+1))+50; 
    var player = bot.playerstorage.get(message.author.id)
    var t = player
    var v = message.author.id
    t.balance += moneygained
    bot.playerstorage.set(message.author.id, t)
    return await message.reply(`You went to work and got paid $${moneygained}.`)
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
