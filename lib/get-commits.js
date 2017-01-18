'use strict';

const path = require('path');
const gitCommits = require('git-commits');

/**
 * fromHash..toHash -> newer..older
 *
 * @param {String} [fromHash]
 * @param {String} [toHash]
 * @returns {Promise<Array>}
 */
const getCommits = (fromHash, toHash) =>
    new Promise((resolve, reject) => {
        const commits = [];
        const gitPath = path.join(process.cwd(), '.git');

        let toReached = false;
        let fromReached = !fromHash;

        gitCommits(gitPath).on('data', commit => {
            if (fromReached || fromHash === commit.hash) {
                fromReached = true;
            }
            if (!fromReached || toReached) {
                return;
            }

            commits.push(commit);

            if (toHash === commit.hash) {
                toReached = true;
            }
        })
            .on('end', () => resolve(commits))
            .on('error', () => {
                return reject(new Error('getting commits failed'));
            });
    });

module.exports = getCommits;
