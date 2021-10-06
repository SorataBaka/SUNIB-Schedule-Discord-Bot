const {retrieveAssignment} = require("../../utils/retrieveAssignment.js")
const PREFIX = process.env.PREFIX
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "assignment",
    description: "Get all upcoming assignment",
    usage: `***${PREFIX} assignment***`,
    async execute(message, client) {
        const { content } = message
        const subjectAndAssignments = await retrieveAssignment()
        if (!subjectAndAssignments) return message.reply("No assignment available")
        const embed = new MessageEmbed()
            .setTitle(`Here is the upcoming assignment`)
            .setFooter("BINUS University")
            .setTimestamp()
            .setColor("#008BFF")
            .setThumbnail("https://semua.sale/media/avatar/61366binus.jpg")
        for (var key in subjectAndAssignments) {
            assignments = subjectAndAssignments[key];
            embed.addField(content, "Subject " + key + " has " + assignments.length + "assignments");
            for (var i = 0; i < assignments.length; i++) {
                assignment = assignments[i];
                assignmentTitle = assignment["Title"];
                deadlineDate = assignment["deadlineDuration"];
                deadlineTime = assignment["deadlineTime"];
                embed.addField(content, "title : " + assignmentTitle + "\n" +
                    "Deadline Date : " + deadlineDate + "\n" +
                    "Deadline Time : " + deadlineTime);
            }
        }
        message.reply({
            embeds: [embed]
        })
    },
}