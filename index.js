// import {Client, Intents, Collection} from 'discord.js'\
const { Client, Intents, Collection } = require("discord.js")
const fs = require("fs")

require('dotenv').config()

const TOKEN = process.env.TOKEN

const IntentsBot = Object.values(Intents.FLAGS).reduce((acc, p) => acc | p, 0)
const botIntents = new Intents(IntentsBot)
const client = new Client({intents: botIntents})

client.messageCommands = new Collection()

const commandsDirectory = fs.readdirSync("./messageCommands")
const events = fs.readdirSync("./events").filter((file) => file.endsWith(".js"))

//parse events
for(const file of events){
  const event = require(`./events/${file}`)
  client.on(event.eventName, (...args) => event.execute(...args, client))
}
//parse message based commands
for(const dir of commandsDirectory){
  const commandCategories = fs.readdirSync(`./messageCommands/${dir}`).filter((file)=> file.endsWith(".js"))
  for(const commands of commandCategories){
    const commandFile = require(`./messageCommands/${dir}/${commands}`)
    client.messageCommands.set(commandFile.name, commandFile)
  }
}
const notification = require("./utils/notificationSystem.js")
const ongoing = require("./utils/updateongoing.js")
const upcoming = require("./utils/updateupcoming.js")
const studentInstance = require("./utils/studentClass.js")

if(process.env.ENABLE_NOTIFICATIONS == "true"){
  console.log("Notification and update handler online")
  notification(client)
  ongoing(client)
  upcoming(client)
}

const bearer = process.env.BEARER
// const cookie = process.env.COOKIE


// interface Student{
//   academicCareer:string;
//   institution:string;
//   role:string;
//   bearer:string;
//   //cookie:string;
// }

const user={
  academicCareer : "RS1",
  institution : "BNS01",
  role: "Student",
  bearer: bearer,
  //cookie: cookie
}

const tian = new studentInstance(user)

client.studentInstance = tian

client.login(TOKEN)