// Calling the package
const Discord = require('discord.js');
const bot = new Discord.Client({shardCount: 'auto'});
const fs = require('fs');
const moment = require('moment');
const ms = require("ms");
const https = require("https")
// const myDBL = require('./api.js')
const myDBL = require('new-dblapi')
const { MongoClient } = require('mongodb')
let url = 'mongodb://localhost:27017'
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.newcommands = new Discord.Collection();
bot.newaliases = new Discord.Collection();
var privates = JSON.parse(fs.readFileSync("../private.json", "utf8"))
var cooldowns = {}
bot.webhook;
bot.webhookRequests = []
bot.webhookId;

bot.Sentry = require('@sentry/node');
bot.Sentry.init({ dsn: 'you thought' });

bot.myThing = new myDBL(privates.dblt, {port: 5555, auth: privates.dbla, path:"dblwebhook"}, bot)
bot.myThing.on('vote', (vote) => {
  console.log("vote")
  if(vote.user == "353782817777385472")console.log(vote)
  try{
    var test = bot.playerstorage.get(vote.user)
    if(!test) return console.log(`${vote.user} voted`)
  }catch(err){
    console.error(err)
  }
  if(!vote.isWeekend){
    bot.playerstorage.math(vote.user, "add", 5000, "balance")
  }else{
    bot.playerstorage.math(vote.user, "add", 10000, "balance")
  }
  return console.log(`User with ID ${vote.user} just voted!`)
})

const enmap = require('enmap')
bot.playerstorage = new enmap({
  name: "pllayerstorage",
  autoFetch: true,
  fetchAll: true,
  ensureProps: true
});
bot.lottery = new enmap({
  name: "lottery",
  autoFetch: true,
  fetchAll: true
});
bot.playerpets = new enmap({
  name: "playerpets",
  autoFetch: true,
  fetchAll: true
});
bot.prefixes = new enmap({
  name: "prefixes",
  autoFetch: true,
  fetchAll: true
});
bot.retrieve = new enmap({
  name: "retrieve",
  autoFetch: true,
  fetchAll: true
});

bot.stats = new enmap({
  name: "stats1",
  autoFetch: true,
  fetchAll: true
});

bot.market = new enmap({
  name: "market",
  autoFetch: true,
  fetchAll: true
});


var prefixes

// Listener Event: Bot Launched
bot.on('ready', async () => {
  bot.webhook = await bot.fetchWebhook("548679798839574543");
  console.log('Power Level Stabilized') // Runs when the bot is launched

  //const botchat = bot.channels.get("469992574791319552")
  //const generalchat = bot.channels.get("469490700845580298")
  //generalchat.send(`Topic of the week: `)
  
  let mongoDataBase = await MongoClient.connect(url, { useNewUrlParser: true })
  bot.db = await mongoDataBase.db('petbot')
  // let cursor = await bot.db.collection('users').find({})
  // cursor.forEach(thing => {
  //   console.log(thing)
  // })


  bot.user.setActivity("Default prefix: pet! | Support our project!")
  fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err)

    let jsfiles = files.filter(f => f.split(".").pop() === "js")

    if(jsfiles <= 0){
      return console.log("Nothing loaded.")
    }

    jsfiles.forEach((f, i) => {
      let props = require(`./cmds/${f}`)
      bot.commands.set(f, props)
      bot.aliases.set(f, props.aliases)
    });
  });
  fs.readdir("./newcmds/", (err, files) => {
    if(err) console.error(err)

    let jsfiles = files.filter(f => f.split(".").pop() === "js")

    if(jsfiles <= 0){
      return console.log("Nothing loaded.")
    }

    jsfiles.forEach((f, i) => {
      let props = require(`./newcmds/${f}`)
      bot.newcommands.set(f, props)
      bot.newaliases.set(f, props.aliases)
    });
  });
  // let readyEmbed = new Discord.MessageEmbed()
  // readyEmbed.setDescription(`Connected`)
  // readyEmbed.setColor("#32cd32")
  // readyEmbed.setThumbnail(bot.user.displayAvatarURL())
  // readyEmbed.setTimestamp()
  // await webhook.send(readyEmbed)
  require("./libstuff/petevents.js").run(bot)
  require("./libstuff/library.js").run(bot)
});

