'use strict';

const getCommits = require('./lib/get-commits');
const commitsToMd = require('./lib/commits-to-md');
const getHistory = require('./lib/get-history-md');

module.exports = {getCommits, commitsToMd, getHistory};
