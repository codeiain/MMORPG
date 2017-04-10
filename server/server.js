var server = require('http').createServer();
var io = require('socket.io')(server);
var blessed = require('blessed')
    , contrib = require('blessed-contrib');
var screen = blessed.screen();
var pjson = require('./package.json');
var Utils = require("./utils.js");
var utils = new Utils();

var log;
var lcdActive;
var map;
var cpuLine;
var cpuUsage = {
    title: 'CPU %',
    style: { line: 'red' },
    x: [0],
    y: [0]
};
var ActiveUsers = 1234;
var RegisteredUsers = 0;
var startMeasure = utils.cpuAverage();

function createUI() {

    var grid = new contrib.grid({ rows: 12, cols: 12, screen: screen })

    lcdActive = grid.set(0, 0, 2, 2, contrib.lcd,
        {
            segmentWidth: 0.01 // how wide are the segments in % so 50% = 0.5
            , segmentInterval: 0.01 // spacing between the segments in % so 50% = 0.550% = 0.5
            , strokeWidth: 0.01 // spacing between the segments in % so 50% = 0.5
            , elements: 4 // how many elements in the display. or how many characters can be displayed.
            , display: ActiveUsers // what should be displayed before first call to setDisplay
            , elementSpacing: 4 // spacing between each element
            , elementPadding: 2 // how far away from the edges to put the elements
            , color: 'white' // color for the segments
            , label: 'Active users'
        });

    lcdRegistered = grid.set(0, 2, 2, 2, contrib.lcd,
        {
            segmentWidth: 0.01 // how wide are the segments in % so 50% = 0.5
            , segmentInterval: 0.01 // spacing between the segments in % so 50% = 0.550% = 0.5
            , strokeWidth: 0.01 // spacing between the segments in % so 50% = 0.5
            , elements: 4 // how many elements in the display. or how many characters can be displayed.
            , display: RegisteredUsers // what should be displayed before first call to setDisplay
            , elementSpacing: 4 // spacing between each element
            , elementPadding: 2 // how far away from the edges to put the elements
            , color: 'white' // color for the segments
            , label: 'Registered users'
        });
    lcdBuld = grid.set(0, 4, 2, 3, contrib.lcd,
        {
            segmentWidth: 0.01 // how wide are the segments in % so 50% = 0.5
            , segmentInterval: 0.01 // spacing between the segments in % so 50% = 0.550% = 0.5
            , strokeWidth: 0.01 // spacing between the segments in % so 50% = 0.5
            , elements: 6 // how many elements in the display. or how many characters can be displayed.
            , display: pjson.version // what should be displayed before first call to setDisplay
            , elementSpacing: 4 // spacing between each element
            , elementPadding: 2 // how far away from the edges to put the elements
            , color: 'white' // color for the segments
            , label: 'Current version'
        })
    lcdBuld.setDisplay(pjson.version);
    lcdRegistered.setDisplay(RegisteredUsers);
    map = grid.set(2, 0, 10, 8, contrib.map, { label: 'User locations' })

    log = grid.set(0, 8, 5, 4, contrib.log,
        {
            fg: "green"
            , selectedFg: "green"
            , label: 'Server Log'
        })

    cpuLine = grid.set(5, 8, 4, 4, contrib.line,
        {
            showNthLabel: 5
            , maxY: 100
            , label: 'CPU usage'
            , showLegend: true
            , legend: { width: 10 }
        })

    var tempLine = grid.set(9, 8, 3, 4, contrib.line,
        {
            showNthLabel: 5
            , maxY: 100
            , label: 'Temperatures'
            , showLegend: true
            , legend: { width: 10 }
        })

}

function updateUI() {
    /*map.addMarker({ "lon": "-79.0000", "lat": "37.5000", color: "red", char: "X" });
    lcdActive.setDisplay(ActiveUsers);
    log.log("new log line")*/
    setInterval(updateCPU, 1000);
    updateCPU();
};

function updateCPU() {
    var endMeasure = utils.cpuAverage();

    var idleDifference = endMeasure.idle - startMeasure.idle;
    var totalDifference = endMeasure.total - startMeasure.total;

    var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

    cpuUsage.x.push(utils.getTime());
    cpuUsage.y.push(percentageCPU);

    cpuLine.setData(cpuUsage);

}

createUI();
updateUI();


screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
});

screen.render();