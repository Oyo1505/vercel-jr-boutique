import Image, { StaticImageData } from 'next/image';
import styles from './card.module.scss';
import React from 'react';
import { motion } from 'framer-motion';
interface CardProps {
  logoSrc: StaticImageData | string;
  altText: string;
  title: string;
  description: string;
  isMiddleCard?: boolean;
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
const Card: React.FC<CardProps> = ({ logoSrc, altText, title, description, isMiddleCard }) => {
  const cardClassName = isMiddleCard ? `${styles.card} ${styles.cardMiddle}` : styles.card;

  return (
    <motion.div variants={item} className={cardClassName}>
      <Image src={logoSrc} alt={altText} loading="lazy" />
      <div className={styles.containerCard}>
        <div className={styles.titleCard}>{title}</div>
        <div className={styles.text}>{description}</div>
      </div>
    </motion.div>
  );
};

export default Card;
