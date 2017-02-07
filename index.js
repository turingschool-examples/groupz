#!/usr/bin/env node
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
    console.log(line);
    if(line === 'n'){
      rl.close()
    } 
})