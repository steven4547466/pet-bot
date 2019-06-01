const Discord = require("discord.js")
const flags = ["view", "list", "retrieve", "buy"]
const general = ["water", "food"]
const health = ["heartworm prevention", "heartworm treatment", "lotion", "flea collar"]
const toys = ["bone", "ball", "yarn", "plush", "scratching post", "laser pointer", "stick"]
const types = ["general", "health", "toys"]
var cooldowns = {}
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
  let args = message.content.split(" ").slice(1)
  try{
    var flag = args[0].toLowerCase()
    }catch(e){
      return await message.channel.send(`No flag provided. Acceptable flags: ${flags.join(", ")}`)
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
        return await message.channel.send(`Sorry ${message.guild.members.get(message.author.id).nickname || message.author.username}, that command is on cooldown for another ${hours} hour(s), ${minutes} minute(s) and ${seconds} second(s)`)
      }
    }
  }
  let cooldown = message.createdTimestamp + (1000 * 60 * 1)
  cooldowns[message.author.id] = {time: cooldown, day: new Date().getDay()}
  args.shift()
  if(flag == "view"){
    delete cooldowns[message.author.id]
    viewMarket(bot, message, prefix)
    return console.log("View");
  }else if(flag == "list"){
    listItem(bot, message, prefix)
    return console.log("list")
  }else if(flag == "retrieve"){
    delete cooldowns[message.author.id]
    retrieveItem(bot, message, prefix)
    return console.log("retrieve")
  }else if(flag == "buy"){
    buyItem(bot, message, prefix)
    return console.log("buy")
  }
  delete cooldowns[message.author.id]
  return await message.channel.send(`Invalid flag. Acceptable flags: ${flags.join(", ")}`)
};

async function viewMarket(bot, message, prefix){
  await message.channel.send(`What market would you like to view? Acceptable types: ${types.join(", ")}`)
  try{
    var response = await message.channel.awaitMessages(message2 => message2.author.id === message.author.id && types.includes(message2.content.toLowerCase()), {
      max: 1,
      time: 300000,
      errors: ['time']
    });
  }catch(err){
    return message.channel.send("5 minute timeout exceeded. Viewing cancelled.")
  }
  let type = response.first().content.toLowerCase()
  try{
    console.log(type)
    var listings = bot.market.get("market", `${type}`) || {}
    }catch(e){
      console.error(e)
      return await message.channel.send("There was an error, please report to the support server.")
    }
    if(!listings || Object.keys(listings).length < 1) return await message.channel.send("There is nothing in that market")
  var fields = [

  ]
  for(var id in listings){
    fields.push(`${id}: ${listings[id].item.charAt(0).toUpperCase() + listings[id].item.slice(1)} | ${listings[id].price}, x${listings[id].quantity}`)
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
        value: `$${value}`
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
      return await message.channel.send("There is nothing in that market (or there was an error)")
    }
    await m.react("⬅")
    await m.react("➡")
    await message.channel.send(`Buy an item with ${prefix}market buy`)
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
}

