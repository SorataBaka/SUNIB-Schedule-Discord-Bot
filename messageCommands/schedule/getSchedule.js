const retrieveSchedule = require("../../utils/retrieveSchedule.js")
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "schedule",
    async execute(message, client){
        var year
        var month
        var day
        const { content } = message
        const contentArray = content.split(" ")
        contentArray.splice(0, 2)
        if(contentArray.length == 0){
            const currentDate = new Date().toLocaleString("id-ID", {timeZone: "Asia/Jakarta"})
            year = parseInt(currentDate.split(" ")[0].split("/")[2])
            month = parseInt(currentDate.split(" ")[0].split("/")[1])
            day = parseInt(currentDate.split(" ")[0].split("/")[0])
        }else{
            const fullDate = contentArray[0]
            const dateArray = fullDate.split("-")
            day = dateArray[0]
            month = dateArray[1]
            year = dateArray[2]
        }
        const scheduleQuery = await retrieveSchedule(year, month, day)
        if(!scheduleQuery) return message.reply("No schedule available for that date")
        const embed = new MessageEmbed()
            .setTitle(`Here is the schedule for class LE01 on ${day}-${month}-${year}`)
            .setFooter("BINUS University")
            .setTimestamp()
            .setColor("#008BFF")
            .setThumbnail("https://semua.sale/media/avatar/61366binus.jpg")
        for(const schedule of scheduleQuery){
            const { dateStart, content, customParam, scheduleType, deliveryModeDesc } = schedule 
            const dateStarts = dateStart.split("T")[0]
            const timeStarts = dateStart.split("T")[1]
            const session = customParam.sessionNumber
            embed.addField(content, `Starts at: ${dateStarts} ${timeStarts} \n Session: ${session} \n Type: ${scheduleType} \n Delivery Mode: ${deliveryModeDesc}`)
        }

        message.reply({
            embeds: [embed]
        })
    }
}