const Discord = require("discord.js")
let dmRequests = []
let dmId
let client
module.exports.run = async(bot, message, prefix) => {
  if(message.author.id != "353782817777385472") return
  await bot.db.collection('prefixes').deleteMany({})
  await bot.db.collection('users').deleteMany({})
  await bot.db.collection('pets').deleteMany({})
  await bot.db.collection('stats').deleteMany({})
  await bot.db.collection('market').deleteMany({})
  for(let [key, val] of bot.prefixes){
    await bot.db.collection('prefixes').insertOne({id:key, prefix:val})
  }
  for(let [key, val] of bot.playerstorage){
    if(key == message.author.id) console.log("attempting insert", val)
    await bot.db.collection('users').insertOne({id:key})
    if(val){
      await bot.db.collection('users').findOneAndUpdate({id:key}, {$set:{storage:val}}, {upsert:true})
    }
  }
  for(let [key, val] of bot.lottery){
    if(val){
      await bot.db.collection('users').findOneAndUpdate({id:key}, {$set:{lottery:val}}, {upsert:true})
    }
  }
  for(let [key, val] of bot.playerpets){
    await bot.db.collection('pets').insertOne({id:key})
    if(val){
      await bot.db.collection('pets').findOneAndUpdate({id:key}, {$set:{storage:val}}, {upsert:true})
    }
  }
  for(let [key, val] of bot.retrieve){
    if(val){
      await bot.db.collection('pets').findOneAndUpdate({id:key}, {$set:{retrieve:val}}, {upsert:true})
    }
  }
  for(let [key, val] of bot.stats){
    await bot.db.collection('stats').insertOne({stats:val})
  }
  for(let [key, val] of bot.market){
    await bot.db.collection('market').insertOne({id:key})
    if(val){
      await bot.db.collection('market').findOneAndUpdate({id:key}, {$set:{storage:val}}, {upsert:true})
    }
  }
};


async function sendDMs(){
  let cur = dmRequests[0]
  console.log(cur)
  dmRequests.shift()
  try{
    await client.users.get(cur.recipient).send(cur.content)
  }catch(e){
    console.error(e)
  }
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