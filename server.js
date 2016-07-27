'use strict';

const express =  require('express')
const app = express()
const fs = require('fs')
const chalk = require('chalk')
const compileSass = require('./sass')
const path = require('path')
const prepend = require('prepend-file')
const concat = require('concat-stream')
const replace = require('replacestream')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const getConfig = require('./config')
const jade = require('jade').__express

function initServer(conf) {
    app.engine('jade', jade);
    var srccss = __dirname + '/src/scss';
    var cordovajs = __dirname + '/platforms/browser/www/cordova.js';
    var cordovapluginsroot = __dirname + '/platforms/browser/www/plugins';
    var cordovaplugins = __dirname + '/platforms/browser/www/cordova_plugins.js';

    app.use('/scss', compileSass({
       root: srccss,
       sourceMap: true,
       sourceComments: true,
       watchFiles: true,
       logToConsole: false,
       io: io
    }));
    app.use('/cordova.js', express.static(cordovajs));
    app.use('/cordova_plugins.js', express.static(cordovaplugins));
    app.use('/plugins', express.static(cordovapluginsroot));

    if (conf.enviroment === 'dev') {
       var rootjs = __dirname + '/www/js';
       var rootcss = __dirname + '/www/css';
       var rootimg = __dirname + '/www/img';
       var rootvideo = __dirname + '/www/video';
       app.use('/js', express.static(rootjs));
       app.use('/css', express.static(rootcss));
       app.use('/img', express.static(rootimg));
       app.use('/video', express.static(rootvideo));
       app.get('/*', function(req, res, next){
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
}

function start() {
    //browserify-livereload
    var b = this;
    var outfile = arguments[0];
    var conf = arguments[1];
    initServer(conf);
    if (conf.enviroment === 'dev') {
        b.on('bundle', (stream) => {
          //console.log('BUNDLE');
          stream.on('end', reload)
          function reload () {
            //console.log('RELOAD');
            fs.createReadStream(path.join(__dirname, 'socket.js'))
              .pipe(replace(/PORT/g, conf.port))
              .pipe(replace(/HOST/g, conf.host))
              .pipe(concat(read))

            function read (data) {
              prepend(outfile, data, function (err) {
                if (err) {
                  throw err
                }

                io.emit('bundle')
              })
            }
          }
        })
    }

    server.listen(conf.port);
    console.log('server ['+conf.enviroment+'] ready on port '+conf.port);
}

module.exports = function (b, options) {
  if (!b.argv && !options.outfile) {
    throw new Error('outfile option must be specified if using the API directly')
  }

  var outfile = options.outfile || b.argv.outfile
  var startBundle = start.bind(b, outfile);

  getConfig(startBundle);
}
