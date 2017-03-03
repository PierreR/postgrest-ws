function createWebSocket(path) {
    var host = window.location.hostname;
    if(host == '') host = 'localhost';
    var uri = 'ws://' + host + ':3000' + path;

    return new WebSocket(uri);
}

function onMessage(event) {
    var p = $(document.createElement('p')).text(event.data);

    $('#messages').append(p);
    $('#messages').animate({scrollTop: $('#messages')[0].scrollHeight});
}

$(document).ready(function () {
    $('#join-form').submit(function () {
        $('#warnings').html('');
        var jwt = $('#jwt').val();
        var ws = createWebSocket('/' + jwt);

        ws.onopen = function() {
            alert("Connection ready, try sending a message in the field bellow.");
        };

        ws.onmessage = onMessage;

        $('#message-form').submit(function () {
          var text = $('#text').val();
          ws.send(text);
          $('#text').val('');
          return false;
        });

        return false;
    });
});
