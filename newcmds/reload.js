module.exports.run = async(bot, message, prefix) =>{
  var args = message.content.split(' ').slice(1)
  if(message.author.id != '353782817777385472') return await message.channel.send("This command is restricted to developers!");
  try{
    // bot.shard.broadcastEval('this.shard.id')
      // .then(id => {
        if(args[0].charAt(0) == "."){
          delete require.cache[require.resolve(`${args[0]}`)]
        }else{
          delete require.cache[require.resolve(`./${args[0]}.js`)]
          console.log(`${args.join(" ")}.js reloaded`)
        }
    // }).catch((err)=> {
    //   console.log(err)
    //   return message.channel.send("Error in reloading, check console.")
    // })
  }catch(err){
    console.log(err)
    return message.channel.send("Error in reloading, check console.")
  }

  return message.channel.send(`${args[0]} has been reloaded on all shards!`)
}
