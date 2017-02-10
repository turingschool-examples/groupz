#!/usr/bin/env node
var fs = require('fs');

var GroupDialog = require('./GroupDialog.js');

fs.readFile('./data/1608.txt', function (err, data) {
  if (err) {
    return console.error(err);
  }
  students = data.toString().split('\n');
  var groupDialog = new GroupDialog(students);
  groupDialog.startGroupCountLoop();
});
