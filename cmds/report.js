let cooldowns = {}
module.exports.run = async(bot, message, prefix) =>{
  const fs = require('fs');
  const Discord = require('discord.js')
  var silent = false
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
  let cooldown = message.createdTimestamp + (1000 * 60 * 60 * 5)
  cooldowns[message.author.id] = {time: cooldown, day: new Date().getDay()}
  try{
    var counter = JSON.parse(fs.readFileSync("./storage/counters.json", "utf8"))
    var reports = JSON.parse(fs.readFileSync("./storage/reports.json", "utf8"))
    var t = counter
    var cur = t.reports
    console.log(cur)
    var args = message.content.split(" ").slice(1);
    if(args[0] == "-s"){
      await message.channel.send("Initiating silent report")
      silent = true
      args.shift()
    }
    var report = args.join(" ")
    if(report.length < 70) return await message.channel.send("Reports must be of at least 70 characters in length, make sure to provide detail.")
    if(!report) return await message.channel.send("You must include a report")
    var by = message.author.username
    var q = reports
    q[cur] = {
      "Case Number": cur,
      "By": by,
      "Bug": report,
      "Server": message.guild.name,
      "ID": message.author.id,
      "Submitted": new Date()
    }
    fs.writeFileSync("./storage/reports.json", JSON.stringify(q))
    t.reports += 1 
    fs.writeFileSync("./storage/counters.json", JSON.stringify(t))
    let embed = new Discord.MessageEmbed()
    .setDescription(`Case # ${cur}`)
    .setColor("#0000ff")
    .addField("By:", `${by}: ${message.author.id}`)
    .addField("Bug", `${report}`)
    .addField("Server", `${message.guild.name}`)
    .setFooter(`Submitted on ${new Date()}`, message.member.user.displayAvatarURL)
    if(!silent){
      bot.channels.get("531868841353936919").send(embed)
    }else{
      silent = false
    }
    return message.channel.send("Logged.")
  }catch(err){
    console.log(err)
  }
};

module.exports.aliases = {
  aliases: ["rp"],
  command: "report"
}