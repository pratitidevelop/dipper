  var mongoose = require('mongoose');
  var moment = require('moment');

  var ServerStatusSchema = new mongoose.Schema({
    connectionId: {
      type: String
    },
    timeServer:{
      type: Date
    },
    timetolive: {
      type: Number
    },
    status: {
      type: String
    }
  });

  module.exports = mongoose.model('ServerStatus', ServerStatusSchema);
