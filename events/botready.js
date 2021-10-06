const connectMongoose = require("../utils/connectMongoose.js")
module.exports = {
  eventName: 'ready',
  once: true,
  async execute (client){
    const guildCount = client.guilds.cache.size
    const guilds = client.guilds.cache
    var membercount = 0;
    await guilds.forEach((guild, snowflake) => {
      const guildMemberCount = guild.members.cache.size
      membercount = membercount + guildMemberCount
    })
    connectMongoose()
    console.log(`Bot is now online! Currently online as ${client.user.tag} and serving in ${guildCount} server(s) for ${membercount} members`)
  }
}