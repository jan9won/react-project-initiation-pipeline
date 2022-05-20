import { store } from '../store';
import {
	increaseRandomNumber_helper,
	increaseRandomNumber
} from '../counterThunk';

describe('counterThunk', () => {
	it('increaseRandomNumber thunk increases 10 with existing action creators', async () => {
		await store.dispatch(increaseRandomNumber({ min: 10, max: 11 }));
		expect(store.getState().counter.count).toStrictEqual(10);
	});

	it('increaseRandomNumber_helper increases 10 with createAsyncThunk', async () => {
		await store.dispatch(increaseRandomNumber_helper({ min: 10, max: 11 }));
		expect(store.getState().counter.count).toStrictEqual(20);
	});
});
