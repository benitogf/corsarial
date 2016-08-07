#!/usr/bin/env node

'use strict';

var jade = require('jade'),
    fs = require('fs'),
    util = require('util'),
    getConfig = require('../config'),
    sass = require('node-sass-evergreen'),
    exec = require('child_process').exec;

function buildSass(conf, Q){
   var deferral = new Q.defer();
   sass.render({
        file: 'src/scss/index.scss',
      }, function(err, result) {
         if (err) throw err;
         fs.writeFile('www/css/index.css', result.css, function (err) {
           if (err) throw err;
           console.log('css');
           deferral.resolve();
         });
        });
   return deferral.promise;
}

function buildJade(conf, Q){
  var deferral = new Q.defer();
  var render = jade.compileFile('src/index.jade');
  var html = render(conf);
  fs.writeFile('www/index.html', html, function (err) {
        if (err) throw err;
        console.log('html');
        deferral.resolve();
  });
  return deferral.promise;
}

function buildJs(Q){
  var deferral = new Q.defer();
  var child = exec('npm run build');
  child.on('close', function(){
    console.log('js');
    deferral.resolve();
  });
  return deferral.promise;
}

module.exports = function(context) {
    console.log('starting pre build for ' + context.opts.platforms[0] + ' platform');
    var Q = context.requireCordovaModule('q');
    var platform = context.opts.platforms[0];
    var deferral = new Q.defer();
    getConfig(function(conf){
        switch (platform) {
            case 'android':
                conf.base = 'file:///android_asset/www/';
                conf.preUrl = 'index.html#';
                conf.html5Mode = false;
                conf.enviroment = platform;    
                break;
        }
        Q.all([
            buildJade(conf, Q),
            buildSass(conf, Q),
            buildJs(Q)
          ]).then(function(){
            console.log('pre build done');
            deferral.resolve();
          });
    });
    return deferral.promise;
};
