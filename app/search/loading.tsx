import Grid from 'domains/grid/components/grid';
import styles from './loading.module.scss';
export default function Loading() {
  return (
    <Grid className={styles.grid}>
      {Array(12)
        .fill(0)
        .map((_, index) => {
          return <Grid.Item key={index} className={styles.item} />;
        })}
    </Grid>
  );
}
