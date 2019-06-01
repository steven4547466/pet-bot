const general = ["water", "food"]
const health = ["heartworm prevention", "heartworm treatment", "lotion", "flea collar"]
const toys = ["bone", "ball", "yarn", "plush", "scratching post", "laser pointer"]
let users = []
module.exports.run = async(bot, message, prefix) =>{
  if(!users.includes(message.author.id)){
    await message.channel.send(`Remember to check out the user market! ${prefix}market`)
    users.push(message.author.id)
  }
  const Discord = require('discord.js');
  var msg = message.content.toLowerCase();
  const fs = require('fs')
  var buyables = {
    general: {
      name: "**General**",
      water: {
        name: "Water",
        cost: 10,
        description: "Use this to ensure your animals stay hydrated, replenishes 20 water"
      },
      food: {
        name: "Food",
        cost: 20,
        description: "Use this to ensure your animals stay fed, replenishes 20 hunger to any animal"
      }
    },
    medicine: {
      name: "**Health and Wellness**",
      "heartworm prevention": {
        name: "Heartworm Prevention",
        cost: 70,
        description: "Use this to make sure your pets dont get heartworm"
      },
      "heartworm treatment": {
        name: "Heartworm Treatment",
        cost: 1000,
        description: "Use this if one of your pets have heartworm"
      },
      lotion: {
        name: "Lotion",
        cost: 5,
        description: "Give this to your pet to treat skin problems"
      },
      "flea collar": {
        name: "Flea Collar",
        cost: 10,
        description: "Give this to your pet to prevent fleas"
      }
    },
    toys: {
      name: "**Toys**",
      "bone": {
        name: "Bone",
        cost: 10,
        description: "A bone"
      },
      "ball": {
        name: "Ball",
        cost: 10,
        description: "A ball"
      },
      "yarn": {
        name: "Yarn",
        cost: 5,
        description: "A ball of yarn"
      },
      "plush": {
        name: "Plush",
        cost: 20,
        description: "A plushie"
      },
      "scratching post": {
        name: "Scratching Post",
        cost: 25,
        description: "A scratching post"
      },
      "laser pointer": {
        name: "Laster pointer",
        cost: 5,
        description: "A laser pointer"
      },
      "stick": {
        name: "Stick",
        cost: 0.50,
        description: "A stick"
      }
    }
  };
  let args = msg.split(" ").slice(1);
  if(!args[0]){
    var options = {
      limit: 15*1000,
      min: 1,
      max: 3,
      page: 1
    }

    var general = []

    for(var name1 in buyables.general){
      if(name1 === "name"){

      }else{
        general.push(prefix + "buy " + name1)
      }
    }


    var meds = []

    for(var name1 in buyables.medicine){
      if(name1 === "name"){

      }else{
        meds.push(prefix + "buy " + name1)
      }
    }

    var toys = []

    for(var name1 in buyables.toys){
      if(name1 === "name"){

      }else{
        toys.push(prefix + "buy " + name1)
      }
    }

    var pages = {
      1: {
        title: "Page One",
        description: buyables.general.name,
        fields: [
          {name: "Foodstuffs:", value: `${general.map(name => name).join('\n')}`}  
        ]
      },
      2: {
        title: "Page Two",
        description: buyables.medicine.name,
        fields: [
          {name: "Medicines:", value: `${meds.map(name => name).join('\n')}`}  
        ]
      },
      3: {
        title: "Page Three",
        description: buyables.toys.name,
        fields: [
          {name: "Toys:", value: `${toys.map(name => name).join('\n')}`}  
        ]
      }
    }

    try {
      var m = await message.channel.send({
        embed: pages[options.page]
      });
      await m.react("⬅")
      await m.react("➡")
      await message.channel.send(`For info on a specific item do ${prefix}buy (item). To buy an item do ${prefix}buy (item) (quantity)`)
      const filter = (reaction, user) => {
        return ["⬅","➡"].includes(reaction.emoji.name) && user.id == message.author.id;
      };

      async function removeReaction(m, message, emoji){
        try {
          m.reactions.find(r => r.emoji.name == emoji).remove(message.author.id);
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
          }).catch((err) => {
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
  var item = []
  var quantity;
  var playerstorage = bot.playerstorage.get(message.author.id)
  if(args[0]){
    for(var i = 0; i < args.length; i++){
      if(Number.isInteger(parseInt(args[i]))){
        quantity = parseInt(args[i]) > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : parseInt(args[i])
      }else{
        item.push(args[i])
      }
    }
  }

  if(quantity){
    var t = playerstorage
    for(var name in buyables){
      for(var name1 in buyables[name]){
        if(name1 == item.join(" ")){
          let discountNum = quantity/10
          let discount = discountNum*0.03;
          if(discount > 0.2) discount = 0.2
          let dynamic = bot.market.get("dynamic")
          let dyitem = dynamic[name1]
          dyitem = dyitem || {bought:0, cur:1, prevbought:0}
          dyitem.bought += quantity
          dynamic[name1] = dyitem
          bot.market.set("dynamic", dynamic)
          dynamic = bot.market.get("dynamic")
          var bal = t.balance - ((buyables[name][name1].cost * quantity * (dynamic[name1].cur || 1)) * (1 - discount))
          if(bal < 0){
            return await message.channel.send(`You have insufficient funds to purchase this item`)
          }
          t.balance = bal
          if(!t.items) t.items = {}
          var cur = t.items[item.join(" ")] || 0
          cur = (cur + quantity) > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : cur + quantity
          t.items[item.join(" ")] = cur
          bot.playerstorage.set(message.author.id, t)
          return await message.channel.send(`You have successfully bought ${quantity} ${item.join(" ")}(s)`)
        }
      }
    }
    return await message.channel.send("Hm, check your spelling and try again")
  }
  let dynamicItems = bot.market.get("dynamic")
  for(var name in buyables){
    for(var name1 in buyables[name]){
      if(name1 == item.join(" ")){
        if(!dynamicItems[name1]) dynamicItems[name1] = {bought:0, cur:1, prevbought:0}
        var commandname = name1;
        let cost = Number((buyables[name][commandname].cost * (dynamicItems[name1].cur || 1)).toFixed(2))
        let embed = new Discord.RichEmbed()
        .setDescription(buyables[name][commandname].name)
        .setColor(0x00fff3)
        .addField("Cost:", cost)
        .addField("Description:", buyables[name][commandname].description)
        return await message.channel.send(embed)
      }
    }
  }
  if(args[0]) return message.channel.send("Hm, check your spelling and try again!");
};
