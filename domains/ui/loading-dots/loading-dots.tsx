import clsx from 'clsx';
import styles from './loading-dots.module.scss';

const LoadingDots = ({ className }: { className: string | undefined }) => {
  return (
    <span>
      <span className={clsx(styles.dots, className)} />
      <span className={clsx(styles.dots, styles.animateDelayFast, className)} />
      <span className={clsx(styles.dots, styles.animateDelaySlow, className)} />
    </span>
  );
};

export default LoadingDots;
