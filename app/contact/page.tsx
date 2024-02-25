import FormContact from 'domains/contact/components/form-contact/form-contact';
import Map from 'domains/contact/components/map/map';
import { Metadata } from 'next';
import Image from 'next/image';
import logo from '../../public/images/page-acceuil/Fiabilité.png';
import styles from './page.module.scss';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(`https://${process.env.NEXT_PUBLIC_DOMAIN_URL}`),
    title: 'Contact',
    description: 'Contact',
    robots: {
      follow: true,
      index: true,
      googleBot: {
        follow: true,
        index: true
      }
    },
    verification: {
      google: 'google',
      yandex: 'yandex',
      yahoo: 'yahoo',
    },
    alternates: {
      canonical: `/contact`
    }
  };
}

export default async function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <Image src={logo} alt="home" />
        <h2>JR Distribution</h2>
        <div className={styles.line}>25 chemin du sanatorium</div>
        <div className={styles.line}>25 000 Besançon</div>
        <div className={styles.phone}>03 81 53 02 08</div>
      </div>
      <div className={styles.elements}>
        <FormContact />
        <Map />
      </div>
    </div>
  );
}
