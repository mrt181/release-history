import test from 'ava';
import commitsToMd from '../lib/commits-to-md';

const commitsFixture = [{
	title: 'Commit Title 1',
	hash: '1234567890'
}, {
	title: 'Commit Title 2',
	hash: '0987654321'
}];

test('convert commit objects', async t => {
	const md = await commitsToMd(commitsFixture);
	t.is(typeof md, 'string');
});

test('exclude strings', async t => {
	const md = await commitsToMd(commitsFixture, {
		excludeStrings: ['Title 1', 'Title 2']
	});
	t.is(md.includes('* '), false, md);
});

test('include strings', async t => {
	const md = await commitsToMd(commitsFixture, {
		includeStrings: ['Not there']
	});
	t.is(md.includes('* '), false, md);
});

test('include should be stronger than exclude', async t => {
	const md = await commitsToMd(commitsFixture, {
		excludeStrings: ['Title 1', 'Title 2'],
		includeStrings: ['Title 1']
	});
	t.is(md.includes('* '), true, md);
});
