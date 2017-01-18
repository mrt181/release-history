'use strict';

const taggedVersions = require('tagged-versions');

const getCommits = require('./get-commits');
const commitsToMd = require('./commits-to-md');

/**
 *
 * @param excludeStrings
 * @param includeStrings
 * @param url
 * @returns {Promise}
 */
const getHistoryString = ({excludeStrings, includeStrings, url}) =>
    new Promise((resolve, reject) => {
        taggedVersions.getList()
            .then(res => {
                if (!res || res.length === 0) {
                    console.log('No Tags found, nothing to do.');
                    process.exit(1);
                }

                const messages = [];
                const promises = [];
                res.forEach((tag, i) => {
                    const prev = i < res.length - 1 ? res[i + 1] : null;
                    const commitsPromise = getCommits(tag.hash, (prev && prev.hash))
                        .then(commits => {
                            messages[i] = commitsToMd(commits, {
                                version: tag.version, date: tag.date, excludeStrings, includeStrings, url
                            });
                        });
                    promises.push(commitsPromise);
                });

                Promise.all(promises)
                    .then(() => {
                        resolve(messages.join(''));
                    }, err => reject(err));
            });
    });

module.exports = getHistoryString;
