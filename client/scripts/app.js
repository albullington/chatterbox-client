// YOUR CODE HERE:

var App = function() {
  this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
};

App.prototype.init = function() {
  var context = this;
    $('.getposts').on('click', function() {
      context.fetch('http://parse.sfm8.hackreactor.com/chatterbox/classes/messages');
    });

    $('#send .submit').on('submit', function() {
      context.handleSubmit();
    });
};

App.prototype.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
}

App.prototype.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    //data: 'data',
    //contentType: 'application/json',
    success: function (data) {
      var messages = data.results;
      console.log('chatterbox: Message received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message', data);
    }
  });
}

App.prototype.clearMessages = function() {
  $('#chats').html('');
}

App.prototype.renderMessage = function(message) {
  $('#chats').append('<div class=' + message.username + ' ' + message.roomname + ' id="chat"></div>')
  $('#chat').append('<span class =' + message.username + '>' + message.username + ': </span><br>');
  $('#chat').append('<span class>' + message.text + '</span>');
  this.handleUsernameClick();
}

App.prototype.renderRoom = function(room) {
  $('#roomSelect').append('<option value=' + room + '>' + room + '</option>')
}

App.prototype.handleUsernameClick = function() {
}

App.prototype.handleSubmit = function() {
    var message = {
      username: 'test',
      text: $('#message').val(),
      roomname: 'test'
    }
    this.send(message);
}

var app = new App();
$(document).ready(function() {
  app.init();
})
