#!/usr/bin/env node
var readline = require('readline');
var shuffleArray = require('./shuffleArray.js');
var students = require('./data/students.js');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var num;
var groups = [];

function getInput(content, callback){
  rl.question(content, function(answer){
    if (answer.match(/[quit|q]/)) {
      rl.close();
    } else if (!answer.match(/\d+/))  {
      getInput(content, callback);
    } else {
      num = parseInt(answer);
      callback();
    }
  });
}

function testGroup(){
  if (students.length){
    students = shuffleArray(students);
    var splicedStudents = [];
    for (var i = 0; i < num; i++){
      var s = students.pop();
      splicedStudents.push(s);
      if (!students.length) {
        break;
      }
    }
    splicedStudents.forEach(function(s){
      console.log('* ' + s);
    });
    rl.question('Is this group okay?\n (y|n)\n', function(answer){
      if (answer === 'y') {
        groups.push(splicedStudents);
        testGroup();
      } else {
        Array.prototype.push.apply(students, splicedStudents);
        testGroup();
      }
    });
  } else {
    groups.forEach(function(group){
      console.log('');
      group.forEach(function(s){
        console.log('* ' + s);
      });
    });
    rl.close();
  }
}

getInput('How Many Students? \n', testGroup);
