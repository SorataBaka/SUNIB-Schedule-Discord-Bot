const guildData = require("../schema/guildData.js")
const { MessageEmbed } = require("discord.js")
module.exports = async(client) => {
    setInterval(async() => {
        const currentDate = new Date().toLocaleString("id-ID", {timeZone: "Asia/Jakarta"})
        const query = await guildData.find({})
        if(query.length == 0) return
        //Get current date and time when interval instantiates the funtion
        const dateArray = currentDate.split(" ")
        const year = parseInt(dateArray[0].split("/")[2])
        const month = parseInt(dateArray[0].split("/")[1])
        const day = parseInt(dateArray[0].split("/")[0])

        const hour = parseInt(dateArray[1].split(".")[0])
        const minutes = parseInt(dateArray[1].split(".")[1])
        const seconds = parseInt(dateArray[1].split(".")[2])
        //Converts the the hours, minute, seconds into seconds starting from the beginning of the day (00:00)
        const currentDurationSeconds = (hour*60*60) + (minutes*60) + seconds
        //calls the API to retrieve the schedule for the current day and checks each schedule based on the time
        const dailySchedule = await client.studentInstance.schedule(year, month, day)
        if(!dailySchedule) return 
        for(const schedule of dailySchedule){
            if(schedule.content == "EESE 1") return
            const { dateStart } = schedule
            const timeStartArray = dateStart.split("T")[1].split(":")
            const hourStart = parseInt(timeStartArray[0])
            const minuteStart = parseInt(timeStartArray[1])
            const secondStart = parseInt(timeStartArray[2])
            //Joins the hour, minute, and second into seconds starting from the beginning of the day
            const durationStartSeconds = (hourStart*60*60) + (minuteStart*60) + secondStart
            //if there is less than 45 minutes since the interval instantiates the function
            if((durationStartSeconds - currentDurationSeconds) < 40 * 60 && durationStartSeconds >= currentDurationSeconds){
                console.log("Attempting ping")
                //execute pinging sequence
                //parse all important data from the schedule
                const dateStarts = dateStart.split("T")[0]
                const timeStarts = dateStart.split("T")[1]
                const dateEnds = schedule.dateEnd.split("T")[0]
                const timeEnds = schedule.dateEnd.split("T")[1]
                const classType = schedule.title
                const lecture = schedule.content
                const lectureType = schedule.deliveryModeDesc
                const scheduleType = schedule.scheduleType
                const institutionDesc = schedule.institutionDesc
                const sessionNumber = schedule.customParam.sessionNumber
                const classDeliveryMode = schedule.classDeliveryMode

                const pingEmbed = new MessageEmbed()
                    .setTitle(lecture)
                    .setThumbnail("https://semua.sale/media/avatar/61366binus.jpg")
                    .setDescription(`Session ${sessionNumber} of ${lecture} for class ${classType} with lecture method ${classDeliveryMode} is starting soon.`)
                    .addField("Starting at:", `${dateStarts} ${timeStarts}`, true)
                    .addField("Ends at:", `${dateEnds} ${timeEnds}`, true)
                    .addField("Session: ", `${sessionNumber}`, true)
                    .addField("Delivery Mode: ", lectureType, true)
                    .addField("Schedule Type: ", scheduleType, true)
                    .setFooter(institutionDesc)
                    .setTimestamp()
                    .setColor("#008BFF")
                //gets the query of all registered guild on the database
                query.forEach(guild => {
                    console.log(`Pinging Channel ${guild.pingChannel}`)
                    const pingChannel = guild.pingChannel
                    client.channels.cache.get(pingChannel)?.send({
                        embeds: [pingEmbed],
                        content: "@everyone"
                    })
                })
            }
        }
    }, 1200000)    
}