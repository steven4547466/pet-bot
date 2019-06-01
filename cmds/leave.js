module.exports.run = async(bot, message, prefix) =>{
  if(message.author.id != "353782817777385472") return
  let args = message.content.split(" ").slice(1)
  try{
    var guild = bot.guilds.get(args[0])
    console.log(guild)
  }catch(e){
    console.log(e)
    return await message.channel.send("Guild doesn't exist")
  }
  await guild.leave().catch(e => console.log(e))
  return
};
