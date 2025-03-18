import { PortfolioState } from './portfolio.slice';

export const saveToLocalStorage = <T>(data: T[]): void => {
	try {
		const serialized = JSON.stringify(data);
		localStorage.setItem('AppData', serialized);
	} catch (e) {
		console.warn('Storage failed:', e);
	}
};

export const preloadedState = (): { portfolio: PortfolioState } => {
	try {
		const saved = localStorage.getItem('AppData');
		return {
			portfolio: {
				value: saved ? JSON.parse(saved) : [],
			},
		};
	} catch (e) {
		return {
			portfolio: {
				value: [],
			},
		};
	}
};
