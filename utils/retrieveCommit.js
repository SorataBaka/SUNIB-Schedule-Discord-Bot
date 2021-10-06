const axios = require("axios")
const { MessageEmbed } = require("discord.js")
module.exports = async() =>{
    const request = await axios.request({
        method: "GET",
        url: 'https://api.github.com/repos/SorataBaka/SUNIB-Schedule-Discord-Bot/commits'
    }).then(async callback => {
        const commit = callback.data[0].commit
        const commitauthor = commit.author.name
        const commitreason = commit.message
        const commiturl = callback.data[0].html_url
        const commitembed = new MessageEmbed()
            .setTitle(commitreason)
            .setThumbnail("https://semua.sale/media/avatar/61366binus.jpg")
            .setAuthor("The bot has restarted. Here is the latest update on the LE01 SUNIB Discord Bot Repo")
            .setDescription(`Commit by ${commitauthor} on the LE01 SUNIB Discord Bot`)
            .addField(`You can look at the latest commit here: `, commiturl)
            .setColor("#008BFF")
        return commitembed
    })
    return request
}