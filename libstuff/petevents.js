const EventEmitter = require('events');

module.exports.run = async (bot) => {
  class Events extends EventEmitter {}
  
  bot.events = new Events();
  
  bot.events.on('adopt', async (member, guild, name, pet) => {
    console.log(`${member.displayName} adopted a pet ${pet.type} named ${name} in guild ${guild.id}`)
  })
  
  bot.events.on('birth', async (id, name, pet, names) => {
    let user = bot.users.get(id)
    console.log(`${user.toString()}'s pet ${pet.type} named ${name} has given birth to ${pet.litter} ${pet.type}${parseInt(pet.litter) > 1 ? "'s":""}. They are named ${names.join(", ")}`)
  })
}