'use strict';

const exec = require('child_process').exec
const getConfig = require('./config')
const chalk = require('chalk');

function startWatch() {
  var watch = exec('npm run watch');
  watch.on('error', (err) => {
    console.log(err);
  });
  watch.stdout.on('data', (data) => {
    if ((data.indexOf('reading') !== -1) ||
        (data.indexOf('ready on') !== -1)) {
       console.log(chalk.blue(data));
   } else {
       if (data.indexOf('watch') !== -1) {
           console.log(chalk.yellow(data));
       } else {
           console.log(chalk.green(data));
       }
   }
  });
  watch.stderr.on('data', (error) => {
      console.log(chalk.red(error));
  });
}

function start() {
    if (process.argv.slice(2)[0] === 'browser') {
        require('./server')();
    } else {
        startWatch();
    }
}
start();
