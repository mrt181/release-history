#! /usr/bin/env node

const util = require('util');
const args = require('args');

const getHistoryMd = require('../lib/get-history-md');
const shellEx = require('../lib/helpers/ex').shellEx;

args.option('dry-run', 'only log commands without executing them', false);
args.option('out', 'output file', 'History.md');
args.option('exclude-strings', 'excludes a commit if its title contains this string');
args.option('include-strings', 'excludes a commit if its title contains this string');
args.option('commit-base-url', 'set the remote url for linking to commits, e.g. https://github.com/stbaer/release-history/commits');

const flags = args.parse(process.argv);
const file = flags.o || 'History.md';
let includeStrings;
let excludeStrings;

flags.i && (includeStrings = util.isArray(flags.i) ? flags.i : [flags.i]);
flags.e && (excludeStrings = util.isArray(flags.e) ? flags.e : [flags.e]);

getHistoryMd({excludeStrings, includeStrings, url: flags.c})
    .then(str => {
        file && shellEx(`echo "${str}\n\n" > ${file}`, null, null, flags.d);
    });

