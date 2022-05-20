// import '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import fetch from 'cross-fetch';

import catImages from './mockData/catImages.json';

// set fetch
global.fetch = fetch;

// msw server handlers
const handlers = [
	rest.get('https://www.random.org/integers/', (req, res, ctx) => {
		return res(ctx.text('10'));
	}),
	rest.get('https://api.thecatapi.com/v1/images/search', (req, res, ctx) => {
		//
		const limit = parseInt(req.url.searchParams.get('limit'));
		// console.log(limit);
		if (limit <= 10) {
			return res(ctx.json(catImages.slice(0, limit)));
		} else {
			const repeat = Math.floor(limit / 10);
			const remains = limit % 10;
			const repeatedResponse = Array(repeat)
				.fill(0)
				.reduce(acc => [...catImages, ...acc], catImages.slice(0, remains));
			// console.log(repeatedResponse);
			return res(ctx.json(repeatedResponse));
		}
	})
];

// create server instance
const server = setupServer(...handlers);

// Start server before each test suite.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests.
afterEach(() => server.resetHandlers());

// Stop server after each test suite.
afterAll(() => server.close());
