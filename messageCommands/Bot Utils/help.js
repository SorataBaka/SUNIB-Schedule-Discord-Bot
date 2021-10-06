const { MessageCommands, MessageEmbed } = require("discord.js")
const PREFIX = process.env.PREFIX
module.exports = {
    name: "help",
    description: "Displays information about how to use the bot.",
    usage: `***${PREFIX} help*** or ***${PREFIX} help {command name}***`,
    async execute(message, client){
        const args = message.content.split(" ")
        args.splice(0, 2)
        const string = args.join(" ")
        if(!string){
            const commands = client.messageCommands
            var stringArray = []
            for(const command of commands){
                const commandName = command[1].name
                const parsedName = "`" + commandName + "`"
                stringArray.push(parsedName)
            }
            const helpString = stringArray.join(", ")
            const embed = new MessageEmbed()
                .setAuthor("LE01 - Bina Nusantara University")
                .setTitle("Help module for LE-01 SUNIB Discord Bot")
                .setDescription(`Here are the list of commands available to be used. You can do ***${PREFIX} help {command name}*** to get more information for a command.`)
                .addField("Commands: ", helpString)
                .setFooter("BINUS University")
                .setTimestamp() 
                .setColor("#008BFF")
            return message.reply({
                embeds: [embed]
            })
        }else{
            const commandName = string.split(" ")[0]
            const commandData = await client.messageCommands.get(commandName)
            if(!commandData) return message.reply("That command is not found")
            const description = commandData.description || "NO DESCRIPTION AVAILABLE"
            const usage = commandData.usage || "NO INFORMATION AVAILABLE"
            const embed = new MessageEmbed()
                .setAuthor("LE01 - Bina Nusantara University")
                .setTitle("Help module for LE-01 SUNIB Discord Bot")
                .setDescription(`Help module for ***${commandName}*** command.`)
                .addField("Description: ", description)
                .addField("Usage: ", usage)
                .setFooter("BINUS University")
                .setTimestamp() 
                .setColor("#008BFF")
            return message.reply({
                embeds: [embed]
            })
        }
    }
}