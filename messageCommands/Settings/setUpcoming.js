const guildData = require("../../schema/guildData.js")
const { MessageEmbed } = require("discord.js")
const prefix = process.env.PREFIX
module.exports = {
    name: "setupcoming",
    description: "Sets the Upcoming Channel to update about the upcoming classes.",
    usage: `***${prefix} setupcoming #tag-channel***`,
    async execute(message, client){
        if(!message.member.permissions.has("MANAGE_GUILD")){
            return message.reply("You do not have permission to use this command!")
        }
        
        const channel = message.mentions.channels?.first()
        var newMessage
        if(!channel){
            return message.reply("Please mention a channel!")
        }
        const upcoming = await client.studentInstance.fetch({status: "upcoming"})
        if(!upcoming){
            var upcomingEmbed = new MessageEmbed()
                .setTitle("You have no upcoming schedule!")
            newMessage = await message.channel.send({
                embeds: [upcomingEmbed]
            })
        }else{
            const courseType = upcoming.deliveryMode
            const course = upcoming.courseName
            var url = upcoming.url || upcoming.joinUrl
            if(!url) url = "NO URL PROVIDED"    
            const courseCode = upcoming.courseCode
            const courseDateStarts = upcoming.dateStart.split("T")[0]
            const courseTimeStarts = upcoming.dateStart.split("T")[1]
            const deliveryMode = upcoming.deliveryModeDesc
            const institution = upcoming.institutionDesc

            var upcomingEmbed = new MessageEmbed()
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
                embeds: [upcomingEmbed]
            })
        }
        
        
        await guildData.findOneAndUpdate({
            guildID: message.guild.id
        },{
            guildID: message.guild.id,
            upcomingChannel: channel.id,
            upcomingMessageID: newMessage.id
        },{
            upsert: true
        }).catch(err => {
            if(err) return message.reply("I have failed to set the Upcoming channel :(")
        })
        const finishMessage = await message.reply(`I have set the Upcoming channel to <#${channel.id}>`)
        return setTimeout(()=> {
            finishMessage.delete().catch()
            message.delete().catch()
        },5000)
    }
}