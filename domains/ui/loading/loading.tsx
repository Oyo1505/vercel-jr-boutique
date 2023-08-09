'use client';
import { FC } from 'react';
import styles from './loading.module.scss';
const Loading: FC = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
};

export default Loading;
