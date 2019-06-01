module.exports.run = async(bot, message, prefix) =>{
  const Discord = require('discord.js');
  var msg = message.content.toLowerCase();
  var args = msg.split(" ").slice(1)
  const enmap = require('enmap')
  setTimeout(async function(){
    var lottery = bot.lottery.get(message.author.id)
    if(!lottery){
      bot.lottery.set(message.author.id, {
        numbers: [],
        wins: 0
      })
      lottery = bot.lottery.get(message.author.id)
    }
    if(!args[0]){
      let embed = new Discord.RichEmbed()
      .setDescription("Lottery")
      .setColor("#00fff3")
      .addField("How to play", `To enter, do ${prefix}lottery buy (number, optional), you can have as many entrys as you want, but they cost $300 each. The jackpot can be checked with ${prefix}lottery jackpot`)
      .addField("Winners", `Winners get an amount of money equal to the total cost of all tickets purchased * 4. There is only 1 winner.`)
      return message.channel.send(embed)
    }
    if(args[0] == "buy"){
      var playerstorage = bot.playerstorage.get(message.author.id)
      var t = playerstorage
      var tempb = t.balance - 300
      if(tempb < 0){
        return await message.channel.send(`You haven't enough funds to buy a ticket!`)
      }else{
        if(args[1]){
          var buya = parseInt(args[1]) || 1
          t.balance -= 300 * buya
          if(t.balance < 0) return await message.channel.send("You don't have enough funds to buy this many tickets")
          bot.playerstorage.set(message.author.id, t)
          var numbersarr = []
          for(var ip = 0; ip < buya; ip++){
            var newnum = getRandom(bot);
            var g = lottery
            g.numbers.push(newnum)
            numbersarr.push(newnum)
          }
          bot.lottery.set(message.author.id, g)
          return await message.channel.send(`You have bought ${buya} tickets with the numbers ${numbersarr.join(", ").slice(0, -1)} check #announcements in the support discord on Sunday to see if you were drawn!`)
        }else{
          t.balance -= 300
          bot.playerstorage.set(message.author.id, t)
          var newnum = getRandom(bot);
          var g = lottery
          g.numbers.push(newnum)
          bot.lottery.set(message.author.id, g)
          return await message.channel.send(`You have bought a ticket with the number ${newnum} check #announcements in the support discord on Sunday to see if you were drawn!`)
        }
      }
    }
    
    if(args[0] == "numbers"){
      if(bot.lottery.get(message.author.id, "numbers").length === 0) return message.channel.send("You haven't any numbers!")
      return await message.channel.send(`You have the numbers: ${bot.lottery.get(message.author.id, "numbers").join(", ").slice(0, -1)}`)
    }
    
    if(args[0] == "jackpot"){
      var numbersarr = []
      for(var i1 of bot.lottery.fetchEverything()){
        var i = i1[0]
        var arr = bot.lottery.get(i, `numbers`)
        for(var j = 0; j < arr.length; j++){
          numbersarr.push(arr[j])
        }
      }
      var amount = numbersarr.length * 300 * 4
      return await message.channel.send(`The current jackpot is $${amount}`)
    }
    
  }, 2000)
};

function getRandom(bot){
  var numbersarr = []
  for(var i1 of bot.lottery.fetchEverything()){
    var i = i1[0]
    var arr = bot.lottery.get(i, `numbers`)
    for(var j = 0; j < arr.length; j++){
      numbersarr.push(arr[j])
    }
  }
  var rand = ~~(Math.random() * ((999999-1)+1))+1
  if(numbersarr.includes(rand)){
    getRandom()
  }
  return rand;
}
