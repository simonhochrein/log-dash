import * as express from 'express';
import { setTimeout } from 'timers';
const app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
import * as path from 'path';
import * as fs from 'fs';

app.set('view engine', 'pug');
var settings = JSON.parse(process.argv[2]);

var files = settings.file;

var logChannels = {};

if(typeof files == "string") {
    files = [files];
}

var lastNames = files.map(function(file) {
    return path.basename(file);
})

app.use(express.static(__dirname+"/public"));

app.get('/', (req, res) => {
    res.render('index', {});
});

server.listen(settings.port);

files.forEach((file, key) => {
    logChannels[lastNames[key]] = [];
    if(fs.existsSync(file)) {
        var size = fs.statSync(file).size;
        fs.watchFile(file, {interval: 500}, function(data) {
            if(data.size < size) {
                size = 0;
            }
            if(data.size - size > 0) {
                var newStuff = fs.createReadStream(file, {start: size, end: data.size, encoding: 'utf8'});
                var buffer = "";
                newStuff.on('data', function(data) {
                    buffer+=data;
                });
                newStuff.on('end', function() {
                    io.sockets.emit('logs', {channel: lastNames[key], data: buffer});
                    if(logChannels[lastNames[key]].length == 100) {
                        logChannels[lastNames[key]].splice(0,1);
                        logChannels[lastNames[key]].push(buffer);
                    }
                    logChannels[lastNames[key]].push(buffer);                    
                    buffer = "";
                })
                size = data.size;
            }
        });
    }
});

io.on('connection', function (socket) {
    socket.emit('channels', lastNames);
    socket.on('loadLog', function(data) {
        socket.emit('loadLog', {logs: logChannels[data], channel: data});
    });
});
