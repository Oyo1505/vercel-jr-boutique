'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import flecheDroite from '../../../../public/images/diver/FlecheDroite.png';
import flecheGauche from '../../../../public/images/diver/FlecheGauche.png';
import styles from './gallery.module.scss';
export function Gallery({
  images
}: {
  title: string;
  amount: string;
  currencyCode: string;
  images: { src: string; altText: string }[];
}) {
  const [currentImage, setCurrentImage] = useState(0);

  function handleNavigate(direction: 'next' | 'previous') {
    if (direction === 'next') {
      setCurrentImage(currentImage + 1 < images.length ? currentImage + 1 : 0);
    } else {
      setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
    }
  }

  const buttonClassName = '';

  return (
    <div className={styles.container}>
      {images[currentImage] && (
        <Image
          src={images[currentImage]?.src as string}
          alt={images[currentImage]?.altText as string}
          width={720}
          height={320}
          priority={true}
        />
      )}

      {images.length > 1 ? (
        <div className={styles.fleches}>
          <button aria-label='Previous product image' onClick={() => handleNavigate('previous')}>
            <Image src={flecheGauche} width={30} height={30} alt={'fleche-gauche'}  priority={true} />
          </button>
          <button
            aria-label='Next product image'
            className={clsx(buttonClassName)}
            onClick={() => handleNavigate('next')}
          >
           <Image src={flecheDroite} width={30} height={30} alt={'fleche-droite'}  priority={true} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