async function listItem(bot, message, prefix){
  await message.channel.send("What item would you like to list?")
  try{
    var response = await message.channel.awaitMessages(message2 => message2.author.id === message.author.id, {
      max: 1,
      time: 100000,
      errors: ['time']
    });
  }catch(err){
    return message.channel.send("1 minute timeout exceeded. Listing cancelled.")
  }
  let item = response.first().content.toLowerCase()
  let storage = bot.playerstorage.get(message.author.id).items || {}
  if(!storage[item] || storage[item] <= 0){ 
    delete cooldowns[message.author.id]
    return await message.channel.send(`You don't have any ${item}`)
  }
  await message.channel.send("How many items would you like to list?")
  try{
    var response = await message.channel.awaitMessages(message2 => message2.author.id === message.author.id && parseInt(message2.content) >= 1, {
      max: 1,
      time: 100000,
      errors: ['time']
    });
  }catch(err){
    return message.channel.send("1 minute timeout exceeded. Listing cancelled.")
  }
  let num = parseInt(response.first().content)
  if(storage[item] < num){ 
    delete cooldowns[message.author.id]
    return await message.channel.send(`Sorry, you only have ${storage[item]} ${storage[item] > 1 ? `${item}s`:`${item}`}`)
  }
  await message.channel.send("How much would you like 1 item to cost?")
  try{
    var response = await message.channel.awaitMessages(message2 => message2.author.id === message.author.id && parseInt(message2.content) > 0, {
      max: 1,
      time: 100000,
      errors: ['time']
    });
  }catch(err){
    return message.channel.send("1 minute timeout exceeded. Listing cancelled.")
  }
  let price = parseInt(response.first().content)
  let marketType;
  if(general.includes(item)) marketType = "general"
  if(health.includes(item)) marketType = "health"
  if(toys.includes(item)) marketType = "toys"
  if(!marketType) return await message.channel.send("There was an error, please report this to the support server")
  let plistings = bot.playerstorage.get(message.author.id, "listings")
  plistings = plistings || {}
  let randPicked = false
  for(let i in plistings){
    if(plistings[i].item == item){
      randPicked = true
      var rand = i
      var obj = plistings[i]
      obj.quantity += num
      obj.price = price
    }
  }
  if(!randPicked){
    var obj = {
      item:item,
      price:price,
      quantity:num,
      author: message.author.id
    }
  }else{
    await message.channel.send("You already listed some of this item, this and your previous listing will be combined.")
  }
  let thisMarket = bot.market.get("market", marketType)
  while(!randPicked){
    var rand = ~~(Math.random() * ((10000-1)+1))+1
    if(!thisMarket[rand]){
      randPicked = true
    }
  }
  thisMarket = thisMarket || {}
  thisMarket[rand] = obj
  bot.market.set("market", thisMarket, marketType)
  storage[item] -= num
  if(storage[item] <= 0){
    delete storage[item]
  }
  plistings[rand] = obj
  bot.playerstorage.set(message.author.id, storage, "items")
  bot.playerstorage.set(message.author.id, plistings, "listings")
  delete cooldowns[message.author.id]
  return await message.channel.send(`You listed ${obj.quantity} ${obj.num > 1 ? `${item}(s)`:`${item}`}. At $${obj.price} per item.`)
}

async function retrieveItem(bot, message, prefix){
  let storage = bot.playerstorage.get(message.author.id)
  await message.channel.send("What item would you like to retrieve?")
  try{
    var response = await message.channel.awaitMessages(message2 => message2.author.id === message.author.id, {
      max: 1,
      time: 100000,
      errors: ['time']
    });
  }catch(err){
    return message.channel.send("1 minute timeout exceeded. Retrieval cancelled.")
  }
  let item = response.first().content.toLowerCase()
  let listed = false
  let fullItem
  for(var i in storage.listings){
    if(storage.listings[i].item == item){
      listed = true;
      fullItem = storage.listings[i]
      break;
    }
  }
  if(!listed) return await message.channel.send("You haven't listed any of this item")
  let listednum = fullItem.quantity
  await message.channel.send(`How many would you like to retrieve? (1-${listednum})`)
  try{
    var response = await message.channel.awaitMessages(message2 => message2.author.id === message.author.id && parseInt(message2.content) >= 1 && parseInt(message2.content) <= parseInt(listednum), {
      max: 1,
      time: 100000,
      errors: ['time']
    });
  }catch(err){
    return message.channel.send("1 minute timeout exceeded. Retrieval cancelled.")
  }
  let num = parseInt(response.first().content.toLowerCase())
  var t = storage
  let marketType;
  if(general.includes(item)) marketType = "general"
  if(health.includes(item)) marketType = "health"
  if(toys.includes(item)) marketType = "toys"
  if(!marketType) return await message.channel.send("There was an error, please report this to the support server")
  t.listings[i].quantity -= num
  if(t.listings[i].quantity < 1){
    delete t.listings[i]
    bot.market.delete("market", `${marketType}[${i}]`)
  }else{
    bot.market.set("market", t.listings[i], `${marketType}[${i}]`)
  }
  if(!t.items) t.items = {}
  if(!t.items[fullItem.item]){
    t.items[fullItem.item] = 0
    bot.playerstorage.set(message.author.id, t)
  }
  t.items[item] += num
  bot.playerstorage.set(message.author.id, t)
  return await message.channel.send(`You have retrieved ${num} ${num > 1 ? `${item}(s)`:`${item}`}.`)
}

