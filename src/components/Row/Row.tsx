import { useSelector } from 'react-redux';
import { usePortfolio } from '../../hooks/usePortfolio';
import { RootState } from '../../store/store';
import styles from './Row.module.scss';

interface IRow {
	Active: string;
	Quantity: number;
	Price?: number;
	TotalCost?: string;
	ChangeInHours?: string;

	onClick?: () => void;
}

export function Row({
	Active = '',
	Quantity = 0,
	Price = 0,
	TotalCost = '',
	ChangeInHours = '',
	onClick,
}: IRow) {
	const shouldCalculate = Active !== '' && Quantity > 0 && Price > 0;

	const portfolioAssets = useSelector(
		(state: RootState) => state.portfolio.value
	);

	const asset = portfolioAssets.find(item => item.id === Active);
	if (!asset) return null;

	const { getDataByID } = usePortfolio();

	const pPrice = getDataByID(Active)?.price;
	if (!pPrice) return null;

	const parsePrice = parseFloat(pPrice.replace(/[^0-9.]/g, ''));

	const totalPortfolioValue = portfolioAssets.reduce(
		(sum, item) => sum + item.count * parsePrice,
		0
	);

	const assetValue = asset.count * asset.price;

	const portfolioPerc =
		totalPortfolioValue > 0 ? (assetValue / totalPortfolioValue) * 100 : 0;

	return (
		<button className={styles.row} onClick={onClick}>
			<div className={styles.rowField}>{Active}</div>
			<div className={styles.rowField}>{Quantity}</div>
			<div className={styles.rowField}>{pPrice}</div>
			<div className={styles.rowField}>
				{shouldCalculate ? `$${(parsePrice * Quantity).toFixed(2)}` : TotalCost}
			</div>
			<div className={styles.rowField}>{ChangeInHours}</div>
			<div className={styles.rowField}>{portfolioPerc.toFixed(0)}%</div>
		</button>
	);
}
