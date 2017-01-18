#! /usr/bin/env node

const util = require('util');
const remoteUrl = require('remote-origin-url');
const args = require('args');

const getHistoryMd = require('./../lib/get-history-md');

const shellEx = require('../lib/helpers/ex').shellEx;

args.option('dry-run', 'only log commands without executing them', false);
args.option('out', 'output file', 'History.md');
args.option('exclude-strings', 'excludes a commit if its title contains this string');
args.option('include-strings', 'excludes a commit if its title contains this string');
args.option('commit-base-url', 'set the remote url for linking to commits, defaults to git-remote-url/commit');

const flags = args.parse(process.argv);
const file = flags.o || 'History.md';
let includeStrings, excludeStrings;

flags.i && (includeStrings = util.isArray(flags.i) ? flags.i : [flags.i]);
flags.e && (excludeStrings = util.isArray(flags.e) ? flags.e : [flags.e]);

remoteUrl( (err, url) => {
    getHistoryMd({excludeStrings, includeStrings, url: (flags.c || url + 'commit')})
        .then((str) => {
            file && shellEx(`echo "${str}\n\n" > ${file}`, null, null, flags.d);
        });
});



