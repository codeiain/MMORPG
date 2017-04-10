"use strict";
var colors = require('colors/safe');

module.exports = class Logger {
    constructor(logger) {
        this.logger = logger;
    }

    Error(message) {
        this.logger.log(colors.red('Error: ' + message));
    }

    Info(message) {
        this.logger.log(colors.green("Info: " + message));
    }

    Debug(message) {
        this.logger.log(colors.blue("Debug: " + message));
    }

}