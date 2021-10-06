const guildData = require("../../schema/guildData.js")
const retrieveOngoing = require("../../utils/retrieveongoing.js")
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "setongoing",
    async execute(message, client){
        if(!message.member.permissions.has("MANAGE_GUILD")){
            return message.reply("You do not have permission to use this command!")
        }
        
        const channel = message.mentions.channels?.first()
        var newMessage
        if(!channel){
            return message.reply("Please mention a channel!")
        }
        const ongoing = await retrieveOngoing()
        if(!ongoing){
            var ongoingEmbed = new MessageEmbed()
                .setTitle("You have no upcoming schedule!")
            newMessage = await message.channel.send({
                embeds: [ongoingEmbed]
            })
        }else{
            const courseType = ongoing.deliveryMode
            const course = ongoing.courseName
            var url = ongoing.url || ongoing.joinUrl
            if(!url) url = "NO URL PROVIDED"    
            const courseCode = ongoing.courseCode
            const courseDateStarts = ongoing.dateStart.split("T")[0]
            const courseTimeStarts = ongoing.dateStart.split("T")[1]
            const deliveryMode = ongoing.deliveryModeDesc
            const institution = ongoing.institutionDesc

            var ongoingEmbed = new MessageEmbed()
                .setTitle(course)
                .setThumbnail("https://semua.sale/media/avatar/61366binus.jpg")
                .setDescription(`Your upcoming class is ${course}    with lecture method ${courseType}`)
                .addField("Starts at: ", `Date: ${courseDateStarts} \n Time: ${courseTimeStarts}`, true)
                .addField("Delivery mode: ", deliveryMode, true)
                .addField("Course code:", courseCode, true)
                .addField("URL: ", url)
                .setFooter(institution)
                .setColor("#008BFF")
            newMessage = await message.guild.channels.cache.get(channel.id)?.send({
                embeds: [ongoingEmbed]
            })
        }
        
        
        await guildData.findOneAndUpdate({
            guildID: message.guild.id
        },{
            guildID: message.guild.id,
            todoChannel: channel.id,
            todoMessageID: newMessage.id
        },{
            upsert: true
        }).catch(err => {
            if(err) return message.reply("I have failed to set the Ongoing channel :(")
        })
        const finishMessage = await message.reply(`I have set the Ongoing channel to <#${channel.id}>`)
        return setTimeout(()=> {
            finishMessage.delete().catch()
            message.delete().catch()
        },5000)
    }
}