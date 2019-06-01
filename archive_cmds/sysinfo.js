module.exports.run = async(bot, message, prefix) =>{
  const fs = require("fs")
  const Discord = require('discord.js');
  let bicon = bot.user.displayAvatarURL
  let botembed = new Discord.RichEmbed()
  .setDescription("Bot Information")
  .setColor(0x15f153)
  .setThumbnail(bicon)
  .addField("OS", "Ubuntu")
  .addField("NodeJS Version", process.version)
  .addField("Discord.js Version", JSON.parse(fs.readFileSync("./node_modules/discord.js/package.json", "utf8")).version)
  .addField("Ram Usage (MB)", `${~~(process.memoryUsage().heapUsed / 1024 / 1024 * 10) / 10}`)
  
  
  return await message.channel.send(botembed)
};
