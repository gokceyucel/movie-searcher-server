import { URL } from 'url';

const getKeywordFromAddress = (urlString) => {
	let keyword = '';
	try {
		const url = new URL(urlString);
		keyword = url.searchParams.get('keyword').toLowerCase();
	} catch (ex) {

	} finally {
		return keyword;
	}
};

const cacheKeyGeneratorFromUrl = (url) => {
	return 'HTTP://MY_MOVIE_SEARCHER.COM' + url;
};

export {
	getKeywordFromAddress,
	cacheKeyGeneratorFromUrl
};
