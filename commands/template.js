const Discord = require("discord.js");

exports.run = (client, message, args) => {
  if (message.content == "~COMMANDNAME"){
    const embed = new Discord.RichEmbed()
      .setTitle("COMMANDNAME")
      .setColor("#COLOUR")
      .setDescription("COMMANDDESCRIPTION\n**Parameters:**")
      .addField("PARAMETER1",
                "PARAMETER DESCRIPTION", true)
      .addField("PARAMETER2",
                "PARAMETER DESCRIPTION", true);
    message.channel.send({embed});
  }
};
