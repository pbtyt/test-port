import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { saveToLocalStorage } from './utils';

type PayloadType = {
	id: string;
	count: number;
	price: number;
};

type PayloadIDType = Pick<PayloadType, 'id'>;

export interface PortfolioState {
	value: PayloadType[];
}

const initialState: PortfolioState = {
	value: [],
};

export const portfolioSlice = createSlice({
	name: 'portfolio',
	initialState,

	reducers: {
		add: (state, action: PayloadAction<PayloadType>) => {
			const index = state.value.findIndex(
				item => item.id === action.payload.id
			);

			if (index !== -1) {
				state.value[index] = action.payload;
			} else {
				state.value.push(action.payload);
			}

			saveToLocalStorage<PayloadType>(state.value);
		},

		deleteById: (state, action: PayloadAction<PayloadIDType>) => {
			const index = state.value.findIndex(
				item => item.id === action.payload.id
			);

			if (index === -1) return;

			state.value.splice(index, 1);

			saveToLocalStorage(state.value);
		},
	},
});

export const { add, deleteById } = portfolioSlice.actions;

export default portfolioSlice.reducer;
