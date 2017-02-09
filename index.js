#!/usr/bin/env node
var readline = require('readline');
var shuffleArray = require('./shuffleArray.js');
var students = require('./data/students.js');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var groups = [];

function startGroupCountLoop(){
  rl.question('How Many Students? \n', getGroupCount);
}

function getGroupCount(answer){
  if (answer.match(/[quit|q]/)) {
    rl.close();
  } else if (!answer.match(/\d+/))  {
    startGroupCountLoop();
  } else {
    var num = parseInt(answer);
    startGroupApprovalLoop(num);
  }
}

function startGroupApprovalLoop(num){
  if (students.length){
    students = shuffleArray(students);
    var splicedStudents = spliceStudents(num);
    logStudents(splicedStudents)
    startAcceptanceLoop(splicedStudents, num)
  } else {
    logGroups(groups)
    rl.close();
  }
}

function startAcceptanceLoop(splicedStudents, num){
  rl.question('Is this group okay?\n (y|n)\n', function(answer){
    if (answer === 'y') {
      groups.push(splicedStudents);
      startGroupApprovalLoop(num);
    } else {
      returnToStudentBatch(splicedStudents);
      startGroupApprovalLoop(num);
    }
  });
}


function spliceStudents(num){
  var splicedStudents = [];
  for (var i = 0; i < num; i++){
    var s = students.pop();
    splicedStudents.push(s);
    if (!students.length) {
      break;
    }
  }
  return splicedStudents;
}

function returnToStudentBatch(splicedStudents){
  Array.prototype.push.apply(students, splicedStudents);
}

function logGroups(groups){
  groups.forEach(function(group){
    console.log('');
    logStudents(group)
  });
}

function logStudents(group){
  group.forEach(function(s){
    console.log('* ' + s);
  });
}

startGroupCountLoop();
