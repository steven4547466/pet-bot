module.exports.run = async(bot, message, prefix) => {
	    	if(message.author.id !== "353782817777385472") return message.reply("This command is restricted to developers.");
        	process.exit(1)
}