// bot.on('shardDisconnected', (event, id) => {
//   bot.on('ready', async () => {
//     setTimeout(() => {
//       let embed = new Discord.MessageEmbed()
//       .setTitle("Shard Disconnect")
//       .setColor("#ff0000")
//       .setDescription(`\`\`\`xl\n${event.reason}, ${event.id}\`\`\``)
//       .addField("Clean?", event.wasClean)
//       .addField("Shard id", id)
//       bot.webhookRequests.push(embed)
//       if(!bot.webhookId){
//         bot.webhookId = bot.setInterval(bot.sendHooks, 1000)
//       }
//       return
//     }, 500)
//   })
// })

// bot.on('shardError', (error, id) => {
//   bot.on('ready', async () => {
//     setTimeout(() => {
//       let embed = new Discord.MessageEmbed()
//       .setTitle("Shard Error")
//       .setColor("#ff0000")
//       .setDescription(`\`\`\`xl\n${error.message}\`\`\``)
//       .addField("Shard id", id)
//       bot.webhookRequests.push(embed)
//       if(!bot.webhookId){
//         bot.webhookId = bot.setInterval(bot.sendHooks, 1000)
//       }
//       return
//     }, 500)
//   })
// })

// bot.on('shardReady', (id) => {
//   bot.on('ready', async () => {
//     setTimeout(() => {
//       let embed = new Discord.MessageEmbed()
//       .setTitle("Shard Ready")
//       .setColor("#00ff00")
//       .addField("Shard id", id)
//       bot.webhookRequests.push(embed)
//       if(!bot.webhookId){
//         bot.webhookId = bot.setInterval(bot.sendHooks, 1000)
//       }
//       return
//     }, 500)
//   })
// })

// bot.on('shardReconnecting', (id) => {
//   bot.on('ready', async () => {
//     setTimeout(() => {
//       let embed = new Discord.MessageEmbed()
//       .setTitle("Shard Reconencting")
//       .setColor("#ffa500")
//       .addField("Shard id", id)
//       bot.webhookRequests.push(embed)
//       if(!bot.webhookId){
//         bot.webhookId = bot.setInterval(bot.sendHooks, 1000)
//       }
//       return
//     }, 500)
//   })
// })

// bot.on('shardResumed', (id, events) => {
//   bot.on('ready', async () => {
//     setTimeout(() => {
//       let embed = new Discord.MessageEmbed()
//       .setTitle("Shard Resumed")
//       .setColor("#00ff00")
//       .addField("Shard id", id)
//       bot.webhookRequests.push(embed)
//       if(!bot.webhookId){
//         bot.webhookId = bot.setInterval(bot.sendHooks, 1000)
//       }
//       return
//     }, 500)
//   })
// })

bot.on('error', (error) => console.error(error))


bot.on("guildCreate", async (guild) => {
  bot.prefixes.ensure(guild.id, "pet!")
  let members = guild.members.filter(m => !m.user.bot).size
  let bots = guild.members.filter(m => m.user.bot).size
  let embed = new Discord.MessageEmbed()
  .setTitle("Server Added")
  .setColor("#32cd32")
  .setDescription(`**${guild.name}**`)
  .setThumbnail(guild.iconURL())
  .addField("ID", guild.id)
  .addField("Member Count", members)
  .addField("Bot Count", bots)
  .addField("Total Users", members + bots)
  try{
    embed.addField("Owner", `${guild.owner.user.username}: ${guild.owner.id}`)
  }catch(e){}
  embed.setFooter(`Joined on ${new Date()}`, bot.user.displayAvatarURL())
  await bot.webhook.send(embed)
})

bot.on("guildDelete", async (guild) => {
  let members = guild.members.filter(m => !m.user.bot).size
  let bots = guild.members.filter(m => m.user.bot).size
  let embed = new Discord.MessageEmbed()
  .setTitle("Server Removed")
  .setColor("#ff0000")
  .setDescription(`**${guild.name}**: ${guild.id}`)
  .setThumbnail(guild.iconURL())
  .addField("Member Count", members)
  .addField("Bot Count", bots)
  .addField("Total Users", members + bots)
  .setFooter(`Removed on ${new Date()}`, bot.user.displayAvatarURL())
  await bot.webhook.send(embed)
  let partners = JSON.parse(fs.readFileSync("./storage/partners.json", "utf8")).ids
  if(partners.includes(guild.id)){
    await bot.webhook.send(`${await bot.guilds.get("529552050246123520").members.get("353782817777385472").toString()} partner guild ${guild.name} has removed Pet Bot! Owner: ${guild.owner.user.tag} Contact if possible.`)
  }
})



