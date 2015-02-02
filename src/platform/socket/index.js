
var socket = require('socket.io-client')('http://localhost:9999');

socket.on('connect', function() {

});

socket.on('disconnect', function() {

});

var instance = {};
    
instance.addEventHandler = function(namespace, eventName, handler) {
    socket.on(namespace + ':'+ eventName, handler.bind())
};

module.exports = instance;