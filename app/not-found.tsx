import Link from 'next/link';
import styles from './not-found.module.scss';
import Image from 'next/image';
import emptyPanier from '../public/images/page-acceuil/Qualité.png';

export default async function NotFound() {
  return (
    <div className={styles.emptyCart}>
      <p className={styles.phrase}>Une erreur est survenue</p>
      <Image src={emptyPanier} alt="empty-apnier" />
      <Link href={'/'} className={styles.button}>
        Retour à la boutique
      </Link>
    </div>
  );
}
