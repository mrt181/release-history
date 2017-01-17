#! /usr/bin/env node

const util = require('util');
const getHistoryMd = require('./../lib/get-history-md');

const shellEx = require('../lib/helpers/ex').shellEx;
const args = require('args');

args.option('dry-run', 'only log commands without executing them', false);
args.option('out', 'output file', 'History.md');
args.option('excludeStrings', 'excludes a commit if its title contains this string');
args.option('includeStrings', 'excludes a commit if its title contains this string');

const flags = args.parse(process.argv);
const file = flags.o || 'History.md';
let includeStrings, excludeStrings;

flags.i && (includeStrings = util.isArray(flags.i) ? flags.i : [flags.i]);
flags.e && (excludeStrings = util.isArray(flags.e) ? flags.e : [flags.e]);

getHistoryMd({excludeStrings, includeStrings})
    .then((str) => {
        file && shellEx(`echo "${str}\n\n" > ${file}`, null, null, flags.d);
    });