bot.on('message', async message => {
  if(message.author.id == "353782817777385472"){
    try{
      let emojis = bot.emojis.filter(e => e)
      emojis = emojis.map(e => e.name);
      for(let j = 0; j < emojis.length; j++){
        if(message.content.startsWith(`:${emojis[j]}:`)){
          await message.delete(500)
          await message.channel.send(bot.emojis.find(e => e.name == emojis[j]).toString())
          break
        }
      }
    }catch(e){}
  }
  bot.stats.math("stats1", "add", 1, "messages_read")
  if(message.channel.type == 'dm'){
    if(message.content.toLowerCase() == "stop"){
      var nodm = JSON.parse(fs.readFileSync("./storage/dontdm.json", "utf8"))
      var y = nodm
      var x = message.author.id
      if(y.dontdm.includes(x)){
        return await message.reply("I won't be messaging you anyways")
      }
      y.dontdm.push(x)
      fs.writeFileSync('./storage/dontdm.json', JSON.stringify(y))
      try{
        return await message.reply("I will no longer dm you, to restart it, message me 'start'")
      }catch(e){ return }
    }
    if(message.content.toLowerCase() == "start"){
      var nodm = JSON.parse(fs.readFileSync("./storage/dontdm.json", "utf8"))
      var y = nodm
      var x = message.author.id
      if(!y.dontdm.includes(x)){
        return await message.reply("I'm already messaging you...")
      }
      var idx = y.dontdm.indexOf(x)
      y.dontdm.splice[idx, 1]
      fs.writeFileSync('./storage/dontdm.json', JSON.stringify(y))
      try{
        return await message.reply("I will now message you updates, to stop message me 'stop'")
      }catch(e){ return }
    }
    if(message.author != bot.user) return
    let embed = new Discord.MessageEmbed()
    .setDescription("New DM")
    .addField("By", `${message.author.username}`)
    .addField("Content", message.content)
    .addField("Message ID", message.id)
    .addField("Channel ID", message.channel.id)
    .setColor("#08fffe")
    .setFooter(`User ID: ${message.author.id}`, message.author.displayAvatarURL())
    bot.webhookRequests.push(embed)
    if(!bot.webhookId){
      bot.webhookId = bot.setInterval(bot.sendHooks, 1000)
    }
    return
  }
  if(message.channel.type == 'dm') return
  if(!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return
  fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err)

    let jsfiles = files.filter(f => f.split(".").pop() === "js")

    if(jsfiles <= 0){
      return console.log("Nothing loaded.")
    }

    jsfiles.forEach((f, i) => {
      let props = require(`./cmds/${f}`)
      bot.commands.set(f, props)
      bot.aliases.set(f, props.aliases)
    });
  });


  try{
    if(message.channel.type == 'dm') return;
    var clientPerms = message.guild.me.permissions
    }catch(err){
      await webhook.send("Mate, there was an error somewhere")
      let embed = new Discord.MessageEmbed()
      .setTitle("Bad coding = error")
      .setDescription("F to pay respects")
      .setColor("#ff0000")
      .addField("Author", `${message.author.username} AKA ${message.member.mickname || "no nick cuz lame"}`)
      .addField("Message", message.content)
      .addField("Got this error bro", e)
      await webhook.send(embed)
    }
  var prefix = bot.prefixes.get(message.guild.id)
  if(!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return
  if(message.author.bot) return;
  let serverblacklist = JSON.parse(fs.readFileSync("./storage/sblacklist.json"))
  if(serverblacklist[message.guild.id] && message.content.startsWith(prefix)){
    return await message.channel.send(`Guild has been blacklisted! Reason: ${serverblacklist[message.guild.id]}`)
  }
  if(message.mentions.users.first() == bot.user && message.content.split(" ").length == 1){
    await message.channel.send(`My current prefix is ${prefix}`)
  }

  if(!bot.playerpets.get(message.author.id)){
    if(bot.playerstorage.get(message.author.id)){
      if(bot.playerstorage.get(message.author.id, "balance") <= 0 && !bot.playerstorage.get(message.author.id, "items")){
        bot.playerstorage.delete(message.author.id)
      }
    }
  }


  if(!prefix){
    bot.prefixes.set(message.guild.id, "pet!")
    prefix = "pet!"
    console.log("prefix set");
  }
  if(!message.content.toLowerCase().startsWith(prefix)){
    // let data = fs.readFileSync("./storage/data.txt", "utf8")
    // data = data + `\n${message.content}`
    // fs.writeFileSync("./storage/data.txt", data)
    return
  } 
  if(message.content.startsWith(prefix)){
    let members = message.guild.members.filter(m => !m.user.bot).size
    let bots = message.guild.members.filter(m => m.user.bot).size
    var whitelist = JSON.parse(fs.readFileSync("./storage/serverwhitelist.json", "utf8")).whitelist
    if((bots > members && bots > 20) && !whitelist.includes(message.guild.id)){
      return await message.channel.send(`Your bot count (${bots}) is greater than the member count (${members}). It is assumed that this server is a bot farm and will not be allowed to use my commands, to apply for a whitelist, please join the support server.`)
    }
    var blacklist = JSON.parse(fs.readFileSync("./storage/blacklist.json", "utf8"))
    if(blacklist[message.author.id]) return await message.reply(`Sorry, your were blacklisted for the reason: ${blacklist[message.author.id].reason}`)
  }
  let sender = message.author; // The person who sent the message
  let msg = message.content.toLowerCase();
  let nick = sender.username
  let args = message.content.toLowerCase().split(" ")
  if (bot.user.id === sender.id) { return }
  if(message.content.split(' ')[0] === prefix + "prefix"){
    let perms = message.member.permissions;
    let args = message.content.split(" ").slice(1)
    if(!args[0]){
      return message.channel.send(`Current prefix: ${bot.prefixes.get(message.guild.id)}`)
    }
    if(!perms.has("ADMINISTRATOR") && message.author.id != "353782817777385472") return await message.channel.send("No permissions")
    let newPrefix = args[0].toLowerCase();
    bot.prefixes.set(message.guild.id, newPrefix)
    return message.reply(`I have set the prefix to ${newPrefix}`)
  }

  if(msg === prefix + "ping"){
    let m = await message.channel.send("Ping?");
    m.edit(`Pong. Latency: ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);
    return;
  }
  // Invite this bot
  if(msg === prefix + "invite"){
    message.delete()
    let user = message.member
    bot.generateInvite(['SEND_MESSAGES', 'MANAGE_MESSAGES'])
      .then(link => user.send(`Thanks for wanting to invite this bot to your server! Here's your invite link: <${link}> If you have trouble or questions, go here: <https://discord.gg/FnexaEy>`)).catch(e => {message.reply("I couldn't send you the invite! Allow DM's from me")});
  };
  let cmd = bot.commands.get(`${args[0].toLowerCase().slice(prefix.length)}.js`);
  if(cmd){
    var test = bot.playerstorage.get(message.author.id)
    if((!test) && (args[0] !== `${prefix}help` && args[0] !== `${prefix}adopt` && args[0] !== `${prefix}adoptablepets`)/* && message.author.id != "353782817777385472"*/){
      return await message.channel.send(`You have never adopted a pet before! get started with ${prefix}adopt`)
    } 
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
          cooldowns[message.author.id].spam++
          if(cooldowns[message.author.id].spam >= 5){
            var logs;
            var logs1 = message.channel.fetchMessages(50).then(mess =>{
              var messages = mess.filter(m => m.author.id == message.author.id)
              logs = messages.map(me => `${me.content}: ${me.createdAt}`)
            })
            bot.setTimeout(function(){
              var blacklist = JSON.parse(fs.readFileSync("./storage/blacklist.json", "utf8"))
              let toBlacklist = message.author.id
              let reason = "Autoblacklist: Spam, appeal at the support server"
              var t = blacklist
              var v = toBlacklist
              t[v] = {}
              t[v].logs = logs
              t[v].reason = reason;

              fs.writeFileSync('./storage/blacklist.json', JSON.stringify(t))
              return
            }, 3000)
          }
          if(cooldowns[message.author.id].said == 0){
            cooldowns[message.author.id].said = 1
            return await message.channel.send(`Sorry ${message.guild.members.get(message.author.id).nickname || message.author.username}, your global cooldown is still another ${seconds} second(s). Spamming will result in an auto blacklist`)
          }else{
            return
          }
        }
      }
    }
    let cooldown = message.createdTimestamp + (1000)
    cooldowns[message.author.id] = {time: cooldown, day: new Date().getDay(), said: 0, spam: 0}
    try{
      // if(message.author.id == "140101781102264320"){
      //   let dontrun = ["work","daily","buy","give","feed","water","adopt","market","lottery"]
      //   var dontrunvic = false;
      //   for(var i in dontrun){
      //     if(message.content.slice(prefix.length).toLowerCase().startsWith(dontrun[i])){
      //       dontrunvic = true;
      //     }
      //   }
      //   if(!dontrunvic){
      //     var vic = bot.playerstorage.get("140101781102264320")
      //     bot.setTimeout(async function(){
      //       bot.playerstorage.set("140101781102264320", vic)
      //     }, 2500)
      //   }
      // }
      if(message.author.id == "353782817777385472" && message.content.endsWith(" -d")){
        cmd = bot.newcommands.get(`${args[0].toLowerCase().slice(prefix.length)}.js`);
        message.content = message.content.slice(0, -3)
        cmd.run(bot, message, prefix)
        return
      }
      cmd.run(bot, message, prefix)
      // if(!dontrunvic){
        //   if(message.author.id == "140101781102264320"){
        //     let channel = bot.channels.get("530418022465273867")
        //     channel.send("Command")
        //     let embed = new Discord.MessageEmbed()
        //     .setTitle("Command Executed")
        //     .setDescription("Testing for errors")
        //     .setColor("#00ff00")
        //     .addField("Author", `${message.author.username}`)
        //     .addField("Message", message.content)
        //     channel.send(embed)
        //     let as = bot.playerstorage.get("140101781102264320")
        //     for(var vic in as){
        //       try{
        //         let keys = Object.keys(as[vic])
        //         if(keys.includes("type")){
        //           let channel = bot.channels.get("530418022465273867")
        //           channel.send("Error found.")
        //           await message.channel.send("Vic, this is an automated message saying that the last command you did caused the error. Please report this.")
        //         }
        //       }catch(e){}
        //     }
        //   }
      // }
    }catch(e){
      webhook.send("Mate, there was an error somewhere")
      let embed = new Discord.MessageEmbed()
      .setTitle("Bad coding = error")
      .setDescription("F to pay respects")
      .setColor("#ff0000")
      .addField("Author", `${message.author.username} AKA ${message.member.mickname || "no nick cuz lame"}`)
      .addField("Message", message.content)
      .addField("Got this error bro", e)
      await webhook.send(embed)
      console.error(e)
    }
    bot.stats.math("stats1", "add", 1, "commands_ran")
  }else{
    try{
      if(message.author.id == "353782817777385472" && message.content.endsWith(" -d")){
        var alias = bot.newaliases.find(a => a ? a.aliases.includes(args[0].toLowerCase().slice(prefix.length)) : "")
      }else{
        var alias = bot.aliases.find(a => a ? a.aliases.includes(args[0].toLowerCase().slice(prefix.length)) : "")
      }
    }catch(e){
      
    }
    if(alias){
      if(message.author.id == "353782817777385472" && message.content.endsWith(" -d")){
        let command = bot.newcommands.get(`${alias.command}.js`);
        message.content = message.content.slice(0, -3)
        command.run(bot, message, prefix)
        return
      }
      let command = bot.commands.get(`${alias.command}.js`)
      if(command){
        bot.stats.math("stats1", "add", 1, "commands_ran")
        command.run(bot, message, prefix)
      }
    }
  }
}); //the end of bot.on ------------------------------



