#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

var readline = require('readline');

var GroupDialog = require('./lib/GroupDialog.js');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.readFile(path.join(__dirname, '.', 'data', '1706.txt'), function (err, data) {
  if (err) {
    return console.error(err);
  }
  students = data.toString().split('\n');
  var groupDialog = new GroupDialog(rl, students);
  groupDialog.startGroupCountLoop();
});
