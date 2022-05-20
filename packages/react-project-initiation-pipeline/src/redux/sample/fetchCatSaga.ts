import { PayloadAction, AnyAction } from '@reduxjs/toolkit';
import {
	call,
	put,
	takeEvery,
	takeLatest,
	debounce,
	CallEffect,
	PutEffect
} from 'redux-saga/effects';
import { fetchCatImages } from '../../apis/sample/fetchCatImages';
import { fetchRequested, fetchFailed, fetchSucceed, catType } from './catSlice';

export function* fetchCat(
	action: PayloadAction<number>
): Generator<
	CallEffect<catType[] | Error> | PutEffect<AnyAction>,
	void,
	catType[]
> {
	try {
		const response = yield call(fetchCatImages, action.payload);
		yield put(fetchSucceed(response));
	} catch (e) {
		console.log(e);
		yield put(fetchFailed());
	}
}

function* fetchCatSaga() {
	yield takeLatest(fetchRequested(0).type, fetchCat);
}

export default fetchCatSaga;
