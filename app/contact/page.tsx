import FormContact from 'domains/contact/components/form-contact/form-contact';
import Map from 'domains/contact/components/map/map';
import { Metadata } from 'next';
import Image from 'next/image';
import logo from '../../public/images/page-acceuil/Fiabilité.png';
import styles from './page.module.scss';
import TestForm from 'domains/contact/components/test-form/test-form';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: process.env.DOMAIN_URL
      ? new URL(`https://${process.env.DOMAIN_URL}`)
      : new URL('http://localhost:3000'),
    title: 'Contact',
    description: 'Contact JR Distribution',
    verification: {
      google: 'google'
    },
    alternates: {
      canonical: `/contact`
    }
  };
}

export default async function Page() {
  'use server';
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <Image src={logo} alt="home" />
        <h2>JR Distribution</h2>
        <div className={styles.line}>25 chemin du sanatorium</div>
        <div className={styles.line}>25 000 Besançon</div>
        <div className={styles.phone}>03 81 53 02 06</div>
      </div>
      <div className={styles.elements}>
        {/* <TestForm /> */}
        <FormContact />
        <Map />
      </div>
    </div>
  );
}
