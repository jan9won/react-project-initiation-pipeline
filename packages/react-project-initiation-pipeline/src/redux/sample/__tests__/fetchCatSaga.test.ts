import fetchCatSaga, { fetchCat } from '../fetchCatSaga';
import { fetchCatImages } from '../../../apis/sample/fetchCatImages';
import { type catType, fetchRequested } from '../catSlice';
import { store } from '../store';
import { put, call, fork, takeLatest } from 'redux-saga/effects';

describe('fetchCatSaga', function () {
	it('requests and parses API response (json mock)', async () => {
		const catImages = (await fetchCatImages(12)) as catType[];
		expect(catImages[10].id).toStrictEqual('688');
		expect(catImages[0].id).toStrictEqual('688');
	});
	const gen = fetchCatSaga();
	it('handles fetchCat success', async () => {
		expect(gen.next(10).value).toStrictEqual(
			takeLatest(fetchRequested(10).type, fetchCat)
		);
	});
	// it('handles fetchCat error', async () => {
	// 	expect(gen.throw('Error').value).toStrictEqual('Error');
	// });
});
