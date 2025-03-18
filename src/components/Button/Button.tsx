'use client';

// import { getSize } from '@/shared/utils/getElementSize';
import classNames from 'classNames';
import {
	ButtonHTMLAttributes,
	CSSProperties,
	PropsWithChildren,
	useRef,
	useState,
} from 'react';
import { getSize } from '../../utils/getElementSize';
import styles from './Button.module.scss';

type colorType = 'primary' | 'dark' | 'gray' | 'transparent';
const buttonColors: Record<colorType, string> = {
	primary: 'linear-gradient(26.57deg, #3c1a70 0%, rgba(93, 14, 245, 0.83))',
	dark: '#1b1a1d',
	gray: 'rgba(139,136,146,.32)',
	transparent: 'transparent',
};

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	buttonColor?: colorType;
	buttonText?: string;
	className?: string;
	style?: CSSProperties;
}

export function Button({
	buttonColor = 'primary',
	buttonText,
	className,
	style,
	children,
	...rest
}: PropsWithChildren<IButton>) {
	const [buttonSize, setButtonSize] = useState<number>(0);

	const buttonSizeStyle = {
		'--button-size': `${buttonSize + 10}px`,
	} as CSSProperties;

	const buttonRef = useRef(null);
	return (
		<button
			ref={buttonRef}
			className={classNames(className, styles.button)}
			style={{
				background: buttonColors[buttonColor],
				...buttonSizeStyle,
				...style,
			}}
			onMouseOver={() => {
				if (!buttonRef.current) return;
				setButtonSize(getSize(buttonRef.current).width);
			}}
			{...rest}
		>
			<div className={styles.buttonBorder}></div>
			{children}
			{buttonText && <span>{buttonText}</span>}
		</button>
	);
}
