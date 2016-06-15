// server-side javascript

var socket = io();

// listener, server emits 'connect', prompt user for username
socket.on('connect', function() {
    socket.emit('adduser', prompt("What is your user name?"));
});

// listener, server emits 'updatechat', update the chat body
socket.on('updatechat', function(username, data) {
    $('#messages').append('<b>' + username + ':</b> ' + data + '<br>');
});

// listener, server emits 'updateusers', update the activeNames list
socket.on('updateusers', function(data) {
    $('#users').empty();
    $.each(data, function(key, value) {
        $('#users').append('<div>' + key + '</div>');
    });
});

// when the client clicks 'send' or hits 'enter' on keyboard,
// tell server to execute 'sendchat' and send the message as a param,
// then refocus on message input box
$(function() {
    $('#sendButton').click(function() {
        var message = $('#message').val();
        $('#message').val('').focus();
        socket.emit('sendchat', message);
        $('#messages').scrollTop = $('#messages').scrollHeight;
    });

    $('#message').keypress(function(e) {
        if (e.which == 13) {
            $(this).blur();
            $('#sendButton').focus().click();
            $('#messages').scrollTop = $('#messages').scrollHeight;

        }
    });
});
