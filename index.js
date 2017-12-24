#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const path = require('path');
require("colors");
var pm2 = require('pm2');
var argv = yargs
    .usage('Usage: $0 <command> [options]')
    .command('start', 'Start the server')
    .command('status', 'Current status of the server')
    .command('stop', 'Stop the server')
    .command('restart', 'Restart log server')
    .example('$0 start --file /var/log/apache2/error.log', 'Start server with specified log')
    .config({
        port: 8888,
        file: []
    })
    .demandCommand(1, 'A command {start,status,stop,restart} is required')
    .demandOption('file', 'The file parameter is required')
    .option('port', {
        alias: 'p',
        describe: 'The port to listen on'
    })
    .number('port')
    .alias('file', 'f')
    .help('h')
    .alias('help', 'h')
    .version('0.0.2')
    .epilog('Copyright 2017')
    .argv;
if (argv._[0]) {
    pm2.connect(function (err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        switch (argv._[0]) {
            case 'start':
                console.log("STARTING...".blue);
                pm2.start({
                    script: path.join(__dirname, 'server.js'),
                    args: "'" + JSON.stringify(argv) + "'",
                    cwd: process.cwd()
                }, function (err, apps) {
                    console.log("STARTED".green);
                    pm2.disconnect();
                    if (err)
                        throw err;
                });
                break;
            case 'restart':
                console.log("RESTARTING...".blue);
                pm2.restart({
                    script: path.join(__dirname, 'server.js'),
                    args: "'" + JSON.stringify(argv) + "'",
                    cwd: process.cwd()
                }, function (err, apps) {
                    console.log("STARTED".green);
                    pm2.disconnect();
                    if (err)
                        throw err;
                });
                break;
            case 'status':
                pm2.describe('server', function (err, description) {
                    switch (description[0].pm2_env.status) {
                        case 'errored':
                        case 'stopped':
                            console.log(description[0].pm2_env.status.toUpperCase().red);
                            break;
                        case 'online':
                            console.log(description[0].pm2_env.status.toUpperCase().green);
                            break;
                    }
                    pm2.disconnect();
                    if (err)
                        throw err;
                });
                break;
            case 'stop':
                console.log("STOPPING...".blue);
                pm2.stop('server', function (err, apps) {
                    console.log("STOPPED".red);
                    pm2.disconnect();
                    if (err)
                        throw err;
                });
                break;
        }
    });
}
