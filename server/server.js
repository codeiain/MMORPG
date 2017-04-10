var UI = require('./Ui.js');
var ui = new UI();
var activeUsers = 0;


ui.createUI();

let logger = ui.getLogger();

var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

// Send current time to all connected clients
function sendTime() {
    io.emit('time', { time: new Date().toJSON() });
}


io.on('connection', function (socket) {
    activeUsers++;
    ui.setActiveUsers(activeUsers);
    socket.on('disconnect', function(){
        activeUsers--;
        ui.setActiveUsers(activeUsers);
    });
});

app.listen(3000);
logger.Info("Server listening on port 3000");

