// YOUR CODE HERE:
var App = function() {
  this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  this.time = new Date(0);
  this.rooms = {};
};

App.prototype.init = function() {
  var context = this;
    context.fetch();
    
    $('.submit').on('click', function() {
      console.log('test')
      context.handleSubmit();
    });
    
    $('.getposts').on('click', function() {
      context.fetch();
    })
    
    $('#roomSelect').on('change', function() {
      var roomFilter = '.' + this.value;
      console.log(roomFilter);
      $('div').filter('#chat').hide();
      $('div').filter(roomFilter).show();
      //$('#chat').hide();
      // $('#chat').filter(function() {
      //   return $('.test')}).show();
      
    })
};

App.prototype.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('message', data);
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
}

App.prototype.fetch = function() {
  var context = this;
  
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    // contentType: 'application/json; charset=utf-8',
    data: {'order': '-createdAt'},
    // dataType: 'application/json',
    success: function (data) {
      var messages = data.results;
      // sort on createdAt
      for (var i = messages.length - 1; i > 0; i--) {
        var currentDate = new Date(messages[i]['createdAt']);
        if (currentDate > context.time) {
          context.renderMessage(messages[i]);
        }
        
        if (!(messages[i]['roomname'] in context.rooms)) {
          context.rooms[messages[i]['roomname']] = messages[i]['roomname'];
          context.renderRoom(messages[i]['roomname']);
        }
      }
      context.time = new Date(messages[0]['createdAt']);
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
  var context = this;
  $('#chats').prepend('<div class="' + encodeURIComponent(message.username) + ' ' + message.roomname + '" id="chat"><span class>' + _.escape(message.username) + ': ' + _.escape(message.text) + '</span></div>')
  this.handleUsernameClick();
}

App.prototype.renderRoom = function(room) {
  $('#roomSelect').append('<option value=' + room + '>' + _.escape(room) + '</option>')
}

App.prototype.handleUsernameClick = function() {
  console.log('test')
}

App.prototype.handleSubmit = function() {
  var context = this;
    var message = {
      username: window.location.search.slice(10),
      text: $('#message').val(),
      roomname: $('#roomSelect').val()
    }
  context.send(message);
}

var app = new App();
$(document).ready(function() {

  app.init();
})
