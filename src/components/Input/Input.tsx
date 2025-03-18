import classNames from 'classnames';
import { InputHTMLAttributes, memo } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
}
export const Input = memo(({ className, ...rest }: InputProps) => {
	return <input className={classNames(styles.input, className)} {...rest} />;
});
