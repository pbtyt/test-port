import { configureStore } from '@reduxjs/toolkit';
import portfolioSlice from './portfolio.slice';
import { preloadedState } from './utils';

export const store = configureStore({
	preloadedState: preloadedState(),
	reducer: {
		portfolio: portfolioSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
