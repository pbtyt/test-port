import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { CSSProperties, memo, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useOutside } from '../../hooks/useOutside';
import styles from './Modal.module.scss';

interface ModalProps {
	open?: boolean;
	onClose?: () => void;
	modalWidth: string;
	attachmentPos?: 'left' | 'right';
	alignPos?: 'center' | 'top' | 'down';
	style?: CSSProperties;
	className?: string;
}

export const Modal = memo(
	({
		open,
		onClose,
		modalWidth,
		attachmentPos = 'left',
		alignPos = 'center',
		style,
		className,

		children,
	}: PropsWithChildren<ModalProps>) => {
		const { ref: modalRef } = useOutside(true, onClose);

		return createPortal(
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						style={style}
						className={classNames(
							styles.modalOverlay,
							styles[`${attachmentPos}Attach`]
						)}
					>
						<motion.div
							initial={{ y: -25 }}
							animate={{ y: 0 }}
							exit={{ y: 25 }}
							className={classNames(
								styles.modalWrapper,
								className,
								styles[`${alignPos}Align`]
							)}
							style={{ width: modalWidth }}
							ref={modalRef}
						>
							{children}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>,
			document.getElementById('modal-root')!
		);
	}
);
