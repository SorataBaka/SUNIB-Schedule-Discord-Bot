const retrieveCommit = require("../../utils/retrieveCommit.js")
const PREFIX = process.env.PREFIX
module.exports = {
    name: "commit",
    description: "Displays latest commit.",
    usage: `***${PREFIX} commit***`,
    async execute(message, client){
        const commitEmbed = await retrieveCommit()
        message.reply({
            embeds:[commitEmbed]
        })
    }
}