function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

let d = new Date()
let secondsPastHour = d.getMinutes()*60 + d.getSeconds()
var intervalId = bot.setInterval( calculateStats, 60*60*1000 - secondsPastHour*1000 )
function calculateStats(){
  let cmd = bot.commands.get("dostuff.js")
  cmd.run(1, bot)
  clearInterval( intervalId );
  let d = new Date();
  let secondsPastHour = d.getMinutes()*60 + d.getSeconds();
  intervalId = bot.setInterval( calculateStats, 60*60*1000 - secondsPastHour*1000 );
}

// let now = new Date();
// let night = new Date(
//   now.getFullYear(),
//   now.getMonth(),
//   now.getDate() + 1,
//   0, 0, 0
// );
// let msToMidnight = night.getTime() - now.getTime();
// let intervalId2 = bot.setInterval(marketStuff, msToMidnight)
// function marketStuff(){
//   clearInterval( intervalId2 );
//   let now = new Date();
//   let night = new Date(
//     now.getFullYear(),
//     now.getMonth(),
//     now.getDate() + 1,
//     0, 0, 0
//   );
//   let msToMidnight = night.getTime() - now.getTime();
//   intervalId2 = bot.setInterval(marketStuff, msToMidnight)
// }


bot.sendHooks = () =>{
  bot.webhook.send(bot.webhookRequests[0])
  bot.webhookRequests.shift()
  clearInterval(bot.webhookId)
  if(bot.webhookRequests.length > 0){
    bot.webhookId = bot.setInterval(bot.sendHooks, 1000)
  }else{
    bot.webhookId = null
    try{ 
      clearInterval(bot.webhookId)
    }catch(e){}
  }
}

//  Login

// the bot.token('token')
bot.login(privates.pt).then(() => {console.log('connected')}).catch(e => console.error(e));
