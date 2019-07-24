$(function () {
    
    var socket = io();
    
    
    var button = $('#submit');
    var message = $('#currentMessage');
    var user = $('#currentUser');
    var clients = $('#clients');
    var feedback = $('#feedback');
    var allUsers = $('#allUsers');
    
    
    socket.on("new_message", (data) => {
        
        var chat = $('<div></div>');
            chat.addClass('chat');

        var currentUser = $("<h1></h1>");
            currentUser.addClass('user');
            currentUser.html(data.user + ": ");
        
        var currentMessage = $('<span></span>');
            currentMessage.addClass('message');
            currentMessage.html(" " + data.message);

            
        chat.append(currentUser);
        chat.append(currentMessage);
        

        clients.append(chat);
        
	})
    
    socket.on('typing', (data) => {
		feedback.html("<h5>" + data.user + " is typing a message..." + "</h5>")
	})
    
    socket.on('notTyping', (data) => {
		feedback.html("");
         
     })
    
     socket.on('update_users', (data) => {
        var all = data.users;
        console.log(all);
	})
    
    message.bind("focusin", () => {
		socket.emit('typing')
	})
    
    message.bind("focusout", () => {
		socket.emit('notTyping')
	})
    

    socket.on('disconnect', (data) => {
        console.log(data.user + "disconnected");
	})

    
    
    button.click(function(){
                
    if(message.val() != "") {    
        if(user.val() == "") {
            
            socket.emit('new_message', {message : message.val()});
            message.val("");
            
        }  else {
            
            socket.emit('new_user', {user: user.val(), message : message.val()})
            message.val("");
        }
        
    }
	});

});
