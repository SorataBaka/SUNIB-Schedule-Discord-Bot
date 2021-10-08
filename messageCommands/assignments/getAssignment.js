const { retrieveAssignment } = require("../../utils/retrieveAssignment.js")
const PREFIX = process.env.PREFIX
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "assignment",
    description: "Get all upcoming assignment",
    usage: `***${PREFIX} assignment***`,
    async execute(message, client) {
        console.log("assignment called");
        const { content } = message

        const infoEmbed = new MessageEmbed()
            .setTitle(`Please wait this might take a little while`)
            .setFooter("BINUS University")
            .setTimestamp()
            .setColor("#008BFF")
            .setThumbnail("https://semua.sale/media/avatar/61366binus.jpg")
        message.reply({
            embeds: [infoEmbed]
        })
        const subjectAndAssignments = await retrieveAssignment()
        console.log(JSON.stringify(subjectAndAssignments));
        if (!subjectAndAssignments) return message.reply("No assignment available")
        const mainEmbed = new MessageEmbed()
            .setTitle(`Here is the upcoming assignment`)
            .setFooter("BINUS University")
            .setTimestamp()
            .setColor("#008BFF")
            .setThumbnail("https://semua.sale/media/avatar/61366binus.jpg")
        for (var key in subjectAndAssignments) {
            assignments = subjectAndAssignments[key];
            if (assignments.length > 0) {
                mainEmbed.addField(key, '\u200b');
                for (var i = 0; i < assignments.length; i++) {
                    assignment = assignments[i];
                    assignmentTitle = assignment["Title"];
                    deadlineDate = assignment["deadlineDuration"];
                    deadlineTime = assignment["deadlineTime"];
                    mainEmbed.addField((i + 1).toString() + ".",
                        "Title : " + assignmentTitle + "\n" +
                        "Deadline Date : " + deadlineDate + "\n" +
                        "Deadline Time : " + deadlineTime);
                }
            }
        }
        message.edit({
            embeds: [mainEmbed]
        }).catch()

    },
}