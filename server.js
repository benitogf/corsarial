'use strict';

var express =  require('express'),
    app = express(),
    cp = require('child_process'),
    fs = require('fs'),
    util = require('util'),
    compileSass = require('express-compile-sass'),
    xml2js = require('xml2js'),
    parser = new xml2js.Parser(),
    watch;

app.engine('jade', require('jade').__express);

function getConf(cb) {
  fs.readFile(__dirname + '/config.xml', function(err, data) {
    if (err) throw err;
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
        server: true
      };
      process.title = conf.title;
      console.log(util.inspect(conf, false, null));
      cb(conf);
    });
  });
}
function startWatch(){
  watch = cp.exec('npm run watch',
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
getConf(function(conf){
    var srccss = __dirname + '/src/scss';
    var cordovajs = __dirname + '/platforms/browser/www/cordova.js';
    var cordovapluginsroot = __dirname + '/platforms/browser/www/plugins';
    var cordovaplugins = __dirname + '/platforms/browser/www/cordova_plugins.js';
    var server = require('http').createServer(app);

    app.use('/scss', compileSass({
       root: srccss,
       sourceMap: true,
       sourceComments: true,
       watchFiles: true,
       logToConsole: false
    }));
    app.use('/cordova.js', express.static(cordovajs));
    app.use('/cordova_plugins.js', express.static(cordovaplugins));
    app.use('/plugins', express.static(cordovapluginsroot));

    if (conf.enviroment === 'dev') {
       startWatch();
       var rootjs = __dirname + '/www/js';
       var rootcss = __dirname + '/www/css';
       var rootimg = __dirname + '/www/img';
       var rootvideo = __dirname + '/www/video';
       app.use('/js', express.static(rootjs));
       app.use('/css', express.static(rootcss));
       app.use('/img', express.static(rootimg));
       app.use('/video', express.static(rootvideo));
       app.get('/', function(req, res, next){
         res.render(__dirname +'/src/index.jade', conf, function(err, html){
           if (err) {
             console.log(err);
             res.status(err.status).end();
           } else {
             res.send(html);
             console.log(Date.now());
           }
         });
       });
    } else {
       var root = __dirname + '/www';
       app.use(express.static(root));
    }
    server.listen(conf.port);
    console.log('server listening on port '+conf.port);
});
