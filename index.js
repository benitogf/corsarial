'use strict';

const cp = require('child_process')
const getConfig = require('./config')

function startWatch() {
  var watch = cp.exec('npm run watch',
    function (error, stdout, stderr) {
      console.log('watchout: ' + stdout);
      console.log('watcherr: ' + stderr);
      if (error !== null) {
        console.log('watch exec error: ' + error);
      }
  });
  watch.stdout.on('data', function (data) {
    console.log('watchout: ' + data);
  });
}

function redirect(config) {
    if (config.enviroment === 'dev') {
        startWatch();
    } else {
        require('./server')();
    }
}

getConfig(redirect, true);
