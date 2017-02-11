var shuffleArray = require('./shuffleArray.js');

function GroupDialog(rl, students) {
  this.rl = rl;
  this.students = students;
  this.groups = [];
}

GroupDialog.prototype.startGroupCountLoop = function() {
  this.rl.question('How Many Students? \n', this.handleGroupSizeResponse.bind(this));
};

GroupDialog.prototype.startAcceptanceLoop = function(splicedStudents){
  this.rl.question('Is this group okay?\n (y|n)\n',
                    this.handleAcceptanceResponse.bind(this, splicedStudents));
};

GroupDialog.prototype.handleGroupSizeResponse = function(answer){
  if (!answer.match(/\d+/))  {
    this.rl.close();
  } else {
    this.num = parseInt(answer);
    this.startGroupApprovalLoop();
  }
};

GroupDialog.prototype.handleAcceptanceResponse = function(students, answer){
  if (answer === 'y') {
    this.groups.push(students);
    this.startGroupApprovalLoop(this.num);
  } else {
    this.returnToStudentBatch(students);
    this.startGroupApprovalLoop(this.num);
  }
};

GroupDialog.prototype.startGroupApprovalLoop = function() {
  if (this.students.length){
    var splicedStudents = this.spliceStudents();
    logStudents(splicedStudents);
    this.startAcceptanceLoop(splicedStudents);
  } else {
    logGroups(this.groups);
    this.rl.close();
  }
};

GroupDialog.prototype.spliceStudents = function(){
  this.students = shuffleArray(this.students);
  var splicedStudents = [];
  for (var i = 0; i < this.num; i++){
    var s = this.students.pop();
    splicedStudents.push(s);
    if (!this.students.length) {
      break;
    }
  }
  return splicedStudents;
};

GroupDialog.prototype.returnToStudentBatch = function(splicedStudents){
  Array.prototype.push.apply(this.students, splicedStudents);
};

function logGroups(groups){
  groups.forEach(function(group){
    console.log('');
    logStudents(group);
  });
}

function logStudents(group){
  group.forEach(function(s){
    console.log('* ' + s);
  });
}

module.exports = GroupDialog;
