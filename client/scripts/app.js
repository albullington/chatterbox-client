// YOUR CODE HERE:

var App = function() {
};

App.prototype.init = function() {
  $(document).ready(function() {
    
    $('.getposts').on('click', function() {
      App.prototype.fetch('http://parse.sfm8.hackreactor.com/chatterbox/classes/messages');
    });
    
    $('.submit').on('click', function() {
      App.prototype.handleSubmit()
    });
  })
};

App.prototype.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
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

App.prototype.fetch = function(url) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: url,
    type: 'GET',
    //data: 'data',
    //contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received');
      return data;
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
  $('#chat').append('<span class =' + username + '>' + username + '</span>');
}

App.prototype.renderRoom = function(room) {
  $('#roomSelect').append('<option value=' + room + '>' + room + '</option>')
}

App.prototype.handleUsernameClick = function() {
}

App.prototype.handleSubmit = function(message) {
    var message = {
      username: 'test',
      text: $('#message').val(),
      roomname: 'test'
    }
    console.log(message);
    App.prototype.send(message);
}

var app = new App();
app.init();

