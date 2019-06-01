module.exports.run = async(bot, message, prefix) =>{
  const fs = require('fs');
  const Discord = require('discord.js')
  try{
    var player = bot.playerstorage.get(message.author.id)
    var t = player
    var fields = []
    for(var name in t.items){
      var name1 = name.charAt(0).toUpperCase() + name.slice(1)
      fields.push(`${name1} | ${t.items[name]}`)
    }
    let perChunk = 10
    let arrays = fields.reduce((resultArray, item, x) => { 
      const chunkIndex = Math.floor(x/perChunk)
      if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []
      }
      resultArray[chunkIndex].push(item)
      return resultArray
    }, [])
    var pages = {}
    for(var i = 0; i < arrays.length; i++){
      var newfields = [

      ]
      for(var j = 0; j < arrays[i].length; j++){
        var name = arrays[i][j].split("|").shift().slice(0, -1)
        var value = arrays[i][j].split("|").pop().slice(1)
        newfields.push({
          name: name,
          value: value
        })
      }
      pages[i + 1] = {
        title: `Page ${i + 1}`,
        fields: newfields,
        footer: {
          icon_url: bot.user.avatarURL,
          text: `Page ${i + 1}/${arrays.length}`
        }
      }
    }
    var options = {
      limit: 60*1000,
      min: 1,
      max: arrays.length,
      page: 1
    }

    try {
      var m = await message.channel.send({
        embed: pages[options.page]
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

          console.log(page)
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
          }).catch(() => {

          })

        }catch(err){

          console.log(err)
        }
      }


      awaitReactions(message, m, options, filter);
    }catch(err){

      console.error(err)
    }

  }catch(err){
    let channel = bot.channels.get("530418022465273867")
    channel.send("Mate, there was an error somewhere")
    let embed = new Discord.MessageEmbed()
    .setTitle("Bad coding = error")
    .setDescription("F to pay respects")
    .setColor("#ff0000")
    .addField("Author", `${message.author.username} AKA ${message.member.nickname || "no nick cuz lame"}`)
    .addField("Message", message.content)
    .addField("Got this error bro", err)
    channel.send(embed)
    console.log(err)
  }
};

module.exports.aliases = {
  aliases: ["inv"],
  command: "inventory"
}
