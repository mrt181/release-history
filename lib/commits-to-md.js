'use strict';

const util = require('util');

/**
 * @param {Array} commits
 * @param {Object} [opts]
 * @returns {String}
 */
const commitsToMd = (commits, opts = {}) => {

    const version = opts.version || '';
    let commitListMd = `\n\n###${version}\n`;

    console.log('---->', opts)

    commits.forEach(commit => {
        const includeStrings = opts.includeStrings || [];
        const excludeStrings = opts.excludeStrings || [];

        const hasIncludes = util.isArray(includeStrings) && (includeStrings.length > 0);

        let addCommit = !hasIncludes;

        for (let i = 0; i < excludeStrings.length; i++){
            if(commit.title.includes(excludeStrings[i])){
                addCommit = false;
                break;
            }
        }
        for (let i = 0; i < includeStrings.length; i++){
            if(commit.title.includes(includeStrings[i])){
                addCommit = true;
                break;
            }
        }
        if (addCommit) {
            commitListMd += `\n * ${commit.title} [${commit.hash.substr(0, 7)}](${commit.hash})`;
        }
    });
    return commitListMd;
};

module.exports = commitsToMd;
