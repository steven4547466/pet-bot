const Discord = require("discord.js")
let dmRequests = []
let dmId
let client
module.exports.run = async(bot, message, prefix) => {
  client = bot
  if(message.author.id != "353782817777385472") return
  for(let [key, val] of bot.playerpets){
    // if(key == "353782817777385472"){
      let pets = val
      for(let pet in pets){
        if(!pets[pet].usedin){
          pets[pet].usedin = []
        }
      }
      bot.playerpets.set(key, pets)
    // }
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