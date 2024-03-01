'use client';
import React from 'react';
import styles from './ariane.module.scss';
import Container from 'domains/ui/container/container';
import Link from 'next/link';
import useBreakpoints from 'domains/common/hooks/use-breakpoints';

interface Props {
  collection: string;
  produit: string;
}

const Ariane = ({ collection, produit }: Props) => {
  const { belowMd } = useBreakpoints();

  return (
    <>
      {!belowMd && (
        <Container>
          <div className={styles.ariane}>
            <Link href={`/${collection}`}>{collection}</Link> {'>'} {produit}
          </div>
        </Container>
      )}
    </>
  );
};
export default Ariane;
