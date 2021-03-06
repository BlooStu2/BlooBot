const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");

exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()
  .setTitle("Mute")
  .setColor("#86FFF2")
  .setDescription("Mute a user in a text channel\n**Parameters:**")
  .addField("User",
            "The user to be muted", true)
  .addField("Duration",
            "The duration of the mute", true)
  .addField("Reason",
            "The reason for the mute", true);
  message.channel.send({embed});
};
