const {Client, Intents, Collection}  = require('discord.js')
const fs = require("fs")

require('dotenv').config()

const TOKEN = process.env.TOKEN
const botIntents = new Intents(IntentsBot = Object.values(Intents.FLAGS).reduce((acc, p) => acc | p, 0))
const client = new Client({intents: botIntents})

client.messageCommands = new Collection()

const commandsDirectory = fs.readdirSync("./messageCommands")
const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"))

//parse events
for(file of events){
  const event = require(`./events/${file}`)
  client.on(event.eventName, (...args) => event.execute(...args, client))
}
//parse message based commands
for(dir of commandsDirectory){
  const commandCategories = fs.readdirSync(`./messageCommands/${dir}`).filter(file => file.endsWith(".js"))
  for(commands of commandCategories){
    const commandFile = require(`./messageCommands/${dir}/${commands}`)
    client.messageCommands.set(commandFile.name, commandFile)
  }
}

console.log(client.messageCommands)
const notification = require("./utils/notificationSystem.js")
const ongoing = require("./utils/updateongoing.js")
const upcoming = require("./utils/updateupcoming.js")

// const retrieveupcoming = require("./utils/retrieveupcoming.js")
// const retrieveongoing = require("./utils/retrieveongoing.js")
notification(client)
ongoing(client)
upcoming(client)

client.login(TOKEN)