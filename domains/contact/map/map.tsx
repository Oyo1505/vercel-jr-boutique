'use client';
import { FC } from 'react';
import styles from './map.module.scss';

const Map: FC = () => {
  return (
    <div>
      <iframe
        className={styles.container}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.7577872307647!2d5.9718258!3d47.2365626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478d63c1b2af4925%3A0x82544de71070eaeb!2s25%20Chem.%20du%20Sanatorium%2C%2025000%20Besan%C3%A7on!5e1!3m2!1sfr!2sfr!4v1689602028075!5m2!1sfr!2sfr"
        width="600"
        height="600"
        style={{ border: 0 }}
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
