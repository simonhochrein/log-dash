$(function() {
    var channels = {};
    function getHash() {
        return location.hash.slice(1, location.hash.length);
    }
    function rowTemplate(text) {
        return $("<tr><td>"+text+"</td></tr>");
    }
    var socket = io();
    if(getHash() == "") {
        $('.not-selected').show();
    } else {
        $('.not-selected').hide();
    }
    $('.log-title').text(getHash());
    socket.on('channels', function (data) {
        $('.channel').remove();
        data.forEach(function(channel) {
            channels[channel] = [];
            $('.channels').append('<a class="list-group-item channel" href="#'+channel+'">'+channel+'</a>');
            socket.emit('loadLog', channel);
        });
    });
    socket.on('loadLog', function(data) {
        channels[data.channel] = data.logs;
        console.log(data);
        if(data.channel == getHash()) {
            for(var i = 0; i < data.logs.length; i++) {
                $('.logs tbody').append(rowTemplate(data.logs[i]));
            }
            document.body.scrollTop = document.body.scrollHeight;            
        }
    });
    socket.on('logs', function(data) {
        channels[data.channel].push(data.data);
        if(data.channel == getHash()) {
            $('.logs tbody').append(rowTemplate(data.data));
            document.body.scrollTop = document.body.scrollHeight;
        }
    });
    window.addEventListener('hashchange', function() {
        $('.logs tbody').empty();
        if(getHash() == "") {
            $('.not-selected').show();
            $('.logs').hide();
        } else {
            $('.not-selected').hide();
            $('.logs').show();
        }
        var hash = getHash();
        $('.log-title').text(hash);
        if(hash !== "") {
            var length = channels[hash].length;
            if(length > 100) {
                for(var i = channels[hash].length - 100; i < channels[hash].length; i++) {
                    $('.logs tbody').append(rowTemplate(channels[hash][i]));
                    document.body.scrollTop = document.body.scrollHeight;
                }
            } else {
                for(var i = 0; i < channels[hash].length; i++) {
                    $('.logs tbody').append(rowTemplate(channels[hash][i]));
                    document.body.scrollTop = document.body.scrollHeight;
                }
            }
        }
    });
})