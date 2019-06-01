const Discord = require("discord.js")
let dmRequests = []
let dmId
let client
module.exports.run = async(id, bot) =>{
  client = bot
  if(bot.shard.id == 0){
    try{
      let test = parseInt(id)
      if(!test) return console.log("cant do that")
    }catch(e){
      let embed = new Discord.RichEmbed()
      .setTitle("New Error")
      .setColor("#ff0000")
      .setDescription(`There was an error\`\`\`md\n${e.message}\`\`\``)
      .setFooter(`Error on shard: ${bot.shard.id}`)
      bot.webhookRequests.push(embed)
      if(!bot.webhookId){
        bot.webhookId = setInterval(bot.sendHooks, 1000)
      }
    }
    const fs = require("fs")
    var date = new Date()
    var day = date.getDay()
    if(day == 0){
      var drawnt = JSON.parse(fs.readFileSync("./storage/lottery.json", "utf8"))
      if(!drawnt.drawn){
        drawnt.drawn = true
        fs.writeFileSync("./storage/lottery.json", JSON.stringify(drawnt))
        var numbersarr = []
        var idarr = []
        for(var i1 of bot.lottery.fetchEverything()){
          var i = i1[0]
          var arr = bot.lottery.get(i, `numbers`)
          for(var j = 0; j < arr.length; j++){
            idarr.push(i)
            numbersarr.push(arr[j])
          }
          let lottery = bot.lottery.get(i)
          let tz = lottery
          tz.numbers = []
          bot.lottery.set(i, tz)
        }
        if(numbersarr.length <= 0){
          bot.channels.get("529553058255077378").send("No one played the lottery, no winner was drawn")
          let announceid = JSON.parse(fs.readFileSync("./storage/announcements.json", "utf8"))
          let realids = announceid.ids
          for(var hku = 0; hku < realids.length; hku++){
            try{
              bot.channels.get(realids[hku]).send(`No one played the lottery, no winner was drawn`)
            }catch(err){
              let embed = new Discord.RichEmbed()
              .setTitle("New Error")
              .setColor("#ff0000")
              .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
              .setFooter(`Error on shard: ${bot.shard.id}`)
              bot.webhookRequests.push(embed)
              if(!bot.webhookId){
                bot.webhookId = setInterval(bot.sendHooks, 1000)
              }
              console.log(err)
            }
          }
        }else{
          var rand = Math.floor(Math.random() * numbersarr.length);
          var amount = numbersarr.length * 300 * 4
          bot.lottery.math(idarr[rand], "add", 1, "wins")
          let playerstorage = bot.playerstorage.get(idarr[rand])
          if(!playerstorage) playerstorage = {balance:0}
          var ty = playerstorage
          ty.balance += amount
          bot.playerstorage.set(idarr[rand], ty)
          dmRequests.push({recipient:idarr[rand],content:`You won the lottery! You got ${amount}`})
          if(!dmId){
            dmId = setInterval(sendDMs, 1000)
          }
          bot.channels.get("529553058255077378").send(`The lottery number has been drawn! Number: ${numbersarr[rand]}, the winner has been DM'd and won a grand total of $${amount}!`)
          let announceid = JSON.parse(fs.readFileSync("./storage/announcements.json", "utf8"))
          let realids = announceid.ids
          for(var hku = 0; hku < realids.length; hku++){
            try{
              bot.channels.get(realids[hku]).send(`The lottery number has been drawn! Number: ${numbersarr[rand]}, the winner has been DM'd and won a grand total of $${amount}!`)
            }catch(err){
              let embed = new Discord.RichEmbed()
              .setTitle("New Error")
              .setColor("#ff0000")
              .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
              .setFooter(`Error on shard: ${bot.shard.id}`)
              bot.webhookRequests.push(embed)
              if(!bot.webhookId){
                bot.webhookId = setInterval(bot.sendHooks, 1000)
              }
              console.log(err)
            }
          }
        }
      }
    }else if(day == 6){
      var drawnt = JSON.parse(fs.readFileSync("./storage/lottery.json", "utf8"))
      drawnt.drawn = false
      fs.writeFileSync("./storage/lottery.json", JSON.stringify(drawnt))
    }
    var playerpets = bot.playerpets.fetchEverything()
    var petstorage = JSON.parse(fs.readFileSync("./storage/pets.json", "utf8"))
    var playerstorage = bot.playerstorage.fetchEverything()
    var nodm = JSON.parse(fs.readFileSync("./storage/dontdm.json", "utf8"))
    var pets = {}
    for(var h1 of playerpets){
      var h = h1[0]
      for(var pet in bot.playerpets.get(h)){
        if(!pets[h]) pets[h] = 0
        pets[h] += 1
      }
    }
    for(var p1 of playerpets){
      var p = p1[0]
      for(var pet in bot.playerpets.get(p)){
        var test123 = bot.users.get(p)
        var t = bot.playerpets.get(p)
        if(!t || !t[pet]){
          bot.playerpets.delete(p)
        }else{
          var type = t[pet].type
          if(!type){
            bot.playerpets.delete(p)
            continue
          }else{
            var stats = t[pet]
            var health = stats.health
            if(!test123){
              bot.playerpets.delete(p)
              bot.playerstorage.delete(p)
            }else{
              if(!t[pet]) t[pet] = {}
              for(var sick in t[pet].healthproblems){
                if(sick == "heartworm"){
                  stats.health -= petstorage[type].health + 10
                  health -= petstorage[type].health + 10
                }
                if(sick == "skin allergies"){
                  stats.health -= petstorage[type].health + 5
                  health -= petstorage[type].health + 5
                }
                if(sick == "fleas"){
                  let newrand = ~~(Math.random()*((100-1)+1))+1
                  if(newrand >= 40){
                    delete t[pet].healthproblems["fleas"]
                  }
                  stats.health -= petstorage[type].health + 2
                  health -= petstorage[type].health + 2
                }
              }
              if(!t[pet].maxhp){
                t[pet].maxhp = 100
              }else if(stats.age < t[pet].lifespan/2){
                t[pet].maxhp += 1;
                stats.health += 1
                health += 1
              }else if(stats.age > (t[pet].lifespan/2 + 2)){
                var test562 = t[pet].maxhp - 4
                if(test562 <= 50){
                  t[pet].maxhp = 50
                }else{
                  t[pet].maxhp -= 4
                }
              }
              if(stats.age >= stats.lifespan/2){
                let plstr = bot.playerstorage.get(p)
                if(!plstr) plstr = {balance:0}
                if(!plstr.achievements){
                  plstr.achievements = {}
                  bot.playerstorage.set(p, plstr)
                }
                if(!plstr.achievements["He's getting old."]){
                  plstr.achievements["He's getting old."] = new Date()
                  bot.playerstorage.set(p, plstr)
                }
              }
              if(health != t[pet].maxhp){
                var temphealth = health + petstorage[type].health
                if(temphealth > t[pet].maxhp){
                  stats.health = t[pet].maxhp
                  health = t[pet].maxhp
                }else if(stats.food >= 70 && stats.water >= 70){
                  var temphp = health + (petstorage[type].health * 5)
                  if(temphp > t[pet].maxhp){
                    stats.health = t[pet].maxhp
                    health = t[pet].maxhp
                  }else{
                    stats.health = temphp
                    health = temphp
                  }
                }else{
                  stats.health = temphealth
                  health = temphealth
                }
              }
              bot.playerpets.set(p, t)
              var gen = ~~(Math.random()*((100-1)+1))+1
              var string = ""
              if(!t[pet].healthproblems) t[pet].healthproblems = {}
              if(!t[pet].immunities) t[pet].immunities = {}
              try{
                string = petstorage[type]["cantdevelop"].join(" ")
              }catch(err){
                
              }
              if(gen >= 95){
                if(string.includes("heartworm")){

                }else{

                  if(!t[pet].healthproblems["heartworm"] && !t[pet].immunities["heartworm"]) t[pet].healthproblems["heartworm"] = false
                }
              }
              if(gen >= 85 && gen <= 94){
                if(!t[pet].healthproblems["skin allergies"]) t[pet].healthproblems["skin allergies"] = false
              }
              stats.age += petstorage[type].age
              if(type == "snake"){
                for(var i = 0.1; i <= stats.age.toFixed(2); i += 0.1){
                  if(stats.age.toFixed(2) == i.toFixed(2)){

                    var y = nodm
                    var x = p
                    if(!y.dontdm.includes(x)){
                      dmRequests.push({recipient:p,content:`Your snake named ${pet.charAt(0).toUpperCase() + pet.slice(1)} has just shed their skin and are now at max health! (To stop receiving these messages, reply stop)`})
                      if(!dmId){
                        dmId = setInterval(sendDMs, 1000)
                      }
                    }
                    stats.health = stats.maxhp
                    health = stats.maxhp;
                  }
                }
              }
              if(type == "ferret"){
                if(stats.socialization <= 0){
                  health -= 10
                  stats.health = health
                }
              }
              if(t[pet].sit){
                var g = bot.playerstorage.get(p)
                if(!g) g = {balance:0}
                if(g.balance < 50){
                  var y = nodm
                  var x = p
                  if(!y.dontdm.includes(x)){
                    dmRequests.push({recipient:p,content:"Your pet was dropped off at your house as you can no longer pay for sitting services to stop receiving these messages, reply 'stop'"})
                    if(!dmId){
                      dmId = setInterval(sendDMs, 1000)
                    }
                  }
                  t[pet].sit = false
                }else{
                  g.balance -= 50;
                  bot.playerstorage.set(p, g)
                  stats.water = 100
                  stats.happiness = 100
                  stats.food = 100
                  stats.socialization = 100
                  stats.exercise = 100
                }
              }else{
                if(stats.socialization > 100){

                }else{
                  stats.socialization += (petstorage[type].socialization * -1) + (pets[p] - 1)
                }
                stats.water -= petstorage[type].water
                stats.happiness -= petstorage[type].happiness
                stats.food -= petstorage[type].food
                stats.exercise -= petstorage[type].exercise
                stats.health = health
              }
              if(stats.water <= 0 || stats.food <= 0 || stats.happiness <= 0 || stats.socialization <= -50 || stats.exercise <= -50){
                t[pet].water = 100
                t[pet].food = 100
                t[pet].happiness = 100
                t[pet].socialization = 100
                t[pet].exercise = 100
                t[pet].health = t[pet].maxhp
                if(!t[pet].timesRetrieved) t[pet].timesRetrieved = 0
                t[pet].healthproblems = {}
                var ax = t[pet]
                bot.retrieve.set(p, ax, pet)
                delete t[pet]
                try{
                  var y = nodm
                  var x = p
                  if(!y.dontdm.includes(x)){
                    dmRequests.push({recipient:p,content:`Your pet ${type} named ${pet.charAt(0).toUpperCase() + pet.slice(1)} has been taken away! You can retrieve them one time using (your prefix) pet!retrieve (pet name). You can only retrieve them once. (To stop receiving these messages, reply stop)`})
                    if(!dmId){
                      dmId = setInterval(sendDMs, 1000)
                    }
                  }
                }catch(err){
                  let embed = new Discord.RichEmbed()
                  .setTitle("New Error")
                  .setColor("#ff0000")
                  .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
                  .setFooter(`Error on shard: ${bot.shard.id}`)
                  bot.webhookRequests.push(embed)
                  if(!bot.webhookId){
                    bot.webhookId = setInterval(bot.sendHooks, 1000)
                  }
                }
                bot.playerpets.set(p, t)
                continue
              }else if(stats.health <= 0){
                var deathreasons = []
                for(var ti in t[pet].healthproblems){
                  deathreasons.push(ti)
                }
                delete t[pet]
                let plstr = bot.playerstorage.get(p)
                if(!plstr) plstr = {balance:0}
                if(!plstr.achievements){
                  plstr.achievements = {}
                  bot.playerstorage.set(p, plstr)
                }
                if(!plstr.achievements["Bad Owner."]){
                  plstr.achievements["Bad Owner."] = new Date()
                  bot.playerstorage.set(p, plstr)
                }
                try{
                  var y = nodm
                  var x = p
                  bot.stats.ensure("deaths", {})
                  let deathstats = bot.stats.get("deaths")
                  for(let ui = 0; ui < deathreasons.length; ui++){
                    let deathby = deathreasons[ui]
                    if(!deathstats[deathby]) deathstats[deathby] = 0
                    deathstats[deathby]++
                    bot.stats.set("deaths", deathstats)
                  }
                  if(!y.dontdm.includes(x)){
                    dmRequests.push({recipient:p,content:`Your pet ${type} named ${pet.charAt(0).toUpperCase() + pet.slice(1)} has died! They had ${deathreasons.join(", ") || "no health issues"} when they died. (To stop receiving these messages, reply stop)`})
                    if(!dmId){
                      dmId = setInterval(sendDMs, 1000)
                    }
                  }
                }catch(err){
                  let embed = new Discord.RichEmbed()
                  .setTitle("New Error")
                  .setColor("#ff0000")
                  .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
                  .setFooter(`Error on shard: ${bot.shard.id}`)
                  bot.webhookRequests.push(embed)
                  if(!bot.webhookId){
                    bot.webhookId = setInterval(bot.sendHooks, 1000)
                  }
                }
                bot.playerpets.set(p, t)
                continue
              }else{
                if(t[pet].lifespan){
                  if(Number(stats.age.toFixed(2)) >= Number(stats.lifespan.toFixed(2))){
                    delete t[pet]
                    let plstr = bot.playerstorage.get(p)
                    if(!plstr) plstr = {balance:0}
                    if(!plstr.achievements){
                      plstr.achievements = {}
                      bot.playerstorage.set(p, plstr)
                    }
                    if(!plstr.achievements["All Dogs Go to Heaven."]){
                      plstr.achievements["All Dogs Go to Heaven."] = new Date()
                      bot.playerstorage.set(p, plstr)
                    }
                    try{
                      var y = nodm
                      var x = p
                      bot.stats.ensure("deaths", {})
                      let deathstats = bot.stats.get("deaths")
                      if(!deathstats["age"]) deathstats["age"] = 0
                      deathstats["age"]++
                      bot.stats.set("deaths", deathstats)
                      if(!y.dontdm.includes(x)){
                        dmRequests.push({recipient:x,content:`Your pet ${type} named ${pet.charAt(0).toUpperCase() + pet.slice(1)} has died! They died of old age, age: ${stats.age.toFixed(2)}. (To stop receiving these messages, reply stop)`})
                        if(!dmId){
                          dmId = setInterval(sendDMs, 1000)
                        }
                      }
                    }catch(err){
                      let embed = new Discord.RichEmbed()
                      .setTitle("New Error")
                      .setColor("#ff0000")
                      .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
                      .setFooter(`Error on shard: ${bot.shard.id}`)
                      bot.webhookRequests.push(embed)
                      if(!bot.webhookId){
                        bot.webhookId = setInterval(bot.sendHooks, 1000)
                      }
                    }
                    bot.playerpets.set(p, t)
                    continue
                  }
                }else{
                  var lifespan = Math.random() * (14 - 10) + 10
                  t[pet].lifespan = lifespan
                }
                if(!t[pet].gender){
                  let rand = Math.random()
                  if(rand > 0.5){ 
                    gender = "male" 
                  }else{
                    gender = "female"
                  }
                  t[pet].gender = gender
                }
              }
              if(t[pet]){
                if(t[pet].pregnant){
                  if(!t[pet].pregtime >= 168){
                    t[pet].pregtime++
                  }else{
                    let namesarr = []
                    let posnames = ["Hank", "Pongo", "Hummer", "Artimus", "Igloo", "Sakura", "Spy", "Hope", "Toast", "Wonka", "Loki", "Arctic", "Timber", "Radial", "Tinkerbell", "Isabelle", "Dollar", "Anti", "Cody", "Twain", "Senior", "Ion", "Nero", "Cheech", "Brisk", "Nutmeg", "Vader", "Onyx", "Syrup", "Apache", "Sinbad", "Hudson", "Niko", "Satay", "Cleopatra", "Freckle", "Triton", "Miles", "Scamp", "Fozzy", "Dunkin", "Woody", "Hopper", "Aretha", "Crumb", "Natasha", "Vango", "Tabitha", "Arcane", "Lucky", "Clover", "Cyclone", "Lou", "Meeko", "Stinker", "Arista", "Cali", "Aurora", "Static", "Hex", "Ham", "Sherbert", "Thistle", "Scratch", "Tico", "Florence", "Chili", "Zeus", "Fuzzball", "Huck", "Trinity", "William", "Harvey", "Joey", "Hyper", "Ableton", "Nash", "Squirt", "Dasher", "Shooter", "Oasis", "Hemp", "Fiona", "Miller", "Aesop", "Chili", "Thermal", "Tickle", "Wonka", "Farley", "Portal", "Percy", "Cluster", "Albino", "Popcorn", "Wacky", "Marlin", "Sputnik", "Shakira", "Beau", "Pixel", "Hercules", "Croissant", "Silly", "Jetson", "Ruby", "Solar", "Spiral", "Brat", "Odd", "Diddy", "Fuzzbucket", "Bella", "Congo", "Fuzzy", "Bond", "Frank", "Fisk", "Webster", "Fraggle", "Onion", "Marcy", "Peachy", "Carlton", "Trek", "Treat", "Caper", "Mila", "Aura", "Cutlass", "Tilly", "Ember", "Ozzy", "Bulbasaur", "Pong", "Chubby", "Rasta", "Drift", "Nelly", "Bomber", "Splinter", "Hunter", "Hardy", "Glory", "Voodoo", "Wiggles", "Sweets", "Sigmund", "Flare", "Stitch", "Rockwell", "Dexter", "Daffy", "Irvin", "Plague", "Mystic", "Linux", "Salt", "Misty", "Orville", "Zim", "Mojo", "Typo", "Mulligan", "Doris", "Quasar", "Lurch", "Fabio", "Jumbo", "Oakley"]
                    for(let hkq = 0; hkq < t[pet].litter; hkq++){
                      let picked = false
                      while(!picked){
                        var name = posnames[~~(Math.random() * posnames.length)]
                        if(!t[name] && !namesarr.includes(name)) picked = true
                      }
                      namesarr.push(name)
                      name = name.toLowerCase()
                      var gender;
                      let rand = Math.random()
                      if(rand > 0.5){ 
                        gender = "male" 
                      }else{
                        gender = "female"
                      }
                      let lifespan = Math.random() * (14 - 10) + 10
                      t[name] = {
                        type: type,
                        gender: gender,
                        health: 100,
                        food: 100,
                        water: 100,
                        happiness: 100,
                        age: 0,
                        exercise: 100,
                        socialization: 100,
                        maxhp: 100,
                        sharedto: [],
                        healthproblems: {},
                        immunities: {},
                        lifespan: lifespan,
                        usedin: []
                      }
                    }
                    try{
                      var y = nodm
                      var x = p
                      if(!y.dontdm.includes(x)){
                        dmRequests.push({recipient:p,content:`Your pet ${type} named ${pet.charAt(0).toUpperCase() + pet.slice(1)} has given birth to ${t[pet].litter} ${type}${parseInt(t[pet].litter) > 1 ? "'s":""}. They are named ${namesarr.join(", ")} use the rename command to rename them (To stop receiving these messages, reply stop)`})
                        if(!dmId){
                          dmId = setInterval(sendDMs, 1000)
                        }
                      }else{
                        let prevname = t[pet].pregname
                        let plstr = bot.playerstorage.get(p)
                        if(!plstr) plstr = {balance:0}
                        try{
                          let channel = await bot.channels.get(plstr[prevname])
                          dmRequests.push({recipient:p,content:`${bot.users.get(p).toString()} your pet ${type} named ${pet.charAt(0).toUpperCase() + pet.slice(1)} has given birth to ${t[pet].litter} ${type}${parseInt(t[pet].litter) > 1 ? "'s":""}. They are named ${namesarr.join(", ")} use the rename command to rename them`})
                          if(!dmId){
                            dmId = setInterval(sendDMs, 1000)
                          }
                          if(!plstr.achievements){
                            plstr.achievements = {}
                            bot.playerstorage.set(p, plstr)
                          }
                          if(!plstr.achievements["A litter of 5!"]){
                            plstr.achievements["A litter of 5!"] = new Date()
                            bot.playerstorage.set(p, plstr)
                          }
                          if(Object.keys(bot.playerpets.get(p)).length >= 10){
                            if(!plstr.achievements["There's never too many."]){
                              plstr.achievements["There's never too many."] = new Date()
                              bot.playerstorage.set(p, plstr)
                            }
                          }
                        }catch(e){ 
                          let embed = new Discord.RichEmbed()
                          .setTitle("New Error")
                          .setColor("#ff0000")
                          .setDescription(`There was an error\`\`\`md\n${e.message}\`\`\``)
                          .setFooter(`Error on shard: ${bot.shard.id}`)
                          bot.webhookRequests.push(embed)
                          if(!bot.webhookId){
                            bot.webhookId = setInterval(bot.sendHooks, 1000)
                          }
                          console.error(e) 
                        }
                      }
                    }catch(err){
                      let embed = new Discord.RichEmbed()
                      .setTitle("New Error")
                      .setColor("#ff0000")
                      .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
                      .setFooter(`Error on shard: ${bot.shard.id}`)
                      bot.webhookRequests.push(embed)
                      if(!bot.webhookId){
                        bot.webhookId = setInterval(bot.sendHooks, 1000)
                      }
                    }
                    t[pet].pregnant = false;
                    bot.events.emit('birth', p, pet, t[pet], namesarr)
                    bot.playerstorage.delete(p, `${t[pet].pregname}`)
                  }
                }
              }else{
                // try{
                //   bot.playerpets.delete(p, pet)
                // }catch(e){}
              }
              bot.playerpets.set(p, t)
            }
          }
        }
      }
    }
    var ret = bot.retrieve.fetchEverything()
    let newid
    for(var id1 of ret){
      newid = id1[0]
      var pets = bot.retrieve.get(newid)
      for(var pet in pets){
        try{
          bot.retrieve.math(newid, "add", 0.01, `${pet}.age`)
        }catch(e){
          bot.retrieve.delete(newid, pet)
        }
        var t = pets[pet]
        if(!t.lifespan){
          t.lifespan = Math.random() * (14 - 10) + 10
        }else{
          if(Number(t.age.toFixed(2)) >= Number(t.lifespan.toFixed(2))){
            try{
              bot.retrieve.delete(newid, pet)
            }catch(e){}
            try{
              var y = nodm
              var x = newid
              if(!y.dontdm.includes(x)){
                dmRequests.push({recipient:newid,content:`Your pet ${t.type} named ${pet.charAt(0).toUpperCase() + pet.slice(1)} has died in the shelter! They died of old age, age: ${t.age.toFixed(2)}. (To stop receiving these messages, reply stop)`})
                if(!dmId){
                  dmId = setInterval(sendDMs, 1000)
                }
              }
            }catch(err){
              let embed = new Discord.RichEmbed()
              .setTitle("New Error")
              .setColor("#ff0000")
              .setDescription(`There was an error\`\`\`md\n${e.message}\`\`\``)
              .setFooter(`Error on shard: ${bot.shard.id}`)
              bot.webhookRequests.push(embed)
              if(!bot.webhookId){
                bot.webhookId = setInterval(bot.sendHooks, 1000)
              }
            }
          }
        }
        if(pet == "object Object"){
          bot.retrieve.delete(id, pet)
        }
      }
      if(isEmpty(pets)){
        bot.retrieve.delete(id)
        // return console.log("Returned early")
      }
    }
    // DYNAMIC MARKET STUFF
    let dynamic = bot.market.get("dynamic")
    for(let item in dynamic){
      let curitem = dynamic[item]
      let cur = curitem.cur
      if(cur > 10000) cur = 10000 // Stop them idiots
      if(curitem.bought >= curitem.prevbought){ // Increase
        let newcur = (cur + (curitem.bought/curitem.prevbought)/100) || cur
        if(newcur > cur + 0.1) newcur = cur + 0.1
        bot.market.set("dynamic", newcur, `${item}.cur`)
        bot.market.set("dynamic", curitem.bought, `${item}.prevbought`)
        bot.market.set("dynamic", 0, `${item}.bought`)
      }else if(curitem.bought < curitem.prevbought){ // Decrease
        let newcur = (cur - (curitem.prevbought/curitem.bought)/100) || cur
        if(curitem.bought == 0) newcur -= 0.05
        if(newcur > 0){
          if(newcur < cur - 0.1) newcur = cur - 0.1
          bot.market.set("dynamic", newcur, `${item}.cur`)
          bot.market.set("dynamic", curitem.bought, `${item}.prevbought`)
          bot.market.set("dynamic", 0, `${item}.bought`)
        }
      }
    }
  }else {
    return console.log(`Shard can't run`)
  }
};

function isEmpty(obj) {

  if (obj == null) return true;

  if (obj.length > 0)    return false;
  if (obj.length === 0)  return true;

  if (typeof obj !== "object") return true;

  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

async function sendDMs(){
  let cur = dmRequests[0]
  dmRequests.shift()
  try{
    await client.users.get(cur.recipient).send(cur.content)
  }catch(e){}
  clearInterval(dmId)
  if(dmRequests.length > 0){
    dmId = setInterval(sendDMs, 1000)
  }else{
    dmId = null
    try{ 
      clearInterval(dmId)
    }catch(e){}
  }
}