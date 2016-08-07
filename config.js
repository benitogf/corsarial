'use strict';

const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
var conf;


function getConfig(cb, env) {
    console.log(chalk.underline('reading config.xml'));
    fs.readFile(__dirname + '/config.xml', function(err, data) {
      if (err) throw err;
      parser.parseString(data, function (err, data) {
        if (err) throw err;
        var conf = {
          title: data.widget.name[0],
          author: data.widget.author[0]._,
          enviroment: (env) ? env : 'dev',
          host: data.widget.server[0].host[0],
          port: data.widget.server[0].port[0],
          gapi: data.widget.server[0].gapi[0],
          ganalytics: data.widget.server[0].ganalytics[0],
          html5Mode: true,
          preUrl: '',
          base: '/'
        };
        process.title = conf.title;
        console.log(chalk.green(util.inspect(conf, false, null)));
        cb(conf);
      });
    });
}

module.exports = getConfig;
