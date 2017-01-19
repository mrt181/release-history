'use strict';

const util = require('util');
const dateFormat = require('dateformat');

/**
 * @param {Array} commits
 * @param {Object} [opts]
 * @returns {String}
 */
const commitsToMd = (commits, opts = {}) => {
    let commitListMd = '';
    commitListMd += opts.version ? `\n\n###Release ${opts.version}\n` : '';
    commitListMd += opts.date ? `>*${dateFormat(opts.date, 'longDate')}*\n` : '';

    commits.forEach(commit => {
        const includeStrings = opts.includeStrings || [];
        const excludeStrings = opts.excludeStrings || [];
        const hash = commit.hash;
        const commitUrl = opts.url && hash ? `[${hash.substr(0, 7)}](${opts.url}/${hash})` : '';
        const hasIncludes = util.isArray(includeStrings) && (includeStrings.length > 0);

        let addCommit = !hasIncludes;

        for (let i = 0; i < excludeStrings.length; i++) {
            if (commit.title.includes(excludeStrings[i])) {
                addCommit = false;
                break;
            }
        }
        for (let i = 0; i < includeStrings.length; i++) {
            if (commit.title.includes(includeStrings[i])) {
                addCommit = true;
                break;
            }
        }
        if (addCommit) {
            commitListMd += `\n * ${commit.title} ${commitUrl}`;
        }
    });
    return commitListMd;
};

module.exports = commitsToMd;
