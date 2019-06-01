module.exports.run = async(bot, message, prefix) =>{
        const Discord = require('discord.js');
        let bicon = bot.user.displayAvatarURL
        let guildsNum = 0;
        let ready = bot.uptime
        let seconds = ~~(ready/1000)
        let minutes = ~~(ready/(1000 * 60))
        let hours = ~~(ready/(1000 * 60 * 60))
        let days = ~~(ready/(1000 * 60 * 60 * 24))
        if(days >= 1){
          hours %= 24
          while(hours % 24 >= 24){
            hours %= 24
          }
        }
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
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor(0x15f153)
        .setThumbnail(bicon)
        .setFooter(`Uptime: ${days} day(s), ${hours} hour(s), ${minutes} minute(s), ${seconds} second(s)`, message.author.displayAvatarURL)
        .addField("Bot Name", bot.user.username)
        .addField("Developer", "Steven4547466#1407")
        .addField("Description:", `${bot.user.username} is a bot coded in JavaScript using the discord.js library. We seek to let all discord users have a virtual pet. This bot is running across a total of ${bot.guilds.size} servers on your current shard. To invite this bot say ${prefix}invite.`)
        .addField("Bot ID", bot.user.id)
        .addField("Created On", bot.user.createdAt)

        return await message.channel.send(botembed)
};
