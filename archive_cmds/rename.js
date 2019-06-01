module.exports.run = async(bot, message, prefix) =>{
  const fs = require('fs');
  const notAllowed = require('badwords/array')
  let t = bot.playerpets.get(message.author.id)
  var args = message.content.split(" ").slice(1)
  if(!args[0]){
    return await message.channel.send("Please specify one of your pets")
  }
  var str = args.join(" ").toLowerCase()
  var name = str.split("|").shift().slice(0, -1);
  var newname = str.split("|").pop().slice(1);
  if(!t[name]) return await message.channel.send("Pet doesn't exist.")
  // for(var i = 0; i < notAllowed.length; i++){
  //   if(newname.includes(notAllowed[i]) && !newname.includes("muf") && !name.includes("sassy") && !name.includes("peach")){
  //     var t1 = bot.playerstorage.get(message.author.id)
  //     t1 = t1 || {}
  //     if(!t1["warnings"]) t1["warnings"] = 0
  //     t1["warnings"] += 1
  //     var warns = t1["warnings"]
  //     bot.playerstorage.set(message.author.id, t1)
  //     if(warns >= 2){
  //       var logs;
  //       var logs1 = message.channel.fetchMessages(50).then(mess =>{
  //         var messages = mess.filter(m => m.author.id == message.author.id)
  //         logs = messages.map(me => `${me.content}: ${me.createdAt}`)
  //       })
  //       setTimeout(function(){
  //         var blacklist = JSON.parse(fs.readFileSync("./storage/blacklist.json", "utf8"))
  //         let toBlacklist = message.author.id
  //         let reason = "Autoblacklist: Inappropriate names"
  //         let t = blacklist
	 //       let v = toBlacklist
	 //       t[v] = {}
	 //       t[v].logs = logs
	 //       t[v].reason = reason;
	 //       if(message.author.id != "353782817777385472"){
	 //         fs.writeFileSync('./storage/blacklist.json', JSON.stringify(t))
	 //       }
  //       }, 1000)
  //       return await message.channel.send(`You have been auto blacklisted with the reason: Inappropriate names`)
  //     }
  //     return await message.channel.send(`Names like ${newname} are not acceptable. You will be blacklisted if you attempt again`)
  //   }
  // }
  if(!t[name].usedin.includes(message.guild.id)) t[name].usedin.push(message.guild.id)
  if(newname.includes(",")) return await message.channel.send("Names cannot have a ',' in them")
  bot.playerpets.delete(message.author.id, name)
  bot.playerpets.set(message.author.id, t[name], newname)
  return await message.channel.send(`Successfully renamed ${name.charAt(0).toUpperCase() + name.slice(1)} to ${newname.charAt(0).toUpperCase() + newname.slice(1)}`)
};

module.exports.aliases = {
  aliases: ["rn"],
  command: "rename"
}