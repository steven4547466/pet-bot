const Discord = require("discord.js")
const achievements = [
  {
    name: "Man's best friend.",
    description: "Adopt any pet"
  },
  {
    name: "First steps.",
    description: "Take any pet on a walk for your first time"
  },
  {
    name: "Sustenance.",
    description: "Feed or water any pet for your first time"
  },
  {
    name: "Bad Owner.",
    description: "Have a pet taken away or die of unnatural causes"
  },
  {
    name: "All Dogs Go to Heaven.",
    description: "Have any pet (not just dogs) die of old age"
  },
  {
    name: "A litter of 5!",
    description: "Have any amount of new born pets"
  },
  {
    name: "He's getting old.",
    description: "Have any pet reach half their lifespan"
  },
  {
    name: "First trick.",
    description: "Teach any pet any trick to completion"
  },
  {
    name: "There's never too many.",
    description: "Have 10 or more pets at any time"
  }
]
module.exports.run = async(bot, message, prefix) =>{
  // const testAllow = ["530918086698598400", "545059046160334859", "529751127437213711"]
  // let supportServer = await bot.guilds.get("529552050246123520")
  // try{
  //   var memberUsed = supportServer.members.get(message.author.id)
  //   }catch(e){
  //     return await message.channel.send("I couldn't find you in our support server.")
  //   }
  // var allow = false
  // if(memberUsed){
  //   for(var i in testAllow){
  //     if(memberUsed.roles.has(testAllow[i])) allow = true
  //   }
  // }
  // if(!allow) return await message.channel.send("This is a beta command! Only patrons, testers and beta testers have access for now.")
  let flags = {
    "view": {
      description: "View your current achievements."
    },
    "list": {
      description: `List all achievements, ${prefix}achievements list (achievement number) to view specific achievements.`
    }
  }
  let fields = []
  for(let i in flags){
    fields.push({name: i.charAt(0).toUpperCase() + i.slice(1), value: flags[i].description})
  }
  let args = message.content.split(" ").slice(1)
  try{
    var embed = new Discord.RichEmbed()
    embed.setColor("#ff0000")
    embed.setDescription("No flag provided.")
    for(let i in fields){
      embed.addField(`**${fields[i].name}**`, fields[i].value)
    }
    var flag = args[0].toLowerCase()
    }catch(e){
      return await message.channel.send(embed)
    }
  args.shift()
  if(flag == "view"){
    viewAchievements(bot, message, prefix)
    return
  }else if(flag == "list"){
    let num = parseInt(args[0]) || false
    listAchievements(bot, message, prefix, num)
    return
  }
  var embed = new Discord.RichEmbed()
  embed.setColor("#ff0000")
  embed.setDescription("Invalid flag provided.")
  for(let i in fields){
    embed.addField(`**${fields[i].name}**`, fields[i].value)
  }
  return await message.channel.send(embed)
};

async function viewAchievements(bot, message, prefix){
  let playerstorage = bot.playerstorage.get(message.author.id)
  if(!playerstorage.achievements) return await message.channel.send("You have no achievements!")
  let playerAch = playerstorage.achievements
  if(Object.keys(playerAch).length < 1) return await message.channel.send("You have no achievements!")
  let fields = []
  for(let i in playerAch){
    fields.push(`**${i}** | ${new Date(playerAch[i])}`)
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
    var newfields = []
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
    try{
      var m = await message.channel.send({
        embed: pages[options.page]
      });
    }catch(e){
      let embed = new Discord.RichEmbed()
      .setTitle("New Error")
      .setColor("#ff0000")
      .setDescription(`There was an error\`\`\`md\n${e.message}\`\`\``)
      .setFooter(`Error on shard: ${bot.shard.id}`)
      // bot.webhookRequests.push(embed)
      if(!bot.webhookId){
        // bot.webhookId = setInterval(bot.sendHooks, 1000)
      }
      return console.error(e)
    }
    await m.react("⬅")
    await m.react("➡")
    const filter = (reaction, user) => {
      return ["⬅","➡"].includes(reaction.emoji.name) && user.id == message.author.id;
    };

    async function removeReaction(m, message, emoji){
      try {
        m.reactions.find(r => r.emoji.name == emoji).remove(message.author.id).catch((err) => {
          let embed = new Discord.RichEmbed()
        .setTitle("New Error")
        .setColor("#ff0000")
        .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
        .setFooter(`Error on shard: ${bot.shard.id}`)
        // bot.webhookRequests.push(embed)
        if(!bot.webhookId){
          // bot.webhookId = setInterval(bot.sendHooks, 1000)
        }
        })
      } catch (err) {
        let embed = new Discord.RichEmbed()
        .setTitle("New Error")
        .setColor("#ff0000")
        .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
        .setFooter(`Error on shard: ${bot.shard.id}`)
        // bot.webhookRequests.push(embed)
        if(!bot.webhookId){
          // bot.webhookId = setInterval(bot.sendHooks, 1000)
        }
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
        }).catch((e) => {
          let embed = new Discord.RichEmbed()
        .setTitle("New Error")
        .setColor("#ff0000")
        .setDescription(`There was an error\`\`\`md\n${e.message}\`\`\``)
        .setFooter(`Error on shard: ${bot.shard.id}`)
        // bot.webhookRequests.push(embed)
        if(!bot.webhookId){
          // bot.webhookId = setInterval(bot.sendHooks, 1000)
        }
        })

      }catch(err){
        let embed = new Discord.RichEmbed()
        .setTitle("New Error")
        .setColor("#ff0000")
        .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
        .setFooter(`Error on shard: ${bot.shard.id}`)
        // bot.webhookRequests.push(embed)
        if(!bot.webhookId){
          // bot.webhookId = setInterval(bot.sendHooks, 1000)
        }
        console.log(err)
      }
    }


    awaitReactions(message, m, options, filter);
  }catch(err){
    let embed = new Discord.RichEmbed()
    .setTitle("New Error")
    .setColor("#ff0000")
    .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
    .setFooter(`Error on shard: ${bot.shard.id}`)
    // bot.webhookRequests.push(embed)
    if(!bot.webhookId){
      // bot.webhookId = setInterval(bot.sendHooks, 1000)
    }
    console.error(err)
  }
}

