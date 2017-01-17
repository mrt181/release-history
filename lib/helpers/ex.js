const shell = require('shelljs');
const log = require('./log');

/**
 *
 * @param {String} cmd
 */
const logCommand = cmd => log(`\nExecuting command: ${cmd}`, 'yellow');

/**
 *
 * @param {String} command - the shell command to execute
 * @param [sjsOpts] - shelljs options
 * @param [showCommand=true] - print the command
 * @param dry
 * @returns {Object}
 */
const shellEx = (command, sjsOpts = {silent: true}, showCommand = true, dry = false) => {
    (showCommand || dry) && logCommand(command);

    if (dry) {
        return {
            stdout: ''
        };
    }
    return shell.exec(command, sjsOpts);
};


module.exports = {
    shellEx
};
