module.exports.run = async(bot, message, prefix) =>{
  const Discord = require('discord.js');
  if(message.author.id != "353782817777385472") return
  let args = message.content.split(" ").slice(1)
  try{
    let emoji = await message.attachments.first().url
    if(emoji){
      if(args.length > 1) return await message.channel.send("No spaces pal")
      let name = args[0]
      if(!name) return await message.channel.send("Please provide a name.")
      var newe = await message.guild.createEmoji(emoji, name)
      return await message.channel.send(`Emoji created: ${newe.toString()} with name ${name}`)
     }
  }catch(e){
    let emoji = args[1]
    if(!emoji) return await message.channel.send("Please provide a picture.")
    args.pop()
    if(!emoji.startsWith('http')) return await message.channel.send("URL must start with http or https")
    if(args.length > 1)  return await message.channel.send("No spaces pal")
    let name = args[0]
    if(!name) return await message.channel.send("Please provide a name.")
    var newe = await message.guild.createEmoji(emoji, name)
    return await message.channel.send(`Emoji created: ${newe.toString()} with name ${name}`)
  }
  return await message.channel.send("There was an error.")
};