async function buyItem(bot, message, prefix){
  let storage = bot.playerstorage.get(message.author.id)
  await message.channel.send(`What is the market type of the item you would like to buy? Acceptable types: ${types.join(", ")}`)
  try{
    var response = await message.channel.awaitMessages(message2 => message2.author.id === message.author.id && types.includes(message2.content.toLowerCase()), {
      max: 1,
      time: 100000,
      errors: ['time']
    });
  }catch(err){
    return message.channel.send("1 minute timeout exceeded. Buying cancelled.")
  }
  let marketType = response.first().content.toLowerCase()
  let market = bot.market.get("market", `${marketType}`)
  await message.channel.send("What is the ID of the item you would like to buy?")
  try{
    var response = await message.channel.awaitMessages(message2 => message2.author.id === message.author.id, {
      max: 1,
      time: 100000,
      errors: ['time']
    });
  }catch(err){
    return message.channel.send("1 minute timeout exceeded. Buying cancelled.")
  }
  let id = response.first().content.toLowerCase()
  if(!Object.keys(market).includes(id)){ 
    delete cooldowns[message.author.id]
    return await message.channel.send(`The id ${id} was not found in the ${marketType} market, please try again`)
  }
  let listedItem = market[id]
  if(!listedItem){ 
    delete cooldowns[message.author.id]
    return await message.channel.send(`The id ${id} was not found in the ${marketType} market, please try again`)
  }
  if(listedItem.author == message.author.id){ 
    delete cooldowns[message.author.id]
    return await message.channel.send("You can't buy your own listing.")
  }
  await message.channel.send(`How much would you like to buy? $${parseInt(listedItem.price)} per 1, 1-${listedItem.quantity}`)
  try{
    var response = await message.channel.awaitMessages(message2 => message2.author.id === message.author.id && parseInt(message2.content) >= 1 && parseInt(message2.content) <= parseInt(listedItem.quantity) , {
      max: 1,
      time: 100000,
      errors: ['time']
    });
  }catch(err){
    return message.channel.send("1 minute timeout exceeded. Buying cancelled.")
  }
  let num = parseInt(response.first().content)
  listedItem.quantity -= num
  let price = num * parseInt(listedItem.price)
  if(price > storage.balance) return await message.channel.send("You don't have enough money to do this.")
  if(num >= parseInt(listedItem.quantity)){
    bot.market.delete("market", `${marketType}[${id}]`)
    bot.playerstorage.delete(listedItem.author, `listings[${id}]`)
  }else{
    bot.market.set("market", listedItem, `${marketType}[${id}]`)
    bot.playerstorage.set(listedItem.author, listedItem, `listings[${id}]`)
  }
  let playersStorage = bot.playerstorage.get(message.author.id)
  if(!playersStorage.items) playersStorage.items = {}
  if(!playersStorage.items[listedItem.item]){
    playersStorage.items[listedItem.item] = 0
    bot.playerstorage.set(message.author.id, playersStorage)
  }
  bot.playerstorage.math(message.author.id, "+", num, `items[${listedItem.item}]`)
  bot.playerstorage.math(message.author.id, "-", price, "balance")
  bot.playerstorage.math(listedItem.author, "+", price, "balance")
  return await message.channel.send(`You bought ${num} ${num > 1 ? `${listedItem.item}(s)`:`${listedItem.item}`}.`)
}