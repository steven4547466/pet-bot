module.exports.run = async(bot, message, prefix) =>{
  const fs = require('fs');
  const Discord = require("discord.js")
  try{
    var playerpets = bot.playerpets.get(message.author.id)
    setTimeout(async function(){
      var args = message.content.split(" ").slice(1)
      if(!args[0]) return await message.channel.send("Please specify one of your pets")
      var name = args.join(" ").toLowerCase()
      for(var p in playerpets){
        if(p == name){
          let pet = playerpets[p]
          let num = parseInt(pet.happiness) + parseInt(pet.water) + parseInt(pet.food) + parseInt(pet.exercise) + parseInt(pet.socialization) + parseInt(pet.health)
          var color;
          var t = playerpets
          if(num >= 500 + t[name].maxhp){
            color = "#00ff00"
          }else if(num > 400 + t[name].maxhp){
            color = "#24c600"
          }else if(num > 300 + t[name].maxhp){
            color = "#ffff00"
          }else if(num > 200 + t[name].maxhp){
            color = "fcac00"
          }else{
            color = "#ff0000"
          }
          
          let agetype = "";
          if(pet.type == "dog" || pet.type == "wolf"){
            if(pet.age <= 3){
              agetype = "Puppy"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "cat"){
            if(pet.age <= 3){
              agetype = "Kitten"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "snake"){
            if(pet.age <= 0.2){
              agetype = "Hatchling"
            }else if(pet.age >= 0.21 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "ferret"){
            if(pet.age <= 3){
              agetype = "Kit"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "panda"){
            if(pet.age <= 3){
              agetype = "Cub"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "duck"){
            if(pet.age <= 3){
              agetype = "Duckling"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "hamster"){
            if(pet.age <= 3){
              agetype = "Pup"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "lizard"){
            if(pet.age <= 0.5){
              agetype = "Hatchling"
            }else if(pet.age >= 0.6 && pet.age <= 3){
              agetype = "Youngling"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "bunny"){
            if(pet.age <= 0.5){
              agetype = "Kit"
            }else if(pet.age >= 0.6 && pet.age <= 3){
              agetype = "Youngling"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "horse"){
            if(pet.age <= 0.5){
              agetype = "Foal"
            }else if(pet.age >= 0.6 && pet.age <= 3){
              agetype = "Youngling"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "fox"){
            if(pet.age <= 0.5){
              agetype = "Cub"
            }else if(pet.age >= 0.51 && pet.age <= 3){
              agetype = "Youngling"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "parrot"){
            if(pet.age <= 0.5){
              agetype = "Chick"
            }else if(pet.age >= 0.6 && pet.age <= 3){
              agetype = "Youngling"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "chicken"){
            if(pet.age <= 0.5){
              agetype = "Chick"
            }else if(pet.age >= 0.6 && pet.age <= 3){
              agetype = "Youngling"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "kangaroo"){
            if(pet.age <= 0.5){
              agetype = "Joey"
            }else if(pet.age >= 0.6 && pet.age <= 3){
              agetype = "Youngling"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }
          
          let healthissues = []
          let immune = []
          for(sick in t[name].healthproblems){
            if(t[name].healthproblems[sick] == true){
              healthissues.push(sick.charAt(0).toUpperCase() + sick.slice(1))
            }
          }
          if(t[name].immunities){
            for(immunities in t[name].immunities){
              if(t[name].immunities[immunities] == true){
                immune.push(immunities.charAt(0).toUpperCase() + immunities.slice(1))
              }
            }
          }
          
          var tricks = []
          if(t[name].tricks){
            for(trick1 in t[name].tricks){
              if(t[name].tricks[trick1] == 100){
                tricks.push(trick1.charAt(0).toUpperCase() + trick1.slice(1))
              }
            }
          }
          
          let petembed = new Discord.MessageEmbed()
          petembed.setDescription(`**${name.charAt(0).toUpperCase() + name.slice(1)}'s Stats**`)
          petembed.setColor(color)
          if(pet.gender){
            petembed.addField("Gender", `${pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}`, true)
          }
          petembed.addField("Age", `${agetype != "" ? `${agetype}, `:""}${pet.age.toFixed(2)}`, true)
          petembed.addField("Type", pet.type.charAt(0).toUpperCase() + pet.type.slice(1), true)
          petembed.addField("Health", `${pet.health.toFixed()}/${t[name].maxhp.toFixed()}`, true)
          petembed.addField("Happiness", pet.happiness, true)
          petembed.addField("Thirst", pet.water, true)
          petembed.addField("Hunger", pet.food, true)
          petembed.addField("Exercise", pet.exercise, true)
          petembed.addField("Socialization", pet.socialization, true)
          petembed.addField("Tricks Known", tricks.join("\n") || "None", true)
          petembed.addField("Health Issues", healthissues.join("\n") || "None", true)
          petembed.addField("Immunities", immune.join("\n") || "None", true)
	        return await message.channel.send(petembed)
        }
      }
      for(var id1 of bot.playerpets.fetchEverything()){
        try{
          var id = id1[0]
          try{
            var arr = bot.playerpets.get(id, `${name}.sharedto`) || []
          }catch(err){
            let embed = new Discord.MessageEmbed()
            .setTitle("New Error")
            .setColor("#ff0000")
            .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
            
            // bot.webhookRequests.push(embed)
            if(!bot.webhookId){
              // bot.webhookId = setInterval(bot.sendHooks, 1000)
            }
          }
          if(arr.includes(message.author.id)){
            var q = bot.playerpets.get(id)
            var e = name
            for(var p in q){
              if(p == name){
                let pet = q[p]
                let num = parseInt(pet.happiness) + parseInt(pet.water) + parseInt(pet.food) + parseInt(pet.exercise) + parseInt(pet.socialization) + parseInt(pet.health)
                var color;
                var t = q
                if(num >= 500 + t[name].maxhp){
                  color = "#00ff00"
                }else if(num > 400 + t[name].maxhp){
                  color = "#24c600"
                }else if(num > 300 + t[name].maxhp){
                  color = "#ffff00"
                }else if(num > 200 + t[name].maxhp){
                  color = "fcac00"
                }else{
                  color = "#ff0000"
                }
                
                let agetype = "";
                if(pet.type == "dog" || pet.type == "wolf"){
                  if(pet.age <= 3){
                    agetype = "Puppy"
                  }else if(pet.age >= 3.1 && pet.age <= 5){
                    agetype = "Adolescent"
                  }else if(pet.age >= 5.1 && pet.age <= 7){
                    agetype = "Adult"
                  }else{
                    agetype = "Senior"
                  }
                }else if(pet.type == "cat"){
                  if(pet.age <= 3){
                    agetype = "Kitten"
                  }else if(pet.age >= 3.1 && pet.age <= 5){
                    agetype = "Adolescent"
                  }else if(pet.age >= 5.1 && pet.age <= 7){
                    agetype = "Adult"
                  }else{
                    agetype = "Senior"
                  }
                }else if(pet.type == "snake"){
                  if(pet.age <= 0.2){
                    agetype = "Hatchling"
                  }else if(pet.age >= 0.21 && pet.age <= 5){
                    agetype = "Adolescent"
                  }else if(pet.age >= 5.1 && pet.age <= 7){
                    agetype = "Adult"
                  }else{
                    agetype = "Senior"
                  }
                }else if(pet.type == "ferret"){
                  if(pet.age <= 3){
                    agetype = "Kit"
                  }else if(pet.age >= 3.1 && pet.age <= 5){
                    agetype = "Adolescent"
                  }else if(pet.age >= 5.1 && pet.age <= 7){
                    agetype = "Adult"
                  }else{
                    agetype = "Senior"
                  }
                }else if(pet.type == "panda"){
                  if(pet.age <= 3){
                    agetype = "Cub"
                  }else if(pet.age >= 3.1 && pet.age <= 5){
                    agetype = "Adolescent"
                  }else if(pet.age >= 5.1 && pet.age <= 7){
                    agetype = "Adult"
                  }else{
                    agetype = "Senior"
                  }
                }else if(pet.type == "duck"){
                  if(pet.age <= 3){
                    agetype = "Duckling"
                  }else if(pet.age >= 3.1 && pet.age <= 5){
                    agetype = "Adolescent"
                  }else if(pet.age >= 5.1 && pet.age <= 7){
                    agetype = "Adult"
                  }else{
                    agetype = "Senior"
                  }
                }else if(pet.type == "hamster"){
                  if(pet.age <= 3){
                    agetype = "Pup"
                  }else if(pet.age >= 3.1 && pet.age <= 5){
                    agetype = "Adolescent"
                  }else if(pet.age >= 5.1 && pet.age <= 7){
                    agetype = "Adult"
                  }else{
                    agetype = "Senior"
                  }
                }else if(pet.type == "lizard"){
                  if(pet.age <= 0.5){
                    agetype = "Hatchling"
                  }else if(pet.age >= 0.6 && pet.age <= 3){
                    agetype = "Youngling"
                  }else if(pet.age >= 3.1 && pet.age <= 5){
                    agetype = "Adolescent"
                  }else if(pet.age >= 5.1 && pet.age <= 7){
                    agetype = "Adult"
                  }else{
                    agetype = "Senior"
                  }
                }else if(pet.type == "bunny"){
            if(pet.age <= 0.5){
              agetype = "Kit"
            }else if(pet.age >= 0.6 && pet.age <= 3){
              agetype = "Youngling"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "horse"){
            if(pet.age <= 0.5){
              agetype = "Foal"
            }else if(pet.age >= 0.6 && pet.age <= 3){
              agetype = "Youngling"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "fox"){
            if(pet.age <= 0.5){
              agetype = "Cub"
            }else if(pet.age >= 0.51 && pet.age <= 3){
              agetype = "Youngling"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "parrot"){
            if(pet.age <= 0.5){
              agetype = "Chick"
            }else if(pet.age >= 0.6 && pet.age <= 3){
              agetype = "Youngling"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "chicken"){
            if(pet.age <= 0.5){
              agetype = "Chick"
            }else if(pet.age >= 0.6 && pet.age <= 3){
              agetype = "Youngling"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }else if(pet.type == "kangaroo"){
            if(pet.age <= 0.5){
              agetype = "Joey"
            }else if(pet.age >= 0.6 && pet.age <= 3){
              agetype = "Youngling"
            }else if(pet.age >= 3.1 && pet.age <= 5){
              agetype = "Adolescent"
            }else if(pet.age >= 5.1 && pet.age <= 7){
              agetype = "Adult"
            }else{
              agetype = "Senior"
            }
          }
          
                let healthissues = []
                let immune = []
                for(sick in t[name].healthproblems){
                  if(t[name].healthproblems[sick] == true){
                    healthissues.push(sick.charAt(0).toUpperCase() + sick.slice(1))
                  }
                }
                if(t[name].immunities){
                  for(immunities in t[name].immunities){
                    if(t[name].immunities[immunities] == true){
                      immune.push(immunities.charAt(0).toUpperCase() + immunities.slice(1))
                    }
                  }
                }
                
                var tricks = []
                if(t[name].tricks){
                  for(trick1 in t[name].tricks){
                    if(t[name].tricks[trick1] == 100){
                      tricks.push(trick1.charAt(0).toUpperCase() + trick1.slice(1))
                    }
                  }
                }
                
                let petembed = new Discord.MessageEmbed()
                petembed.setDescription(`**${name.charAt(0).toUpperCase() + name.slice(1)}'s Stats**`)
                petembed.setColor(color)
                if(pet.gender){
                  petembed.addField("Gender", `${pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}`, true)
                }
                petembed.addField("Age", `${agetype != "" ? `${agetype}, `:""}${pet.age.toFixed(2)}`, true)
                petembed.addField("Type", pet.type.charAt(0).toUpperCase() + pet.type.slice(1), true)
                petembed.addField("Health", `${pet.health.toFixed()}/${t[name].maxhp.toFixed()}`, true)
                petembed.addField("Happiness", pet.happiness, true)
                petembed.addField("Thirst", pet.water, true)
                petembed.addField("Hunger", pet.food, true)
                petembed.addField("Exercise", pet.exercise, true)
                petembed.addField("Socialization", pet.socialization, true)
                petembed.addField("Tricks Known", tricks.join("\n") || "None", true)
                petembed.addField("Health Issues", healthissues.join("\n") || "None", true)
                petembed.addField("Immunities", immune.join("\n") || "None", true)
      	        return await message.channel.send(petembed)
              }
            }
            
          }
        }catch(err){
          let embed = new Discord.MessageEmbed()
          .setTitle("New Error")
          .setColor("#ff0000")
          .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
          
          // bot.webhookRequests.push(embed)
          if(!bot.webhookId){
            // bot.webhookId = setInterval(bot.sendHooks, 1000)
          }
        }
      }
      return await message.channel.send(`Pet with name: ${name.charAt(0).toUpperCase() + name.slice(1)} non-existent or you have no access`)
    }, 150)
  }catch(err){
    let embed = new Discord.MessageEmbed()
    .setTitle("New Error")
    .setColor("#ff0000")
    .setDescription(`There was an error\`\`\`md\n${err.message}\`\`\``)
    
    // bot.webhookRequests.push(embed)
    if(!bot.webhookId){
      // bot.webhookId = setInterval(bot.sendHooks, 1000)
    }
    console.log(err)
  }
};

module.exports.aliases = {
  aliases: ["check", "ck"],
  command: "checkon"
}
