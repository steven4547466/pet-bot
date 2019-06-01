module.exports.run = async(bot, message, prefix) =>{
  const Discord = require("discord.js")
  const fs = require("fs")
  if(message.author.id != "353782817777385472") return await message.channel.send("No permission")
  let announceid = JSON.parse(fs.readFileSync("./storage/announcements.json", "utf8"))
  let realids = announceid.ids
  for(var hku = 0; hku < realids.length; hku++){
    try{
      let announcement = message.content.split(" ").slice(1).join(" ")
      await bot.channels.get(realids[hku]).send(`${announcement}`)
    }catch(err){
    }
  }
};
