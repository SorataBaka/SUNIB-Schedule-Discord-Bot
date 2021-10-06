const guildData = require("../../schema/guildData.js")
const prefix = process.env.PREFIX
module.exports = {
    name: "setping",
    description: "Sets the ping channel for upcoming classes.",
    usage: `***${prefix} setping #tag-channel***`,
    async execute(message, client){
        if(!message.member.permissions.has("MANAGE_GUILD")){
            return message.reply("You do not have permission to use this command!")
        }
        const channel = message.mentions.channels?.first()
        if(!channel){
            return message.reply("Please mention a channel!")
        }
        await guildData.findOneAndUpdate({
            guildID: message.guild.id
        },{
            guildID: message.guild.id,
            pingChannel: channel.id
        },{
            upsert: true
        }).catch(err => {
            if(err) return message.reply("I have failed to set the ping channel :(")
        })
        return message.reply(`I have set the ping channel to <#${channel.id}>`)

    }
}