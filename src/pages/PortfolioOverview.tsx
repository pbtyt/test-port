import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddNewPortfolioModal } from '../components/AddNewPortfolioModal/AddNewPortfolioModal';
import { Button } from '../components/Button/Button';
import { Row } from '../components/Row/Row';
import { RowHeader } from '../components/Row/RowHeader';
import { usePortfolio } from '../hooks/usePortfolio';
import { deleteById } from '../store/portfolio.slice';
import { RootState } from '../store/store';
import styles from './PortfolioOverview.module.scss';

export function PortfolioOverview() {
	const { isConnected, getDataByID } = usePortfolio();

	const portfolioData = useSelector(
		(state: RootState) => state.portfolio.value
	);
	const dispatch = useDispatch();

	const [isOpenModal, setIsModalOpen] = useState(false);

	const handleOpenModal = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	const handleDeleteRow = useCallback((id: string) => {
		dispatch(deleteById({ id }));
	}, []);

	return (
		<>
			<header className={styles.header}>
				<h1>PORTFOLIO OVERVIEW</h1>
				<Button
					buttonText='Добавить'
					buttonColor='primary'
					style={{ padding: '10px 13px' }}
					onClick={handleOpenModal}
				/>
			</header>

			<main className={styles.main}>
				{!isConnected || portfolioData.length === 0 ? (
					<p className={styles.message}>
						Нет активов в вашем портфеле. Добавьте что-нибудь, чтобы начать!
					</p>
				) : (
					<>
						<RowHeader />

						{portfolioData.map(p => (
							<Row
								onClick={() => handleDeleteRow(p.id)}
								key={p.id}
								Active={p.id}
								Quantity={p.count}
								ChangeInHours={getDataByID(p.id)?.changeInHours}
								Price={p.price}
							/>
						))}
					</>
				)}
			</main>

			<AddNewPortfolioModal open={isOpenModal} onClose={handleCloseModal} />
		</>
	);
}
