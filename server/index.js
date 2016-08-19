'use strict';

const express =  require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const server = require('http').createServer(app)
const bole = require('bole')
const bistre = require('bistre')({ time: true })
const cwd = process.cwd()
const getConfig = require('./config')
const prepend = require('prepend-file')
const concat = require('concat-stream')
const replace = require('replacestream')
const gaze = require('gaze')
const compression = require('compression')
const io = require('socket.io')(server)

function initServer(conf, log) {

    app.set('view engine', 'pug');
    app.engine('pug', require('pug').renderFile);
    app.use(compression({ threshold: 0 }));

    var platform = cwd + '/platforms/browser/www/';
    var dir = {
        cordova: platform + 'cordova.js',
        plugins: platform + 'plugins',
        cordovaplugins: platform + 'cordova_plugins.js',
        js:  cwd + '/www/js',
        scss: cwd + '/src/scss',
        img: cwd + '/www/img',
        video: cwd + '/www/video',
        node_modules: cwd + '/node_modules',
        test: cwd + '/test',
    };

    app.use('/scss', require('./sass')({
       root: dir.scss,
       sourceMap: true,
       sourceComments: true,
       log: log,
       io: io
    }));
    app.use('/cordova.js', express.static(dir.cordova));
    app.use('/cordova_plugins.js', express.static(dir.cordovaplugins));
    app.use('/plugins', express.static(dir.plugins));
    app.use('/js', express.static(dir.js));
    app.use('/img', express.static(dir.img));
    app.use('/video', express.static(dir.video));
    app.use('/node_modules', express.static(dir.node_modules));
    app.use('/test', express.static(dir.test));
    app.get('/specs', function(req, res, next){
        res.render(cwd +'/test/specs.pug', conf, function(err, html){
            if (err) {
              log.warn(err);
              res.status(err.status).end();
            } else {
              res.send(html);
              log.info(req);
            }
        });
    });
    app.get('/*', function(req, res, next){
        res.render(cwd +'/src/index.pug', conf, function(err, html){
          if (err) {
            log.warn(err);
            res.status(err.status).end();
          } else {
            res.send(html);
            log.info(req);
          }
        });
    });
}

function testWatch(log) {
    var testDir =  cwd + '/test/specs/*.js';
    gaze(testDir, (err, watcher) => {
        if (err) {
           log.warn(err);
        }
        watcher.on('all', (event, filepath) => {
           io.emit('bundle');
        });
    });
}

function configLog(name) {
    var log = bole(name);
    bole.output([{
      level: 'info',
      stream: bistre
    },
    {
      level: 'err',
      stream: bistre
    }]);
    bole.setFastTime(true);
    bistre.pipe(process.stdout);
    return log;
}

function start() {

    //browserify-livereload
    var b = this;
    var outfile = arguments[0];
    var conf = arguments[1];
    var firstBundle = true;
    var log = configLog(conf.title);
    initServer(conf, log);
    testWatch(log);
    b.on('bundle', function(stream) {
      stream.on('end', reload)
      function reload () {
        fs.createReadStream(path.join(__dirname, 'socket.js'))
          .pipe(replace(/PORT/g, conf.port))
          .pipe(replace(/HOST/g, conf.host))
          .pipe(concat(read))

        function read (data) {
          prepend(outfile, data, function (err) {
            if (err) {
              throw err
            }
            if (!firstBundle) {
               io.emit('bundle')
           } else {
               firstBundle = false;
               require('opn')('http://' + conf.host + ':' + conf.port);
           }
          })
        }
      }
    });

    server.listen(conf.port);
    log.info(conf);
    log.info('server ['+conf.environment+'] ready on port '+conf.port);
}

module.exports = function (b, options) {
  if (b && options && (b.argv || options.outfile)) {
      var outfile = options.outfile || b.argv.outfile
      var startBundle = start.bind(b, outfile);
      getConfig(startBundle);
  } else {
      throw 'no outfile arg detected';
  }
}
