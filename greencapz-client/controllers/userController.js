//const { body,validationResult } = require('express-validator');
//var crypto = require('crypto');
//var nodemailer = require('nodemailer');
var Users = require("../models/users");
//var Token = require('../models/token');
var Reading = require("../models/readings");
var CurrentReading = require("../models/currentReading");
const { DateTime } = require("luxon");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
//var async = require('async');

const port = new SerialPort({
  path: "COM3",
  baudRate: 9600,
  autoOpen: false,
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

//Parsing data to JSON
function tryParseJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return JSON.parse(str);
}
// Start Port on server load/////////////////////////////////////////////////////////
port.open(function (err) {
  if (err) {
    return console.log("Error opening port: ", err.message);
  }
  port.write("main screen turn on");
  console.log("Port Open");
  console.log("Waiting for data...");
});
let count = [];
parser.on("data", function (data) {
  let readingsList = [];
  console.log("collecting data...");
  // console.log(data);
  count.push("on");
  console.log(count.length);
  let temp = data;
  let newReadings = tryParseJson(temp);
  readingsList.push(newReadings);
  Users.findOne({ username: "#USERNAME" }, function (err, user) {
    if (!user)
      return res
        .status(400)
        .send({
          type: "not-verified",
          msg: "We were unable to find a valid token. Your token my have expired.",
        });
    CurrentReading.find({ _userId: user._id }, function (err, currentReading) {
      if (currentReading.length === 0) {
        var newReading1 = new CurrentReading({
          _userId: user._id,
          sensor_id: "water_temp",
          measurements: [
            {
              timestamp: Date.now(),
              sensor_reading: newReadings.temperature1,
            },
          ],
        });
        var newReading2 = new CurrentReading({
          _userId: user._id,
          sensor_id: "tent_temp",
          measurements: [
            {
              timestamp: Date.now(),
              sensor_reading: newReadings.temperature2,
            },
          ],
        });
        var newReading3 = new CurrentReading({
          _userId: user._id,
          sensor_id: "room_temp",
          measurements: [
            {
              timestamp: Date.now(),
              sensor_reading: newReadings.temperature3,
            },
          ],
        });
        var newReading4 = new CurrentReading({
          _userId: user._id,
          sensor_id: "ppm",
          measurements: [
            {
              timestamp: Date.now(),
              sensor_reading: newReadings.ppm,
            },
          ],
        });
        newReading1.save(function (err) {
          if (err) {
            return next(err);
          }
        });
        newReading2.save(function (err) {
          if (err) {
            return next(err);
          }
        });
        newReading3.save(function (err) {
          if (err) {
            return next(err);
          }
        });
        newReading4.save(function (err) {
          if (err) {
            return next(err);
          }
        });
        //res.render('dashboard', { temperature_1: newReadings.temperature1, temperature_2: newReadings.temperature2, ppm: newReadings.ppm, status: 'live'});
      } else {
        var new_reading1 = {
          timestamp: Date.now(),
          sensor_reading: newReadings.temperature1,
        };
        currentReading[0].measurements = new_reading1;
        currentReading[0].save(function (err) {
          if (err) {
            return next(err);
          }
        });
        var new_reading2 = {
          timestamp: Date.now(),
          sensor_reading: newReadings.temperature2,
        };
        currentReading[1].measurements = new_reading2;
        currentReading[1].save(function (err) {
          if (err) {
            return next(err);
          }
        });
        var new_reading3 = {
          timestamp: Date.now(),
          sensor_reading: newReadings.temperature3,
        };
        currentReading[2].measurements = new_reading3;
        currentReading[2].save(function (err) {
          if (err) {
            return next(err);
          }
        });
        var new_reading4 = {
          timestamp: Date.now(),
          sensor_reading: newReadings.ppm,
        };
        currentReading[3].measurements = new_reading4;
        currentReading[3].save(function (err) {
          if (err) {
            return next(err);
          }
        });
      }
      if (count.length === 48) {
        count = [];
        Reading.find({ _userId: user._id }, function (err, userreading) {
          if (userreading.length === 0) {
            var reading = new Reading({
              _userId: user._id,
              sensor_id: currentReading[1].sensor_id,
              measurements: [
                {
                  timestamp: Date.now(),
                  sensor_reading: newReadings.temperature2,
                },
              ],
            });
            reading.save(function (err) {
              if (err) {
                return next(err);
              }
            });
            var reading2 = new Reading({
              _userId: user._id,
              sensor_id: currentReading[3].sensor_id,
              measurements: [
                {
                  timestamp: Date.now(),
                  sensor_reading: newReadings.ppm,
                },
              ],
            });
            reading2.save(function (err) {
              if (err) {
                return next(err);
              }
            });
          } else {
            var temp_new_reading = {
              timestamp: Date.now(),
              sensor_reading: newReadings.temperature2,
            };
            var ppm_new_reading = {
              timestamp: Date.now(),
              sensor_reading: newReadings.ppm,
            };
            userreading[0].measurements.push(temp_new_reading);
            userreading[0].save(function (err) {
              if (err) {
                return next(err);
              }
            });
            userreading[1].measurements.push(ppm_new_reading);
            userreading[1].save(function (err) {
              if (err) {
                return next(err);
              }
            });
          }
        });
      }
    });
  });
});
// END port ////////////////////////////////////////////////////////////////////////////////////////////////////
exports.index = function (req, res) {
  res.render("index", { title: "Hello" });
};
exports.user_login_get = function (req, res) {
  res.send("Login");
};
exports.user_dashboard = function (req, res) {
  Users.findOne({ username: "testing" }, function (err, user) {
    if (!user)
      return res
        .status(400)
        .send({
          type: "not-verified",
          msg: "We were unable to find a valid token. Your token my have expired.",
        });
    CurrentReading.find({ _userId: user._id }, function (err, currentReading) {
      var temperature1 = currentReading[0].measurements; //Water temp
      var temperature2 = currentReading[1].measurements; //Tent temp
      var temperature3 = currentReading[2].measurements; //Room temp
      var ppm1 = currentReading[3].measurements;
      res.render("dashboard", {
        temperature_1: temperature1[0].sensor_reading,
        temperature_2: temperature2[0].sensor_reading,
        temperature_3: temperature3[0].sensor_reading,
        ppm: ppm1[0].sensor_reading,
        status: "live",
        time_temp_1: DateTime.fromJSDate(temperature1[0].timestamp).toFormat(
          "LLL d, t"
        ),
      });
    });
  });
};
