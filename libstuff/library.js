module.exports.run = async (bot) => {
  bot.findSharedPets = async (id) => {
    return new Promise(async (resolve, reject) => {
      let arr = []
      await bot.db.collection('pets').find({}).forEach(async thing => {
        let pets = await thing.storage
        for(let pet in pets){
          let cur = pets[pet]
          if(cur.sharedto.includes(id)){
            arr.push(pet)
          }
        }
      })
      return resolve(arr)
    })
  }
  
  bot.findSharedPet = async (id, name) => {
    return new Promise(async (resolve, reject) => {
      let done = false
      await bot.db.collection('pets').find({}).forEach(async thing => {
        if(!done){
          let pets = await thing.storage
          if(pets[name] && pets[name].sharedto.includes(id)){ 
            resolve(pets[name])
            done = true
          }
        }
      })
      if(!done){
        return reject("Pet not found")
      }
    })
  }
  
  bot.getUser = async (id) => {
    return new Promise(async (resolve, reject) => {
      let user = await bot.db.collection('users').findOne({id:id})
      if(user) return resolve(user)
      else return reject(0)
    })
  }
  
  bot.updateUser = async (id, doc) => {
    return new Promise(async (resolve, reject) => {
      try{
        await bot.db.collection('users').findOneAndUpdate({id:id}, {$set:doc}, {upsert:true})
        return resolve(1)
      }catch(e){
        return resolve(e)
      }
    })
  }
  
  bot.getPets = async (id) => {
    return new Promise(async (resolve, reject) => {
      let pets = await bot.db.collection('pets').findOne({id:id})
      if(pets) return resolve(pets)
      else return resolve(0)
    })
  }
  
  bot.updatePets = async (id, doc) => {
    return new Promise(async (resolve, reject) => {
      try{
        await bot.db.collection('pets').findOneAndUpdate({id:id}, {$set:doc}, {upsert:true})
        return resolve(1)
      }catch(e){
        return reject(e)
      }
    })
  }
}