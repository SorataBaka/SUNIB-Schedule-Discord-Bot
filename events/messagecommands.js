const PREFIX = process.env.PREFIX
module.exports = {
  eventName: "messageCreate",
  once: true,
  async execute(message, client) {
    //checks if the author is a bot
    if(message.author.bot) return

    //begin message parsing and execution
    const messageArray = message.content.split(" ")
    if(messageArray[0].toLowerCase() == PREFIX.toLowerCase()){
      const executeCommand = client.messageCommands.get(messageArray[1].toLowerCase())
      return executeCommand.execute(message, client)
    }
  }
}