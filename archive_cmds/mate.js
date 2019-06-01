module.exports.run = async(bot, message, prefix) =>{
  let t = bot.playerpets.get(message.author.id)
  var args = message.content.split(" ").slice(1)
  if(!args[1]){
    return await message.channel.send("Please specify two of your pets")
  }
  var str = args.join(" ").toLowerCase()
  var pet1 = str.split("|").shift().slice(0, -1);
  var pet2 = str.split("|").pop().slice(1);
  if(!t) return await message.channel.send("You have no pets")
  if(!t[pet1]) return await message.channel.send(`Pet ${pet1.charAt(0).toUpperCase() + pet1.slice(1)} doesn't exist.`)
  if(!t[pet2]) return await message.channel.send(`Pet ${pet2.charAt(0).toUpperCase() + pet2.slice(1)} doesn't exist.`)
  let type = t[pet1].type
  if(t[pet2].type != type) return await message.channel.send("Pets need to be of the same type to mate")
  if(t[pet1].pregnant || t[pet2].pregnant) return await message.channel.send("One of these pets is already pregnant")
  let male = false
  let female = false
  if(t[pet1].gender == "female"){
    female = true
  }else{
    male = true
  }
  if(t[pet2].gender == "female"){
    female = true
  }else{
    male = true
  }
  if(!female || !male) return await message.channel.send("You need 1 male pet and 1 female pet of the same type")
  if(t[pet1].age < 5) return await message.channel.send(`${pet1.charAt(0).toUpperCase() + pet1.slice(1)} is not old enough to mate.`)
  if(t[pet2].age < 5) return await message.channel.send(`${pet2.charAt(0).toUpperCase() + pet2.slice(1)} is not old enough to mate.`)
  let rand = ~~(Math.random() * ((10-1)+1))+1
  let pregnant
  if(t[pet1].gender == "female"){
    pregnant = pet1
    t[pet1].pregnant = true
    t[pet1].litter = rand
    t[pet1].pregname = pet1
    t[pet1].pregtime = 0
  }else if(t[pet2].gender == "female"){
    pregnant = pet2
    t[pet2].pregnant = true
    t[pet2].litter = rand
    t[pet2].pregname = pet2
    t[pet2].pregtime = 0
  }
  if(!t[pet1].usedin.includes(message.guild.id)) t[pet1].usedin.push(message.guild.id)
  if(!t[pet2].usedin.includes(message.guild.id)) t[pet2].usedin.push(message.guild.id)
  bot.playerpets.set(message.author.id, t)
  let o = bot.playerstorage.get(message.author.id)
  o[pregnant] = message.channel.id
  bot.playerstorage.set(message.author.id, o)
  return await message.channel.send(`${pet1.charAt(0).toUpperCase() + pet1.slice(1)} has mated with ${pet2.charAt(0).toUpperCase() + pet2.slice(1)}, I will DM you or, as a last resort, @mention you in this channel.`)
};
