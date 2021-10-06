const mongoose = require('mongoose');
const guildData = new mongoose.Schema({
  guildID: {
    type: String,
    required: true
  },
  pingChannel: {
    type: String,
  },
  todoChannel: {
    type: String
  },
  todoMessageID:{
    type: String
  },
  upcomingChannel: {
    type: String
  },
  upcomingMessageID:{
    type: String
  }
})

module.exports = new mongoose.model("sunib-guild", guildData)