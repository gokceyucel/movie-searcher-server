import app from '../index';
import chai from 'chai';
import { getKeywordFromAddress } from './util';

const expect = chai.expect;

describe('getKeywordFromUrl should get keyword from url', () => {
  const cases = [
    {
      url: 'http://my_movie_searcher.com/api/search?keyword=godfather&hede=hodo',
      expectedKeyword: 'godfather'
    },
    {
      url: 'https://my_movie_searcher.com/api/search?keyword=GALAXY&1=2',
      expectedKeyword: 'galaxy'
    },
    {
      url: 'http://my_movie_searcher.com/api/search?keyword=simpsons%20movie&some=other',
      expectedKeyword: 'simpsons movie'
    }
  ];

  cases.forEach((example) => {
    it(`should return "${example.expectedKeyword}" for "${example.url}"`, (done) => {
      const actualKeyword = getKeywordFromAddress(example.url);
      expect(example.expectedKeyword).to.equal(actualKeyword);
      done();
    });
  });
});