async function listAchievements(bot, message, prefix, num){
  if(!num){
    let fields = []
    let idx = 1
    for(let i in achievements){
      fields.push(`**${idx}: ${achievements[i].name}** | ${achievements[i].description}`)
      idx++
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
      var newfields = []
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
      try{
        var m = await message.channel.send({
          embed: pages[options.page]
        });
      }catch(e){
        let embed = new Discord.RichEmbed()
        .setTitle("New Error")
        .setColor("#ff0000")
        .setDescription(`There was an error\`\`\`md\n${e.message}\`\`\``)
        .setFooter(`Error on shard: ${bot.shard.id}`)
        // bot.webhookRequests.push(embed)
        if(!bot.webhookId){
          // bot.webhookId = setInterval(bot.sendHooks, 1000)
        }
        return console.error(e)
      }
      await m.react("⬅")
      await m.react("➡")
      await message.channel.send(`${prefix}achievements list (achievement number) to view specific achievements.`)
      const filter = (reaction, user) => {
        return ["⬅","➡"].includes(reaction.emoji.name) && user.id == message.author.id;
      };

      async function removeReaction(m, message, emoji){
        try {
          m.reactions.find(r => r.emoji.name == emoji).remove(message.author.id).catch((err) => {
            let embed = new Discord.RichEmbed()
            .setTitle("New Error")
            .setColor("#ff0000")
            .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
            .setFooter(`Error on shard: ${bot.shard.id}`)
            // bot.webhookRequests.push(embed)
            if(!bot.webhookId){
              // bot.webhookId = setInterval(bot.sendHooks, 1000)
            }
          })
        } catch (err) {
          let embed = new Discord.RichEmbed()
          .setTitle("New Error")
          .setColor("#ff0000")
          .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
          .setFooter(`Error on shard: ${bot.shard.id}`)
          // bot.webhookRequests.push(embed)
          if(!bot.webhookId){
            // bot.webhookId = setInterval(bot.sendHooks, 1000)
          }
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
          }).catch((e) => {
            let embed = new Discord.RichEmbed()
            .setTitle("New Error")
            .setColor("#ff0000")
            .setDescription(`There was an error\`\`\`md\n${e.message}\`\`\``)
            .setFooter(`Error on shard: ${bot.shard.id}`)
            // bot.webhookRequests.push(embed)
            if(!bot.webhookId){
              // bot.webhookId = setInterval(bot.sendHooks, 1000)
            }
          })

        }catch(err){
          let embed = new Discord.RichEmbed()
          .setTitle("New Error")
          .setColor("#ff0000")
          .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
          .setFooter(`Error on shard: ${bot.shard.id}`)
          // bot.webhookRequests.push(embed)
          if(!bot.webhookId){
            // bot.webhookId = setInterval(bot.sendHooks, 1000)
          }
          console.log(err)
        }
      }


      awaitReactions(message, m, options, filter);
    }catch(err){
      let embed = new Discord.RichEmbed()
      .setTitle("New Error")
      .setColor("#ff0000")
      .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
      .setFooter(`Error on shard: ${bot.shard.id}`)
      // bot.webhookRequests.push(embed)
      if(!bot.webhookId){
        // bot.webhookId = setInterval(bot.sendHooks, 1000)
      }
      console.error(err)
    }
  }else{
    let embed = new Discord.RichEmbed()
    if(!achievements[num - 1]) return await message.channel.send("No achievement data available.")
    embed.setColor("#00ff00")
    embed.setTitle(achievements[num - 1].name)
    embed.setDescription(achievements[num - 1].description)
    return await message.channel.send(embed)
  }
}

module.exports.aliases = {
  aliases: ["ach"],
  command: "achievements"
}