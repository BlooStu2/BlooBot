const Discord = require("discord.js");
const config = require("../../config.json");

exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()
    .setTitle("Mod")
    .setColor("#86FFF2")
    .setDescription("Gives a user a mod role\n**Parameters:**")
    .addField("User",
              "The user to be modded", true);
  message.channel.send({embed});
};
