#!/usr/bin/env node
import * as yargs from 'yargs';
import 'colors';

var argv = yargs
    .usage('Usage: $0 <command> [options]')
    .command('start', 'Start the server')
    .command('stop', 'Stop the server')
    .example('$0 start', 'Start server with a specified configuration file')
    .config({
        port: 8888,
        file: []
    })
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2017')
    .default(['h'])
    .argv;
var pm2 = require('pm2');

pm2.connect(function(err) {
    if (err) {
        console.error(err);
        process.exit(2);
    }
    switch(argv._[0]) {
        case 'start':
            pm2.start({
                script    : 'server.js',
                args: "'"+JSON.stringify(argv)+"'"
            }, function(err, apps) {
                pm2.disconnect();   // Disconnects from PM2
                if (err) throw err
            });
            break;
        case 'restart':
            pm2.restart({
                script    : 'server.js',
                args: "'"+JSON.stringify(argv)+"'"
            }, function(err, apps) {
                pm2.disconnect();   // Disconnects from PM2
                if (err) throw err
            });
            break;
        case 'status':
            pm2.describe('server', function(err, description) {
                if(description[0].pid !== 0) {
                    console.log("Running".green);
                } else {
                    console.log("Stopped".red);
                }
                pm2.disconnect();   // Disconnects from PM2
                if (err) throw err
            });
            break;
        case 'stop':
            pm2.stop('server', function(err, apps) {
                pm2.disconnect();   // Disconnects from PM2
                if (err) throw err
            });
            break;
    }
});