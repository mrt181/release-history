import test from 'ava';
import getCommits from '../lib/get-commits';

test('get from hash', async t => {
    const commits = await getCommits(
        '022425e608e58c82bf258e81d4d4d96b3ccd0d06',
    );
    t.is(commits.length, 3, 'should get 3 commits');
});

test('from hash to hash', async t => {
    const commits = await getCommits(
        'd5cbdf877c30c85b051bbb2835f1da3beea84b4b',
        '1baa0fcb09d88d426ddde996a3ac5167bb053ca3'
    );
    t.is(typeof commits[0], 'object');
    t.is(commits.length, 2, 'should get 3 commits');
});
