module.exports.run = async(bot, message, prefix) =>{
        if(message.author.id != '353782817777385472') return await message.channel.send("This command is restricted to developers")
        const fs = require('fs');
        const Discord = require("discord.js")
        var blacklist;
        try{
          blacklist = JSON.parse(fs.readFileSync("./storage/blacklist.json", "utf8"))
          let args = message.content.split(" ").slice(1)
          if(args[0] == "reason"){
            let id = args[1]
            var t = blacklist
  	        var v = id
            let m = new Discord.RichEmbed()
            .setDescription("Blacklist") //Blacklisted User: ${bot.users.find(id).username || "N/A"}
            .setColor("#ff0000")
            .addField("Reason", t[v].reason)
            await message.channel.send(m) 
            if(t[v].logs){
              return await message.channel.send(t[v].logs.join("\n").slice(0, -1), {split: true})
            }else{
              return await message.channel.send("No logs, manual ban")
            }
          }
          let toBlacklist = message.mentions.users.first() || args[0] 
          args.shift()
          let reason = args.join(" ") || "None"
          var t = blacklist
	        var v = toBlacklist.id || toBlacklist
	        t[v] = {}
	        t[v].reason = reason;
	        fs.writeFileSync('./storage/blacklist.json', JSON.stringify(t))
	        return await message.channel.send(`Successfully blacklisted ${toBlacklist.username || toBlacklist} with reason ${reason}`)
        }catch(err){
          let channel = bot.channels.get("530418022465273867")
      channel.send("Mate, there was an error somewhere")
      let embed = new Discord.RichEmbed()
      .setTitle("Bad coding = error")
      .setDescription("F to pay respects")
      .setColor("#ff0000")
      .addField("Author", `${message.author.username} AKA ${message.member.mickname || "no nick cuz lame"}`)
      .addField("Message", message.content)
      .addField("Got this error bro", err)
      channel.send(embed)
          console.log(err)
        }
};
