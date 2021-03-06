const Discord = require("discord.js");
const fs = require('fs');

exports.run = (client, message, args) => {
  var commandlist = "\n";
  var fileNames = fs.readdirSync("./commands/owner");
  const embed = new Discord.RichEmbed()
    .setTitle("Here are all the commands regardless of role")
    .setColor("#86FFF2");

    for (var i = 0; i < fileNames.length-1; i++) {
      let filename = fileNames[i];
      if (filename != "help.js"){
        commandlist +=(filename.charAt(0).toUpperCase() + filename.slice(1, -3) + "\n");
      }
    }
  embed.setDescription("Use the command on its own to recieve more info\n**Available Commands:**\n"+commandlist);
  message.author.send({embed});
};
