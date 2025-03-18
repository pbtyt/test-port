import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePortfolio } from '../../hooks/usePortfolio';
import { add } from '../../store/portfolio.slice';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Modal } from '../Modal/Modal';
import styles from './AddNewPortfolioModal.module.scss';

export const AddNewPortfolioModal = ({
	open,
	onClose,
}: {
	open?: boolean;
	onClose?: () => void;
}) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [count, setCount] = useState<string>('');
	const [selectedID, setSelectedID] = useState<string>('');
	const [price, setPrice] = useState<string>('');

	const dispatcher = useDispatch();

	const { isConnected, portfolio } = usePortfolio();

	const handleClick = useCallback((id: string, price: string) => {
		setSelectedID(id);
		const parsedPrice = price.replace(/[^0-9.]/g, '');
		setPrice(parsedPrice);
	}, []);

	const filteredData = useMemo(() => {
		return portfolio.filter(item =>
			item.active.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [portfolio, searchQuery]);

	const handleAdd = useCallback(() => {
		if (count == '') return;
		dispatcher(
			add({
				id: selectedID,
				count: parseInt(count),
				price: parseFloat(price),
			})
		);
	}, [selectedID, count]);

	return (
		<Modal
			modalWidth='400px'
			open={open}
			onClose={onClose}
			className={styles.content}
		>
			<Input
				onChange={e => setSearchQuery(e.target.value)}
				placeholder='Введите название...'
				style={{ padding: '8px 10px', borderRadius: '5px' }}
			/>

			{isConnected && (
				<div className={styles.coinsWrapper}>
					{filteredData.map(el => (
						<button
							className={styles.coin}
							key={el.active}
							onClick={() => handleClick(el.active, el.price)}
						>
							<div>{el.active}</div>
							<div>{el.price}</div>
							<div>{el.changeInHours}</div>
						</button>
					))}
				</div>
			)}

			{selectedID !== '' && (
				<div className={styles.selectedCoinWrapper}>
					{selectedID}
					<Input
						type='number'
						value={count}
						onChange={e => setCount(e.target.value)}
						placeholder='Введите количество...'
						style={{ padding: '8px 10px', borderRadius: '5px' }}
					/>

					<div className={styles.controls}>
						<Button
							onClick={handleAdd}
							buttonColor='primary'
							buttonText='Добавить'
							style={{ flexGrow: '1' }}
						/>
						<Button
							onClick={onClose}
							buttonColor='gray'
							buttonText='Отмена'
							style={{ flexGrow: '.4' }}
						/>
					</div>
				</div>
			)}
		</Modal>
	);
};
