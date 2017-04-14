var Server = require('../../models/serverstatus');
var express = require('express');
var router = express.Router();
var moment = require('moment');
/* GET home page. */
router.get('/api/request', function(req, res, next) {
  console.log(req.query.connId);
  console.log(req.query.timeout);
  var data = {
    connectionId: req.query.connId,
    timeServer: moment(),
    timetolive: Number(req.query.timeout),
    status: 'OK!'
  };
  var serverdata = new Server(data);
  serverdata.save()
  .then(function (savedserverstatus) {
    setTimeout(function () {
      return res.json({ 'status': 'OK!'  });
    }, req.query.timeout);
  })
  .catch(function (err) {
    return res.json({ error: true, msg: err.message });
  })
});

router.get('/api/serverStatus', function (req, res, next) {
    Server
    .find({ })
    .exec()
    .then(function (serverdata) {
        var requestalive = [];
        var timenow = moment();
        serverdata.forEach(function (ele) {
          var minutes = Math.floor(ele.timetolive / 60);
          ele.timetolive = ele.timetolive%60;
          var hours = Math.floor(minutes/60)
          minutes = minutes%60;
          // console.log('seconds: '+ele.timetolive + 'minutes: '+minutes+ 'hours: '+ hours);

            var timeofreq = moment(ele.timeServer);
            var elapsed = moment.duration(timenow.diff(moment(timeofreq)));
            if (elapsed._data.seconds < ele.timetolive && elapsed._data.minutes < minutes && elapsed._data.hours < hours) {
                var obj = {
                  connId: ele.connectionId,
                  timeTocomplete: elapsed
                };
                requestalive.push(obj);
            }
          })
            // // console.log(elapsed._data.seconds);
            // if (elapsed._data.seconds < Number(ele.timetolive) ) {
            //   console.log(ele.timetolive);
            //   console.log(elapsed._data.seconds);
            // }
        return res.json({ error: false, requestalive: requestalive })
    })
    .catch(function (err) {
      console.log(err);
        return res.json({ error: true, reason: err.message });
    })
});

router.put('/api/kill', function (req, res, next) {
    var connectid = req.body.payload;
    var status;
    Server
    .findOne({ 'connectionId': connectid })
    .exec()
    .then(function (serverdata) {
        if (serverdata.connectionId === null ) {
          status = 'invalid connection Id :'+ payload ;
        } else  {
          status = 'Killed';
        }

        return res.json({ 'status' : status})
    })
    .catch(function (err) {
        return res.json({error: true})
    })
})


module.exports = router;
