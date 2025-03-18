import { useCallback, useEffect, useState } from 'react';
import { wsManager } from '../service/WebSocketManager';
import { type PortfolioType } from '../types/portfolio.type';
import { formatNumber } from '../utils/format';

export const usePortfolio = () => {
	const [portfolio, setPortfolio] = useState<Array<PortfolioType>>([]);
	const [isConnected, setIsConnected] = useState<boolean>(false);

	useEffect(() => {
		const handleData = (data: any) => {
			const totalPortfolioValue = 100000;

			setPortfolio(prev => {
				const newData: PortfolioType = {
					active: data.s,
					quantity: formatNumber(data.v, 4),
					price: `$${formatNumber(data.c, 2)}`,
					totalCost: `$${formatNumber(data.q, 2)}`,
					changeInHours: `${data.P}%`,
					portfolioPercentage:
						((parseFloat(data.q) / totalPortfolioValue) * 100).toFixed(2) + '%',
				};

				const index = prev.findIndex(item => item.active === data.s);
				return index === -1
					? [...prev, newData]
					: prev.map(item => (item.active === data.s ? newData : item));
			});
		};

		const handleStatus = (connected: boolean) => {
			setIsConnected(connected);
		};

		wsManager.subscribeToData(handleData);
		wsManager.subscribeToStatus(handleStatus);

		return () => {
			wsManager.unsubscribeFromData(handleData);
			wsManager.unsubscribeFromStatus(handleStatus);
		};
	}, []);

	const getDataByID = useCallback(
		(activeId: string): PortfolioType | undefined => {
			for (const element of portfolio) {
				if (element.active === activeId) return element;
			}
		},
		[portfolio]
	);

	return { portfolio, isConnected, getDataByID };
};
export type { PortfolioType };
