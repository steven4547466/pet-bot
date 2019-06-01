module.exports.run = async(bot, message, prefix) =>{
  if(message.author.id !== "353782817777385472") return message.reply("This command is restricted to developers.");
  const { exec } = require('child_process');
  var args = message.content.split(" ").slice(1)
  var code = args.join(" ")
  exec(`${code}`, async (error, stdout, stderr) => {
    if (error) {
      await message.channel.send(`exec error: \`\`\`xl\n${clean(error)}\`\`\``, {split: true});
      return;
    }
    await message.channel.send(`stdout: \`\`\`xl\n${clean(stdout)}\`\`\``, {split: true});
    await message.channel.send(`stderr: \`\`\`xl\n${clean(stderr) || "N/A"}\`\`\``, {split: true});
  });
};

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
