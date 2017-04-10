"use strict";

var blessed = require('blessed')
    , contrib = require('blessed-contrib');
var screen = blessed.screen();
var pjson = require('./package.json');
var Utils = require("./utils.js");
var Logger = require("./logger.js");

module.exports = class UI {

    constructor() {
        this.screen = screen;
        this.activeUsers = 0;
        this.registeredUser = 0;
        this.utils = new Utils();
        this.log = null;
        this.lcdActive = null;
        this.map = null;
        this.cpuLine = null;
        this.tempLine = null;
        this.map = null;
        this.cpuUsage = {
            title: 'CPU %',
            style: { line: 'red' },
            x: [0],
            y: [0]
        };
        this.temperatures = {
            title: 'temperature',
            style: { line: 'red' },
            x: [0],
            y: [0]
        };
        this.startMeasure = this.utils.cpuAverage();
        this.mapMarker = [];
        this.logger = null;
    }

    createUI() {
        var grid = new contrib.grid({ rows: 12, cols: 12, screen: this.screen })
        this.lcdActive = grid.set(0, 0, 2, 2, contrib.lcd,
            {
                segmentWidth: 0.01 // how wide are the segments in % so 50% = 0.5
                , segmentInterval: 0.01 // spacing between the segments in % so 50% = 0.550% = 0.5
                , strokeWidth: 0.01 // spacing between the segments in % so 50% = 0.5
                , elements: 4 // how many elements in the display. or how many characters can be displayed.
                , display: 0 // what should be displayed before first call to setDisplay
                , elementSpacing: 4 // spacing between each element
                , elementPadding: 2 // how far away from the edges to put the elements
                , color: 'white' // color for the segments
                , label: 'Active users'
            });
        this.lcdActive.setDisplay(0);
        this.lcdRegistered = grid.set(0, 2, 2, 2, contrib.lcd,
            {
                segmentWidth: 0.01 // how wide are the segments in % so 50% = 0.5
                , segmentInterval: 0.01 // spacing between the segments in % so 50% = 0.550% = 0.5
                , strokeWidth: 0.01 // spacing between the segments in % so 50% = 0.5
                , elements: 4 // how many elements in the display. or how many characters can be displayed.
                , display: 0 // what should be displayed before first call to setDisplay
                , elementSpacing: 4 // spacing between each element
                , elementPadding: 2 // how far away from the edges to put the elements
                , color: 'white' // color for the segments
                , label: 'Registered users'
            });
        this.lcdBuld = grid.set(0, 4, 2, 3, contrib.lcd,
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
        this.cpuLine = grid.set(5, 8, 4, 4, contrib.line,
            {
                showNthLabel: 5
                , maxY: 100
                , label: 'CPU usage'
                , showLegend: true
                , legend: { width: 10 }
            })

        this.tempLine = grid.set(9, 8, 3, 4, contrib.line,
            {
                showNthLabel: 5
                , maxY: 100
                , label: 'Temperatures'
                , showLegend: true
                , legend: { width: 10 }
            })

        this.map = grid.set(2, 0, 10, 8, contrib.map, { label: 'User locations' })

        this.log = grid.set(0, 8, 5, 4, contrib.log,
            {
                fg: "green"
                , selectedFg: "green"
                , label: 'Server Log'
            })

        this.logger = new Logger(this.log);

        setInterval((function () {//wrap the function as object
            //after bind, "this" is loop refference
            this.updateCPU(this);
        }).bind(this), 1000);

        setInterval((function () {//wrap the function as object
            //after bind, "this" is loop refference
            this.updateTemp(this);
        }).bind(this), 1000);

        //setInterval(this.updateCPU, 1000);

    };

    updateCPU() {
        //
        var endMeasure = this.utils.cpuAverage();
        var idleDifference = endMeasure.idle - this.startMeasure.idle;
        var totalDifference = endMeasure.total - this.startMeasure.total;
        var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
        this.cpuUsage.x.push(this.utils.getTime());
        this.cpuUsage.y.push(percentageCPU);
        this.cpuLine.setData(this.cpuUsage);
        this.screen.render();
        //this.logger.Error("trest");
    }

    updateTemp() {
        this.temperatures.x.push(this.utils.getTime());
        this.temperatures.y.push(this.utils.getTemp());
        this.tempLine.setData(this.temperatures);
        this.screen.render();
    }


    setActiveUsers(number) {
        this.lcdActive.setDisplay(number);
        this.screen.render();
    }

    setRegisteredUsers(number) {
        this.lcdRegistered.setDisplay(number);
        this.screen.render();
    }

    setMapMarker(lon, lat) {
        this.map.clearMarkers();
        this.mapMarker.push({
            "lon": lon,
            "lat": lat,
            color: "red",
            char: "X"
        });
        this.logger.Debug(this.mapMarker.length);
        for (let x = 0; x < this.mapMarker.length; x++) {
            this.logger.Debug(this.mapMarker[x].lon);
            this.map.addMarker(this.mapMarker[x]);
        }
        this.screen.render();
    }
    getLogger() {
        return this.logger;
    }
}