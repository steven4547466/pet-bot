module.exports.run = async(bot, message, prefix) =>{
        if(message.author.id != '353782817777385472') return await message.channel.send("This command is restricted to developers")
        const fs = require('fs');
        var blacklist;
        var sblacklist;
        try{
          blacklist = JSON.parse(fs.readFileSync("./storage/blacklist.json", "utf8"))
          sblacklist = JSON.parse(fs.readFileSync("./storage/sblacklist.json", "utf8"))
          let args = message.content.split(" ").slice(1)
          if(args[0] == "-s"){
            let id = args[1]
            let whitelist = JSON.parse(fs.readFileSync("./storage/serverwhitelist.json", "utf8"))
            whitelist.whitelist.push(id)
            console.log(whitelist)
            fs.writeFileSync('./storage/serverwhitelist.json', JSON.stringify(whitelist))
            if(sblacklist[id]){ 
              delete sblacklist[id]
              fs.writeFileSync('./storage/sblacklist.json', JSON.stringify(sblacklist))
            }
            return await message.channel.send(`Successfully whitelisted ${id}`)
          }
          let toWhitelist = message.mentions.users.first() || args[0]
          args.shift()
          var t = blacklist
	        var v = toWhitelist.id || toWhitelist
	        delete t[v];
	        fs.writeFileSync('./storage/blacklist.json', JSON.stringify(t))
	        return await message.channel.send(`Successfully whitelisted ${toWhitelist.username || toWhitelist}`)
        }catch(err){
          console.log(err)
        }
};
