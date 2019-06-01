module.exports.run = async(bot, message, prefix) => {
  const fs = require('fs')
  const http = require('http')
  const request = require('request')
  const Discord = require('discord.js')
  if(message.author.id != "353782817777385472") return
  // bot.playerstorage.set("140101781102264320", {balance: 15244, items: {food: 10, water: 10}})
  // var privates = JSON.parse(fs.readFileSync("../private.json", "utf8"))
  bot.webhookRequests.push("Hi")
  if(!bot.webhookId){
    bot.webhookId = setInterval(bot.sendHooks, 1000)
  }
  // await message.react("1⃣")
  // const myLib = require('../api.js')
  // let newApi = new myLib(privates.dblt, bot)
  // console.log(await newApi.checkVote("294544470953689088"))
 // let as = bot.playerstorage.get("140101781102264320")
  // for(var vic in as){
  //   try{
  //     let keys = Object.keys(as[vic])
  //     console.log(keys)
  //     if(keys.includes("type")){
  //       let channel = bot.channels.get("530418022465273867")
  //       channel.send("Error found.")
  //       await message.channel.send("Vic, this is an automated message saying that the last command you did caused the error. Please report this.")
  //     }
  //   }catch(e){}
  // }
  // var playerpets = bot.playerpets.fetchEverything()
  // var nodm = JSON.parse(fs.readFileSync("./storage/dontdm.json", "utf8"))
            
  //           for(var p1 of playerpets){
  //   var p = p1[0]
  //   for(var pet in bot.playerpets.get(p)){
  //     let t = bot.playerpets.get(p)
  //     let type = t[pet].type
  //   if(t[pet].pregnant && t[pet]){
  //     console.log(pet)
  //             if(!t[pet].pregtime >= 168){
  //               t[pet].pregtime++
  //             }else{
  //               let namesarr = []
  //               let posnames = ["Hank", "Pongo", "Hummer", "Artimus", "Igloo", "Sakura", "Spy", "Hope", "Toast", "Wonka", "Loki", "Arctic", "Timber", "Radial", "Tinkerbell", "Isabelle", "Dollar", "Anti", "Cody", "Twain", "Senior", "Ion", "Nero", "Cheech", "Brisk", "Nutmeg", "Vader", "Onyx", "Syrup", "Apache", "Sinbad", "Hudson", "Niko", "Satay", "Cleopatra", "Freckle", "Triton", "Miles", "Scamp", "Fozzy", "Dunkin", "Woody", "Hopper", "Aretha", "Crumb", "Natasha", "Vango", "Tabitha", "Arcane", "Lucky", "Clover", "Cyclone", "Lou", "Meeko", "Stinker", "Arista", "Cali", "Aurora", "Static", "Hex", "Ham", "Sherbert", "Thistle", "Scratch", "Tico", "Florence", "Chili", "Zeus", "Fuzzball", "Huck", "Trinity", "William", "Harvey", "Joey", "Hyper", "Ableton", "Nash", "Squirt", "Dasher", "Shooter", "Oasis", "Hemp", "Fiona", "Miller", "Aesop", "Chili", "Thermal", "Tickle", "Wonka", "Farley", "Portal", "Percy", "Cluster", "Albino", "Popcorn", "Wacky", "Marlin", "Sputnik", "Shakira", "Beau", "Pixel", "Hercules", "Croissant", "Silly", "Jetson", "Ruby", "Solar", "Spiral", "Brat", "Odd", "Diddy", "Fuzzbucket", "Bella", "Congo", "Fuzzy", "Bond", "Frank", "Fisk", "Webster", "Fraggle", "Onion", "Marcy", "Peachy", "Carlton", "Trek", "Treat", "Caper", "Mila", "Aura", "Cutlass", "Tilly", "Ember", "Ozzy", "Bulbasaur", "Pong", "Chubby", "Rasta", "Drift", "Nelly", "Bomber", "Splinter", "Hunter", "Hardy", "Glory", "Voodoo", "Wiggles", "Sweets", "Sigmund", "Flare", "Stitch", "Rockwell", "Dexter", "Daffy", "Irvin", "Plague", "Mystic", "Linux", "Salt", "Misty", "Orville", "Zim", "Mojo", "Typo", "Mulligan", "Doris", "Quasar", "Lurch", "Fabio", "Jumbo", "Oakley"]
  //               for(let hkq = 0; hkq < t[pet].litter; hkq++){
  //                 let picked = false
  //                 while(!picked){
  //                   var name = posnames[~~(Math.random() * posnames.length)]
  //                   if(!t[name] && !namesarr.includes(name)) picked = true
  //                 }
  //                 namesarr.push(name)
  //                 name = name.toLowerCase()
  //                 var gender;
  //                 let rand = Math.random()
  //                 if(rand > 0.5){ 
  //                   gender = "male" 
  //                 }else{
  //                   gender = "female"
  //                 }
  //                 let lifespan = Math.random() * (14 - 10) + 10
  //       	        t[name] = {
  //       	            type: type,
  //       	            gender: gender,
  //       	            health: 100,
  //       	            food: 100,
  //       	            water: 100,
  //       	            happiness: 100,
  //       	            age: 0,
  //       	            exercise: 100,
  //       	            socialization: 100,
  //       	            maxhp: 100,
  //       	            sharedto: [""],
  //       	            healthproblems: {},
  //       	            immunities: {},
  //       	            lifespan: lifespan
  //       	        }
  //               }
  //               try{
  //                 var y = nodm
  //                 var x = p
  //                 if(!y.dontdm.includes(x)){
  //                   try{
  //                     bot.users.get(p).send(`Your pet ${type} named ${pet.charAt(0).toUpperCase() + pet.slice(1)} has given birth to ${t[pet].litter} ${type}'s. They are named ${namesarr.join(", ")} use the rename command to rename them (To stop receiving these messages, reply stop)`)
  //                   }catch(e){}
  //                 }else{
  //                   let prevname = t[pet].pregname
  //                   let plstr = bot.playerstorage.get(p)
  //                   try{
  //                     let channel = await bot.channels.get(plstr[prevname])
  //                     await channel.send(`${bot.users.get(p).toString()} your pet ${type} named ${pet.charAt(0).toUpperCase() + pet.slice(1)} has given birth to ${t[pet].litter} ${type}'s. They are named ${namesarr.join(", ")} use the rename command to rename them`)
  //                   }catch(e){}
  //                 }
  //               }catch(err){
                  
  //               }
  //               t[pet].pregnant = false;
  //               bot.playerstorage.delete(p, `${t[pet].pregname}`)
  //             }
  //           }
  //   }
  //   }
  // let mems = await bot.guilds.get("529552050246123520").members
  // let time = new Date("2019 Feb 5")
  // let role = message.guild.roles.find(r => r.name == "OG")
  // for(var id1 of mems){
  //   id = id1[0]
  //   let joined = new Date(mems.get(id).joinedTimestamp)
  //   console.log("Joined " + joined)
  //   console.log(time)
  //   if(joined < time){
  //     try{
  //       console.log(role.id)
  //       await message.guild.members.get(id).addRole(role.id)
  //     }catch(e){
  //       return console.log(e.stack)
  //     }
  //   }
  // }
  // request("http://registry.npmjs.org/request", async (error, response, body) => {
  //   if(error) return console.log(error)
  //   if(response.statusCode == 200){
  //     let data = JSON.parse(body)
  //     let d = Object.entries(data.versions[data["dist-tags"].latest].dependencies)
  //     let str = ""
  //     for(var i = 0; i < d.length; i++){
  //       let dep = d[i][0]
  //       let url = `npmjs.com/package/${dep}`
  //       str += `[${d[i][0]}](${url}): ${d[i][1]} |`
  //     }
  //     let m = new Discord.RichEmbed()
  //     .addField("Dep", str.slice(0, -1))
  //     await message.channel.send(m)
  //   }
  // })
  // try{
  //   var q = bot.playerstorage.math("ahusfghuabfukasgfuyqv")
  //   console.log(q)
  // }catch(e){
  //   await message.channel.send(e)
  //   console.log(e)
  // }
// let emoji = await bot.guilds.get("264445053596991498").emojis.get("356831697385422848").url
// await console.log(emoji)
  // var ret = bot.retrieve.fetchEverything()
  // for(var id1 of ret){
  //   id = id1[0]
  //   console.log(id)
  //   var pets = bot.retrieve.get(id)
  //   for(var pet in pets){
  //     bot.retrieve.math(id, "add", 0.01, `${pet}.age`)
  //     var t = pets[pet]
  //     if(!t.lifespan){
  //       t.lifespan = Math.random() * (14 - 10) + 10
  //     }else{
  //       if(t.age.toFixed(2) >= t.lifespan.toFixed(2)){
  //         bot.retrieve.delete(id, pet)
  //         try{
  //           var y = nodm
  //           var x = id
  //           if(!y.dontdm.includes(x)){
  //             bot.users.get(id).send(`Your pet ${type} named ${pet.charAt(0).toUpperCase() + pet.slice(1)} has died! They died of old age, age: ${stats.age.toFixed(2)}. (To stop receiving these messages, reply stop)`)
  //           }
  //         }catch(err){
           
  //         }
  //       }
  //     }
  //     if(pet == "object Object"){
  //       bot.retrieve.delete(id, pet)
  //     }
  //   }
  //   if(isEmpty(pets)){
  //     bot.retrieve.delete(id)
  //     // return console.log("Returned early")
  //   }
  // }
  
  // function isEmpty(obj) {

  //   // null and undefined are "empty"
  //   if (obj == null) return true;

  //   // Assume if it has a length property with a non-zero value
  //   // that that property is correct.
  //   if (obj.length > 0)    return false;
  //   if (obj.length === 0)  return true;

  //   // If it isn't an object at this point
  //   // it is empty, but it can't be anything *but* empty
  //   // Is it empty?  Depends on your application.
  //   if (typeof obj !== "object") return true;

  //   // Otherwise, does it have any properties of its own?
  //   // Note that this doesn't handle
  //   // toString and valueOf enumeration bugs in IE < 9
  //   for (var key in obj) {
  //       if (hasOwnProperty.call(obj, key)) return false;
  //   }

  //   return true;
  // }
  // console.log(all)
  
  
  // if(!message.mentions.members.first()) return await message.channel.send("You need to hug someone :(")
  // let response = `${message.member.nickname || message.author.username} hugged {users}`
  // let arr = message.mentions.users.map(m => m.id)
  // let nickarr = [];
  // for(var i = 0; i < arr.length; i++){
  //   let name = message.guild.members.get(arr[i]).nickname || message.guild.members.get(arr[i]).user.username
  //   nickarr.push(name)
  // }
  // if(arr.length == 1){
  //   console.log(nickarr[0])
  //   response = response.replace(/{users}/gi, nickarr[0])
  // }else{
  //   let last = nickarr.pop()
  //   console.log(`${nickarr.join(", ")} and ${last}`)
  //   response = response.replace(/{users}/gi, `${nickarr.join(", ")} and ${last}`)
  // }
  // return await message.channel.send(response)
  // message.channel.fetchMessages(50).then(mess =>{
  //   var messages = mess.filter(m => m.author.id == message.author.id)
    
  //   message.channel.send(messages.map(me => `${me.content}: ${me.createdAt}`), {split: true})
  // })
  // var args = message.content.split(" ").slice(1)
  // var responses = gatherResponses([], args, message); 
  // console.log(responses)
  // var mean = getMean(responses);
  // console.log(mean)
  // var newResp =  subtractAndSquare(mean, responses);
  // var sd = standardDeviation(newResp, responses.length);
  // return await message.channel.send("Standard deviation: " + sd)
  // var t = bot.playerpets.get(message.author.id)
  // var pet = "test"
  // var stats = t[pet]
  // var type = stats.type
  // console.log(stats)
  // if(stats.age.toFixed(2) >= t[pet].lifespan.toFixed(2)){
  //   console.log("test")
  //     try{
  //       var nodm = JSON.parse(fs.readFileSync("./storage/dontdm.json", "utf8"))
  //       var y = nodm
  //       var x = message.author.id
  //       if(!y.dontdm.includes(x)){
  //         bot.users.get(message.author.id).send(`Your pet ${type} named ${pet.charAt(0).toUpperCase() + pet.slice(1)} has died! They died of old age, age: ${stats.age}. (To stop receiving these messages, reply stop)`)
  //       }
  //     }catch(err){
  //       console.log(err)
  //     }
  //   }
  // var ret = bot.retrieve.fetchEverything()
  // for(var it1 of ret){
  //   var it = it1[0]
  //   for(var pet in bot.retrieve.get(it)){
  //     //console.log(pet)
  //     bot.retrieve.math(it, "add", 0.01, `${pet}.age`)
  //   }
  // }
  // var numbersarr = []
  // var idarr = []
  // for(var i1 of bot.lottery.fetchEverything()){
  //   var i = i1[0]
  //   var arr = bot.lottery.get(i, `numbers`)
  //   for(var j = 0; j < arr.length; j++){
  //     idarr.push(i)
  //     numbersarr.push(arr[j])
  //   }
    // let lottery = bot.lottery.get(i)
    // let tz = lottery
    // tz.numbers = []
    // bot.lottery.set(i, tz)
  // }
  
  // var rand = Math.floor(Math.random() * numbersarr.length);
  // console.log(rand)
  // var amount = numbersarr.length * 300 * 4
  // var lottery = bot.lottery.get(idarr[rand]);
  // console.log(numbersarr)
  // console.log(idarr)
  // console.log(numbersarr[rand])
  // console.log(lottery)
  // var tx = lottery
  // tx.wins += 1;
  // bot.lottery.set(idarr[rand], tx)
  // let playerstorage = bot.playerstorage.get(idarr[rand])
  // var ty = playerstorage
  // ty.balance += amount
  // console.log(bot.playerstorage.indexes)
  // bot.playerstorage.math("373664015278145547", "add", 500, "balance")
  // var t = bot.playerpets.get("361360305881743361")
  // t = t || {}
  // t["juno"].tricks = {"sit":16} 
  //     	        bot.playerpets.set("361360305881743361", t)
  // var players = JSON.parse(fs.readFileSync("./storage/playerpets.json", "utf8"))
  // var playerstorage = JSON.parse(fs.readFileSync("./storage/playerstorage.json", "utf8"))
  // for(var i in players){
  //   var id = i
  //   var a = players[i]
  //   bot.playerpets.set(id, a)
  //   console.log("done")
  // }
  // for(var f in playerstorage){
  //   var id = f
  //   var q = playerstorage[f]
  //   bot.playerstorage.set(id, q)
  //   console.log("Done")
  // }
  // var t = bot.playerpets.get("361360305881743361")
  //     	        t = t || {}
  //     	        t["Dag"] = {
  //     	            type: "dog",
  //     	            health: 100,
  //     	            food: 100,
  //     	            water: 100,
  //     	            happiness: 100,
  //     	            age: 0,
  //     	            exercise: 100,
  //     	            socialization: 100,
  //     	            sharedto: []
  //     	        }
  //     	        t["Dag"]["healthproblems"] = {}
  //     	        bot.playerpets.set("361360305881743361", t)
//   for(var id of bot.playerstorage.fetchEverything()) {
//   console.log("test")
// }
  // for(var id1 of bot.playerpets.fetchEverything()){
  //       try{
  //         var id = id1[0]
  //         var yu = bot.playerpets.get(id)
  //         for(var name in yu){
  //           var arr = bot.playerpets.get(id, `${name}.sharedto`)
  //           if(arr.includes(message.author.id)){
  //             var q = bot.playerpets.get(id)
  //             var e = name
  //             console.log(e)
  //           }
  //         }
  //       }catch(err){}
  // }
  // console.log(bot.playerpets.get("531800022140846081"))
  // bot.playerstorage.math("353782817777385472", "add", 72, "items.water")
  // console.log(bot.playerstorage.get("353782817777385472", "items.water"))
//   var index = 1
//   var guilds = bot.guilds.map(g => g.name)
//   var guilds1 = bot.guilds.map(g => `\`${index++}\` ` + `**${g.name}**` + ` == ${g.members.size}`)
//   try{
//     let perChunk = 25  
//   	  let arrays = guilds1.reduce((resultArray, item, x) => { 
//   	  const chunkIndex = Math.floor(x/perChunk)
  	
//   	  if(!resultArray[chunkIndex]) {
//   	    resultArray[chunkIndex] = [] // start a new chunk
//   	  }
  	
//   	  resultArray[chunkIndex].push(item)
  	
//   	  return resultArray
//   	}, [])
//   	for(var i = 0; i < arrays.length; i++){
//   	  message.channel.send(arrays[i].join('\n'))
//   	}
//   }catch(err){
    
//   }
//   message.channel.send("Reply with a name/number to get an invite link!")
//   try{
// 		var response = message.channel.awaitMessages(message2 => message2.author.id === message.author.id, {
// 			maxMatches: 1,
// 			time: 60000,
// 			errors: ['time']
// 		})
// 		.then((collected) => {
//         var msg1 = collected.first().content
//         var msg = parseInt(msg1) - 1 || msg1
//         var idx = guilds.indexOf(msg)
//         if(idx == -1){
//           idx = msg
//         }
//     	  var guild = bot.guilds.find(g => g.name == guilds[idx])
//     	  var channels = guild.channels.map(c => c.id)
//     	  var channel = bot.channels.get(channels[1]) 
//     	  channel.createInvite().then(invite =>
//         message.channel.send(`Heres the invite! ${invite.url}`)
//       ).catch(err => message.channel.send("I couldn't create an invite, sorry" + ` ${err}`))
//     })
//     .catch((err) => {
//       console.log(err)
//       message.channel.send('There was an error');
//     });
// 	}catch(err){
		
// 	}
};

function gatherResponses(arrs, args, message){
    var arr = arrs;
    for(var i = 0; i < args.length; i++){
      var input = args[i]
      console.log(input)
      if(Number(input)){
          arr.push(Number(input));
      }else{
          return message.channel.send("Something provided was not a number")
      }
    }
    return arr
}

function getMean(nums){
    var num = 0;
    for(var i = 0; i < nums.length; i++){
        num += Number(nums[i]);
    }
    console.log(num)
    return num/nums.length;
}

function subtractAndSquare(mean, nums){
    var returnNums = []
    for(var i = 0; i < nums.length; i++){
        var x = nums[i] - mean
        returnNums.push(x * x)
    }
    return returnNums
}

function standardDeviation(responses, max){
    var num = 0;
    for(var i = 0; i < responses.length; i++){
        num += Number(responses[i]);
    }
    var newMean = num/max
    return Math.sqrt(newMean)
}

