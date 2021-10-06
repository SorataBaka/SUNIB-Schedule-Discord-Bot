const retrieveUpcoming = require("./retrieveupcoming.js")
const axios = require("axios")
const guildData = require("../schema/guildData.js")
const { MessageEmbed } = require("discord.js")
module.exports = async(client)=> {
    const updateMessage = async() =>{
        const query = await guildData.find({})
        if(query.length == 0) return
        const upcoming = await retrieveUpcoming()
        var embed;
        if(!upcoming){
            embed = new MessageEmbed()
                .setTitle("You have no upcoming tasks")
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
    
            embed = new MessageEmbed()
                .setTitle(course)
                .setThumbnail("https://semua.sale/media/avatar/61366binus.jpg")
                .setDescription(`Your upcoming class is ${course}    with lecture method ${courseType}`)
                .addField("Starts at: ", `Date: ${courseDateStarts} \n Time: ${courseTimeStarts}`, true)
                .addField("Delivery mode: ", deliveryMode, true)
                .addField("Course code:", courseCode, true)
                .addField("URL: ", url)
                .setFooter(institution)
                .setColor("#008BFF")
        }
        for(const guild of query){
            const channelID = guild.upcomingChannel
            const messageID = guild.upcomingMessageID
            if(!channelID || !messageID) return 
            console.log("------------------upcoming------------------")
            const prevMessage = await client.guilds.cache.get(guild.guildID)?.channels.cache.get(channelID)?.messages.cache.get(messageID)
            if(!prevMessage){
                console.log("Previous message or channel not found.")
                if(!client.guilds.cache.get(guild.guildID)?.channels.cache.get(channelID)) return console.log("Channel deleted")
                const newMessage = await client.guilds.cache.get(guild.guildID)?.channels.cache.get(channelID)?.send({
                    embeds: [embed]
                })
                console.log("Sent new message")
                const newMessageID = newMessage.id
                await guildData.findOneAndUpdate({
                    guildID: guild.guildID
                },{
                    upcomingMessageID: newMessageID
                },{
                    upsert: true
                }).then((data, error)=>{
                    if(data) return
                }).catch(err =>{
                    console.log(err)
                })
            }else{
                console.log("Edited Message")
                await prevMessage.edit({
                    embeds: [embed]
                }).catch(async err =>{
                    console.log("Unable to edit last message")
                    await prevMessage.delete().catch()
                    if(!client.guilds.cache.get(guild.guildID)?.channels.cache.get(channelID)) return console.log("Channel deleted")
                    const newMessage = await client.guilds.cache.get(guild.guildID)?.channels.cache.get(channelID)?.send({
                        embeds: [embed]
                    })
                    console.log("Sent new message")
                    const newMessageID = newMessage.id
                    await guildData.findOneAndUpdate({
                        guildID: guild.guildID
                    },{
                        upcomingMessageID: newMessageID
                    },{
                        upsert: true
                    }).then((data, error)=>{
                        if(data) return
                    }).catch(err =>{
                        console.log(err)
                    })
                })
            }
        }
    }

    setInterval(async()=>{
        await updateMessage()
    }, 60000)


}