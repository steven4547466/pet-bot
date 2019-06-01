var bot;
var message;
const https = require("https")
const fs = require("fs")
const Discord = require('discord.js')
var privates = JSON.parse(fs.readFileSync("../private.json", "utf8"))
module.exports.run = async(bot1, message1, prefix) =>{
  let sender = message1.author
  bot = bot1;
  message = message1;
  if(sender.id !== "353782817777385472") return message.reply("This command is restricted to developers.");
  postStats();
};


async function postStats(){
	var tempcount;
  bot.shard.broadcastEval('this.guilds.size')
  	.then(results => {
	    results.reduce((prev, val) => prev + val, 0)
      tempcount = results;
  	})
  	let m = await message.channel.send("Working...")
	  setTimeout(function() {
		  var count = parseInt(tempcount)
	
			var postData = JSON.stringify({
				server_count: count
			});
			console.log(`Post data: ${postData}`)
			var options = {
				hostname: 'discordbots.org',
				port: 443,
				path: '/api/bots/529553417882959872/stats',
				method: 'POST',
				headers: {
					Authorization: privates.dblt,
					'Content-Type': 'application/json'
				}

			};
			var reqPost = https.request(options, (res) =>{
				console.log("statusCode: ", res.statusCode);
				res.on('data', function(d) {
					console.info('POST result:\n');
					process.stdout.write(d);
					console.info('\n\nPOST completed');
				});
			});
			reqPost.write(postData);
			reqPost.end();
			reqPost.on('error', (e) => {
				console.error(`Error: ${e.message}`);
			});
			m.edit(`I have posted the stat of ${count} servers to DBL`)
			console.log(count)
		}, 5000)

}