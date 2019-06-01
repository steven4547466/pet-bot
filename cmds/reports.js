module.exports.run = async(bot, message, prefix) =>{
  const fs = require('fs');
  const Discord = require('discord.js')
  try{
    var reports = JSON.parse(fs.readFileSync("./storage/reports.json", "utf8"))
    var args = message.content.split(" ").slice(1);
    if(!args[0]){
      var arr = []
      for(var i in reports){
        arr.push(reports[i])
      }
      let perChunk = 5
  	  let arrays = arr.reduce((resultArray, item, x) => { 
    	  const chunkIndex = Math.floor(x/perChunk)
    	
    	  if(!resultArray[chunkIndex]) {
    	    resultArray[chunkIndex] = [] // start a new chunk
    	  }
    	
    	  resultArray[chunkIndex].push(item)
    	
    	  return resultArray
    	}, [])
    	console.log(arrays)
    	var options = {
                  limit: 60*1000,
                  min: 0,
                  max: arrays.length || 1,
                  page: 0
                }
                
          var pages = {
            
          }
          var newFields = []
          for(var i = 0; i < arrays.length; i++){
            newFields = []
            if(!pages[i]) pages[i] = {}
            pages[i].title = `Page ${i + 1}`
            pages[i].description = `Bug Reports`
            for(var j in arrays[i]){
               console.log("pushed")
               newFields.push({
                 name: `Case # ${arrays[i][j]["Case Number"]}`, value: `By ${arrays[i][j]["By"]}`
               })
            }
            console.log(newFields)
            pages[i].fields = newFields
            pages[i].footer = {
              icon_url: message.member.user.displayAvatarURL,
              text: `Page ${i + 1} of ${arrays.length || 1}`
            }
          }
          
          console.log(pages)
                
                
          var defaultoptions = {
            title: `Page 1`,
            description: `Bug Reports`,
            footer: {
              icon_url: message.member.user.displayAvatarURL,
              text: `Page 1 of ${arrays.length || 1}`
            }
          }
          try {
            var m = await message.channel.send({
              embed: pages[options.page] || defaultoptions
            });
            await m.react("⬅")
            await m.react("➡")
            const filter = (reaction, user) => {
              return ["⬅","➡"].includes(reaction.emoji.name) && user.id == message.author.id;
            };
            
            async function removeReaction(m, message, emoji){
              try {
                m.reactions.find(r => r.emoji.name == emoji).remove(message.author.id).catch((err) => {})
              } catch (err) {
                console.log(err)
              }
            }
            
            var {
                  min,
                  max,
                  page,
                  limit
                } = options
           
            
            const awaitReactions = async (message, m, options, filter) =>{
              try{
                m.awaitReactions(filter, {
                  max: 1,
                  time: limit,
                  errors: ['time']
                })
                .then(async (collected) => {
                  var reaction = collected.first()
                  if(reaction.emoji.name === "⬅"){
                    await removeReaction(m, message, "⬅")
                    if (page != min) {
                      page = page - 1;
                      await m.edit({
                        embed: pages[page]
                      });
                    }
                    awaitReactions(message, m, options, filter);
                  }else if(reaction.emoji.name === "➡"){
                    await removeReaction(m, message, "➡")
                    if (page != max) {
                      page = page + 1;
                      await m.edit({
                        embed: pages[page]
                      });
                    }
                    awaitReactions(message, m, options, filter);
                  }else{
                    awaitReactions(message, m, options, filter);
                  }
                }).catch(() => {})
                
              }catch(err){
                console.log(err)
              }
            }

              
            awaitReactions(message, m, options, filter);
          }catch(err){
            console.error(err)
          }
        }else if(args[0] == "resolve"){
          let silent = false
          if(message.author.id != "353782817777385472") return await message.channel.send("You can't do that")
          let num = args[1]
          if(args[2] == "-s") silent = true
          let z = JSON.parse(fs.readFileSync("./storage/reports.json", "utf8"))
          delete z[num]
          fs.writeFileSync("./storage/reports.json", JSON.stringify(z))
          if(!silent){
            bot.channels.get("531868841353936919").send(`Case # ${num} has been resolved and removed.`)
            return await message.channel.send("Done.")
          }else{
            return await message.channel.send("Done, but silently... like a ninja")
          }
        }else{
	      let i = args[0]
	      var t = reports[i]
	      var embed = new Discord.MessageEmbed()
	      .setDescription(`Case # ${t["Case Number"]}`)
	    	.setColor("#0000ff")
	    	.addField(`Server:`, `${t["Server"]}`)
	    	.addField(`By:`, `${t["By"]}: ${t["ID"]}`)
	    	.addField(`Report:`, `${t["Bug"]}`)
	    	.setFooter(`Submitted on ${t.Submitted}`)
	    }
    	return await message.channel.send(embed)
	  }catch(err){}
};

module.exports.aliases = {
  aliases: ["rps"],
  command: "reports"
}