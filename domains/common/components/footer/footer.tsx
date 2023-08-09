import Image from 'next/image';
import logoColissimo from '../../../../public/images/diver/799px-Colissimo_Logo.svg_.png';
import logoStripe from '../../../../public/images/diver/paiment.png';
import styles from './footer.module.scss';

export default async function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.shippingAndPayment}>
        <div>
          <a href="https://www.laposte.fr/tarif-colissimo">
            <Image src={logoColissimo} className={styles.logoColissimo} alt="colissimo" />
          </a>
        </div>
        <div className={styles.logoStripe}>
          <span>Paiments sécurisés : </span>
          <Image
            src={logoStripe}
            className={styles.logo}
            alt="stripe"
            height={30}
            quality={80}
            loading="lazy"
          />
        </div>
      </div>
      <div className={styles.pages}>
        {/* <Link href='/mention-legales'>Mention légales / </Link>
        <Link href='#'>Conditions Générales de Ventes / </Link>
        <Link href='#'>Politique de Confidentialité</Link> */}
      </div>
    </footer>
  );
}
