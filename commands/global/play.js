const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");
const ytdl = require("ytdl-core");
const request = require("request");
const getyoutubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
let music = {};

exports.run = (client, message, args, guild) => {
  let song = args.join(' ');
  if (!message.member.voiceChannel) return message.reply('Err...No voicechannel?');
  if (guild.isPlaying) {
   getID(song, id => {
      if (!id) return message.reply('Unable to extract video.');
      ytdl.getInfo(id, (err, info) => {
         if (err) return message.reply('Hmm..there was an error extracting that video.');
         if (info.formats.some(format => format.live)) return message.reply('Not supporting live stream at this time.');
         message.delete();
            guild.queue.push({
               info, requester: message.member
         });
         message.reply(`The song: ***${info.title}*** has been added to the queue list.`);

      });
   });

  }
  else {
  guild.isPlaying = true;
  message.channel.send(`Searching for **${song}**`);
   getID(song, id => {
   if (!id) return message.reply(' unable to extract video');
      ytdl.getInfo(id, (err, info) => {
      if (err) return message.reply('Hmm..there was an error extracting that video.');
      if (info.formats.some(format => format.live)) return message.reply('Not supporting live stream at this time.');
         message.delete();
              guild.queue.push({
               info, requester: message.member
         });
         playMusic(guild, message);
      });
   });
 }
};

function getID(str, callback) {
  if (str.includes('youtube.com')) {
    callback(getyoutubeID(str));
  }
  else {
    search_video(str, (id) => {
      callback(id);
    });
  }
}

function search_video(query, callback) {
  request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + config.yt_api_key, (error, response, body) => {
    if (error) return message.reply('There was an error searching the requested song ' + message.author.toString());
    try {
      const json = JSON.parse(body);
      callback(json.items[0].id.videoId);
    }
    catch (e) {
      callback(null);
    }
  });
}

function playMusic(guild, message) {
          const voiceChannel = message.member.voiceChannel;

          voiceChannel.join().then(connection => {
              guild.skippers = [];
              const stream = ytdl.downloadFromInfo(guild.queue[0].info, {
                  filter: 'audioonly'
              });
              message.channel.send(`Now playing: **${guild.queue[0].info.title}** as requested by ${guild.queue[0].requester.displayName}`);
              const dispatcher = connection.playStream(stream);
              dispatcher.on('error', console.log);
              dispatcher.on('debug', console.log);
              dispatcher.on('end', () => {
                  guild.queue.shift();
                  if (guild.queue.length === 0) {
                      guild.isPlaying = false;
                      setTimeout(() => {
                          voiceChannel.leave();
                          return message.channel.send('Queue is empty. Queue up some more tunes!');
                      }, 2500);
                  } else {
                      setTimeout(() => {
                          playMusic(guild, message);
                      }, 500);
                  }
              });
          });
      }

function skip_song(message) {
  message.guild.voiceConnection.dispatcher.end();
}
