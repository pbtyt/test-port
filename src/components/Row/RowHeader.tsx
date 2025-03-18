import classNames from 'classNames';
import styles from './Row.module.scss';

export function RowHeader() {
	return (
		<div className={classNames(styles.row, styles.base)}>
			<div className={styles.rowField}>Актив</div>
			<div className={styles.rowField}>Количество</div>
			<div className={styles.rowField}>Цена</div>
			<div className={styles.rowField}>Общая стоимость</div>
			<div className={styles.rowField}>Изм. за 24 ч.</div>
			<div className={styles.rowField}>% портфеля</div>
		</div>
	);
}
