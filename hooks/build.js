#!/usr/bin/env node

'use strict';

var jade = require('jade'),
    fs = require('fs'),
    util = require('util'),
    xml2js = require('xml2js'),
    parser = new xml2js.Parser(),
    sass = require('node-sass-evergreen'),
    exec = require('child_process').exec;

function readConf(platform, cb){
  fs.readFile('config.xml', function(err, data) {
    parser.parseString(data, function (err, data) {
        if (err) throw err;
        var conf = {
          title: data.widget.name[0],
          author: data.widget.author[0]._,
          enviroment: data.widget.server[0].env[0],
          host: data.widget.server[0].host[0],
          port: data.widget.server[0].port[0],
          gapi: data.widget.server[0].gapi[0],
          ganalytics: data.widget.server[0].ganalytics[0],
          html5Mode: false
        };
        switch (platform) {
            case 'android':
                conf.base = 'file:///android_asset/www/'
                conf.preUrl = 'index.html#'
                break;
            default:
                conf.base = '/'
                conf.preUrl = '#'
        }
        console.log(util.inspect(conf, false, null));
        cb(conf);
    });
  });
}

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
    var deferral = new Q.defer();
    readConf(context.opts.platforms[0], function(conf){
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
