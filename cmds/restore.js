const Discord = require('discord.js')
module.exports.run = async(bot, message, prefix) =>{
        if(message.author.id != '353782817777385472') return await message.channel.send("This command is restricted to developers")
        var args = message.content.split(" ").slice(1)
        var t = bot.playerpets.get(args[0])
        var name = args[1].toLowerCase()
        var age = Number(args[2])
        console.log(age)
        var type = args[3]
        t = t || {}
        console.log(t)
        var lifespan = Math.random() * (14 - 10) + 10
        t[name] = {
            type: type,
            gender: "male",
            health: 100,
            food: 100,
            water: 100,
            happiness: 100,
            age: age,
            exercise: 100,
            socialization: 100,
            maxhp: 100,
            sharedto: [],
            healthproblems: {},
            immunities: {},
            lifespan: lifespan,
            usedin: [message.guild.id]
          }
      	        console.log(t)
      	        bot.playerpets.set(args[0], t)
      	        return await message.channel.send(`Restored ${bot.users.get(args[0]).username}'s ${type} named ${name} with age ${age}`)
};
