var cooldowns = {}
module.exports.run = async(bot, message, prefix) =>{
  if(cooldowns[message.author.id]){
    if(message.createdTimestamp < cooldowns[message.author.id]["time"]){
      if((new Date().getDay() > cooldowns[message.author.id]["day"]) || (cooldowns[message.author.id]["day"] == 6 && new Date().getDay() == 0)){

      }else{
        let cooldownTime = cooldowns[message.author.id]["time"] - message.createdTimestamp
        let seconds = ~~(cooldownTime/1000)
        let minutes = ~~(cooldownTime/(1000 * 60))
        let hours = ~~(cooldownTime/(1000 * 60 * 60))
        if(hours >= 1){
          minutes %= 60
          while(minutes % 60 >= 60){
            minutes %= 60
          }
        }
        if(minutes >= 1){
          seconds %= 60;
          while(seconds % 60 >= 60){
            seconds %= 60
          }
        }
        return await message.channel.send(`Sorry ${message.guild.members.get(message.author.id).nickname || message.author.username}, that command is on cooldown for another ${hours} hour(s), ${minutes} minute(s) and ${seconds} second(s)`)
      }
    }
  }
  let cooldown = message.createdTimestamp + (1000 * 60)
  cooldowns[message.author.id] = {time: cooldown, day: new Date().getDay()}
  const Discord = require('discord.js');
  var msg = message.content.toLowerCase();
  var commands1 = {
    general: {
      name: "**General**",
      invite: {
        name: "**Invite**",
        usage: prefix + "invite",
        description: `Generate an invite for this bot for your server`,
        //aliases: bot.aliases.get("invite.js").aliases.join(`\n${prefix}`) || "None"
      },
      botinfo: {
        name: "**Bot Info**",
        usage: prefix + "botinfo",
        description: `Get info on the bot`,
        aliases: bot.aliases.get("botinfo.js") ? bot.aliases.get("botinfo.js").aliases.join(`\n${prefix}`) : "None"
      },
      ping: {
        name: "**Ping**",
        usage: prefix + "ping",
        description: "Get the ping of the bot and API",
        //aliases: bot.aliases.get("ping.js").aliases.join(`\n${prefix}`) || "None"
      },
      stats: {
        name: "**Stats**",
        usage: prefix + "stats",
        description: "Get stats on the bot",
        aliases: bot.aliases.get("stats.js") ? bot.aliases.get("stats.js").aliases.join(`\n${prefix}`) : "None"
      },
      prefix: {
        name: "**Prefix**",
        usage: prefix + "prefix (prefix)",
        description: "Get or set the prefix",
        //aliases: bot.aliases.get("prefix.js").aliases.join(`\n${prefix}`) || "None"
      },
      vote: {
        name: "**Vote**",
        usage: prefix + "vote",
        description: "Get a link to vote, much appericated",
        aliases: bot.aliases.get("vote.js") ? bot.aliases.get("vote.js").aliases.join(`\n${prefix}`) : "None"
      },
      report: {
        name: "**Report**",
        usage: prefix + "report <bug>",
        description: "Report a bug",
        aliases: bot.aliases.get("report.js") ? bot.aliases.get("report.js").aliases.join(`\n${prefix}`) : "None"
      },
      reports: {
        name: "**Reports**",
        usage: prefix + "reports (case #, optional)",
        description: "View bug reports",
        aliases: bot.aliases.get("reports.js") ? bot.aliases.get("reports.js").aliases.join(`\n${prefix}`) : "None"
      },
      enableannouncements: {
        name: "**Enable Announcements**",
        usage: prefix + "enableannouncements",
        description: "Enable Pet Bot announcements",
        aliases: bot.aliases.get("enableannouncements.js") ? bot.aliases.get("enableannouncements.js").aliases.join(`\n${prefix}`) : "None"
      },
      disableannouncements: {
        name: "**Disable Announcements**",
        usage: prefix + "disableannouncements",
        description: "Disable Pet Bot announcements",
        aliases: bot.aliases.get("disableannouncements.js") ? bot.aliases.get("disableannouncements.js").aliases.join(`\n${prefix}`) : "None"
      }
    },
    petcommands: {
      name: "**Pet Commands**",
      adopt: {
        name: "**Adopt**",
        usage: prefix + "adopt <type> <name> | (gender)",
        description: "Adopt your very own pet",
        aliases: bot.aliases.get("adopt.js") ? bot.aliases.get("adopt.js").aliases.join(`\n${prefix}`) : "None"
      },
      remove: {
        name: "**Remove**",
        usage: prefix + "remove <pet>",
        description: "Remove your pet",
        aliases: bot.aliases.get("remove.js") ? bot.aliases.get("remove.js").aliases.join(`\n${prefix}`) : "None"
      },
      rename: {
        name: "**Rename**",
        usage: prefix + "rename <pet> | <new name>",
        description: "Rename a pet.",
        aliases: bot.aliases.get("rename.js") ? bot.aliases.get("rename.js").aliases.join(`\n${prefix}`) : "None"
      },
      retrieve: {
        name: "**Retrieve**",
        usage: prefix + "retrieve <pet>",
        description: "Retrieve your pet from the shelter if they were taken away",
        aliases: bot.aliases.get("retrieve.js") ? bot.aliases.get("retrieve.js").aliases.join(`\n${prefix}`) : "None"
      },
      checkon: {
        name: "**Check On**",
        usage: prefix + "checkon <pet>",
        description: "Check your pets status",
        aliases: bot.aliases.get("checkon.js") ? bot.aliases.get("checkon.js").aliases.join(`\n${prefix}`) : "None"
      },
      mate: {
        name: "**Mate**",
        usage: prefix + "mate <pet> | <other pet>",
        description: "Mate 2 pets.",
        aliases: bot.aliases.get("mate.js") ? bot.aliases.get("mate.js").aliases.join(`\n${prefix}`) : "None"
      },
      adoptablepets: {
        name: "**Adoptable Pets**",
        usage: prefix + "adoptablepets",
        description: "Get a list of all available pet types",
        aliases: bot.aliases.get("adoptablepets.js") ? bot.aliases.get("adoptablepets.js").aliases.join(`\n${prefix}`) : "None"
      },
      pets: {
        name: "**Pets**",
        usage: prefix + "pets",
        description: "Get a list of all of your pets",
        aliases: bot.aliases.get("pets.js") ? bot.aliases.get("pets.js").aliases.join(`\n${prefix}`) : "None"
      },
      water: {
        name: "**Water**",
        usage: prefix + "water <pet> (num)",
        description: "Give your pet water",
        aliases: bot.aliases.get("water.js") ? bot.aliases.get("water.js").aliases.join(`\n${prefix}`) : "None"
      },
      feed: {
        name: "**Feed**",
        usage: prefix + "feed <pet> (num)",
        description: "Give your pet food",
        aliases: bot.aliases.get("feed.js") ? bot.aliases.get("feed.js").aliases.join(`\n${prefix}`) : "None"
      },
      walk: {
        name: "**Walk**",
        usage: prefix + "walk <pet>",
        description: "Take your pet for a walk",
        aliases: bot.aliases.get("walk.js") ? bot.aliases.get("walk.js").aliases.join(`\n${prefix}`) : "None"
      },
      park: {
        name: "**Park**",
        usage: prefix + "park <pet>",
        description: "Take your pet to the park.",
        aliases: bot.aliases.get("park.js") ? bot.aliases.get("park.js").aliases.join(`\n${prefix}`) : "None"
      },
      vet: {
        name: "**Vet**",
        usage: prefix + "vet <pet>",
        description: "Take your pet to the vet.",
        aliases: bot.aliases.get("vet.js") ? bot.aliases.get("vet.js").aliases.join(`\n${prefix}`) : "None"
      },
      sit: {
        name: "**Sit**",
        usage: prefix + "sit <pet>",
        description: "Take your pet to the sitter.",
        aliases: bot.aliases.get("sit.js") ? bot.aliases.get("sit.js").aliases.join(`\n${prefix}`) : "None"
      },
      give: {
        name: "**Give**",
        usage: prefix + "give <pet OR @user> | <item OR pet/money>",
        description: "Give your pet an item, or give a user your pet, or give a user money. (ex pet!give name | item)",
        aliases: bot.aliases.get("give.js") ? bot.aliases.get("give.js").aliases.join(`\n${prefix}`) : "None"
      },
      bond: {
        name: "**Bond**",
        usage: prefix + "bond <pet>",
        description: "Bond with your pet",
        aliases: bot.aliases.get("bond.js") ? bot.aliases.get("bond.js").aliases.join(`\n${prefix}`) : "None"
      },
      tricks: {
        name: "**Tricks**",
        usage: prefix + "tricks <pet>",
        description: "See your pets progress on their tricks",
        aliases: bot.aliases.get("tricks.js") ? bot.aliases.get("tricks.js").aliases.join(`\n${prefix}`) : "None"
      },
      newtrick: {
        name: "**New Trick**",
        usage: prefix + "newtrick <pet> | <trick>",
        description: "Teach your pet a trick of your choice",
        aliases: bot.aliases.get("newtrick.js") ? bot.aliases.get("newtrick.js").aliases.join(`\n${prefix}`) : "None"
      },
      removetrick: {
        name: "**Remove Trick**",
        usage: prefix + "removetrick <pet> | <trick>",
        description: "Remove a trick of your choice",
        aliases: bot.aliases.get("removetrick.js") ? bot.aliases.get("removetrick.js").aliases.join(`\n${prefix}`) : "None"
      },
      perform: {
        name: "**Perform Trick**",
        usage: prefix + "perform <pet> | <trick>",
        description: "Have your pet perform a trick for some money",
        aliases: bot.aliases.get("perform.js") ? bot.aliases.get("perform.js").aliases.join(`\n${prefix}`) : "None"
      },
      share: {
        name: "**Share**",
        usage: prefix + "share <pet> | <@user>",
        description: "Share your pet with another user",
        aliases: bot.aliases.get("share.js") ? bot.aliases.get("share.js").aliases.join(`\n${prefix}`) : "None"
      },
      unshare: {
        name: "**Unshare**",
        usage: prefix + "unshare <pet> | <@user>",
        description: "Unshare your pet from another user",
        aliases: bot.aliases.get("unshare.js") ? bot.aliases.get("unshare.js").aliases.join(`\n${prefix}`) : "None"
      },
      play: {
        name: "**Play**",
        usage: prefix + "play <pet> | <other pet>",
        description: "Have 2 pets play together",
        aliases: bot.aliases.get("play.js") ? bot.aliases.get("play.js").aliases.join(`\n${prefix}`) : "None"
      }
    },
    money: {
      name: "**Money Commands**",
      work: {
        name: "**Work**",
        usage: prefix + "work",
        description: "Work for money",
        aliases: bot.aliases.get("work.js") ? bot.aliases.get("work.js").aliases.join(`\n${prefix}`) : "None"
      },
      bal: {
        name: "**Balance**",
        usage: prefix + "bal",
        description: "Get your current balance",
        aliases: bot.aliases.get("bal.js") ? bot.aliases.get("bal.js").aliases.join(`\n${prefix}`) : "None"
      },
      daily: {
        name: "**Daily**",
        usage: prefix + "daily",
        description: "Collect your daily money",
        aliases: bot.aliases.get("daily.js") ? bot.aliases.get("daily.js").aliases.join(`\n${prefix}`) : "None"
      },
      inventory: {
        name: "**Inventory**",
        usage: prefix + "inventory",
        description: "Get the items in your inventory",
        aliases: bot.aliases.get("inventory.js") ? bot.aliases.get("inventory.js").aliases.join(`\n${prefix}`) : "None"
      },
      buy: {
        name: "**Buy**",
        usage: prefix + "buy (item) (quantity)",
        description: "Buy an item",
        aliases: bot.aliases.get("buy.js") ? bot.aliases.get("buy.js").aliases.join(`\n${prefix}`) : "None"
      },
      market: {
        name: "**Market**",
        usage: prefix + "market <flag>",
        description: "Access the user market.",
        aliases: bot.aliases.get("market.js") ? bot.aliases.get("market.js").aliases.join(`\n${prefix}`) : "None"
      },
      lottery: {
        name: "**Lottery**",
        usage: prefix + "lottery (buy | jackpot | numbers)",
        description: "Buy a lottery ticket, or check your numbers, or its jackpot",
        aliases: bot.aliases.get("lottery.js") ? bot.aliases.get("lottery.js").aliases.join(`\n${prefix}`) : "None"
      }
    },
    other: {
      name: "Other",
      achievements: {
        name: "**Achievements**",
        usage: prefix + "achievements (flag)",
        description: "View your achievements, or list all achievements",
        aliases: bot.aliases.get("achievements.js") ? bot.aliases.get("achievements.js").aliases.join(`\n${prefix}`) : "None"
      }
    }

  };
  let args = msg.split(" ").slice(1);
  if(!args[0]){
    var options = {
      limit: 60*1000,
      min: 1,
      max: 4,
      page: 1
    }

    var general = []

    for(var name1 in commands1.general){
      if(name1 === "name"){

      }else{ 
        general.push(prefix + name1)
      }
    }

    var petcommands = []

    for(var name1 in commands1.petcommands){
      if(name1 === "name"){

      }else{ 
        petcommands.push(prefix + name1)
      }
    }

    var money = []

    for(var name1 in commands1.money){
      if(name1 === "name"){

      }else{ 
        money.push(prefix + name1)
      }
    }

    var other = []

    for(var name1 in commands1.other){
      if(name1 === "name"){

      }else{ 
        other.push(prefix + name1)
      }
    }


    var pages = {
      1: {
        title: "Page One",
        description: commands1.general.name,
        fields: [
          {name: "Commands:", value: `${general.map(name => name).join('\n')}`} , {name: "Support Server", value: "I'm always looking for new features, join the discord [here](https://discord.gg/FnexaEy) to also report bugs!"}, {name: "Feeling Generous?", value: `Feeling generous? Or just want to support development? You can find my patreon [here](https://patreon.com/DigitalSteven). You can also vote by doing ${prefix}vote`} 
        ]
      },
      2: {
        title: "Page Two",
        description: commands1.petcommands.name,
        fields: [
          {name: "Commands:", value: `${petcommands.map(name => name).join('\n')}`}  , {name: "Support Server", value: "I'm always looking for new features, join the discord [here](https://discord.gg/FnexaEy) to also report bugs!"}
        ]
      },
      3: {
        title: "Page Three",
        description: commands1.money.name,
        fields: [
          {name: "Commands:", value: `${money.map(name => name).join('\n')}`}, {name: "Support Server", value: "I'm always looking for new features, join the discord [here](https://discord.gg/FnexaEy) to also report bugs!"}  
        ]
      },
      4: {
        title: "Page Four",
        description: commands1.other.name,
        fields: [
          {name: "Commands:", value: `${other.map(name => name).join('\n')}`}, {name: "Support Server", value: "I'm always looking for new features, join the discord [here](https://discord.gg/FnexaEy) to also report bugs!"}  
        ]
      }
    }

    try {
      var m = await message.channel.send({
        embed: pages[options.page]
      });
      await m.react("⬅")
      await m.react("➡")
      await message.channel.send("For info on a specific command, do " + prefix + "help (command). This will also show aliases.")
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
      }


      awaitReactions(message, m, options, filter);
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
      console.error(err)
    }
  }
  for(var name in commands1){
    for(var name1 in commands1[name]){
      if(name1 == args[0]){
        delete cooldowns[message.author.id]
        var commandname = name1;
        let alias = bot.aliases.get(commandname + ".js") ? bot.aliases.get(commandname + ".js").aliases : "None"
        let embed = new Discord.MessageEmbed()
        .setDescription(commands1[name][commandname].name)
        .setColor(0x00fff3)
        .addField("Usage:", commands1[name][commandname].usage)
        .addField("Description:", commands1[name][commandname].description)
        .addField("Aliases", alias != "None" ? `${prefix}${alias.join(`\n${prefix}`)}` : "None")
        return await message.channel.send(embed)
      }
    }
  }
  delete cooldowns[message.author.id]
  if(args[0]) return message.channel.send("Hm, check your spelling and try again!");
};
