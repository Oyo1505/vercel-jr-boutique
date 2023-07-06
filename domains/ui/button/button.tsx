import clsx from 'clsx';
import { FC } from 'react';
import styles from './button.module.scss';

interface Props {
  color?: 'string';
  width?: number;
  height?: number;
  className?: string;
  text: string;
  onClick: any;
}
const Button: FC<Props> = ({ text, color, className, height, width, onClick }) => {
  return (
    <button
      className={clsx(styles.container, className)}
      onClick={onClick}
      style={{ backgroundColor: color, height, width }}
    >
      {text}
    </button>
  );
};

export default Button;
