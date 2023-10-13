import LoadingDots from 'domains/ui/loading/loading';
import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.container}>
      <LoadingDots />
    </div>
  );
}
