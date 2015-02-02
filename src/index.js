var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');



var accounts = [
            { id: '0100-26-000001', balance: 1000 },
            { id: '0100-26-000002', balance: 1000 },
            { id: '0100-26-000003', balance: 1000 }
        ];

var app = express();
app.use(bodyParser.json());
app.use('/dist', express.static(__dirname + '/../dist'));
app.use(express.static(__dirname + '/public'));

app.get('/api/accounts', function(req, res) {
    res.json(accounts);
});

var server = app.listen(9999);

var io = require('socket.io')(server);

var connections = {};

io.on('connection', function(socket) {

    socket.on('disconnect', function() {
        clearInterval(connections[socket.id]);
        delete connections[socket.id];
    });

});

app.post('/api/transfer', function(req, res) {

    var a = _.find(accounts, { id: req.body.accountId });
    a.balance -= req.body.amount;

    // broadcasting to all, should only emit to those authorized to listen
    io.emit('accounts:financialTransaction', a);

    res.json(a);
});