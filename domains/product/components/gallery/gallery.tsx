'use client';
import clsx from 'clsx';
import ArrowLeftIcon from 'domains/icons/arrow-left';
import Image from 'next/image';
import { useState } from 'react';
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
        <div>
          <button aria-label='Previous product image' onClick={() => handleNavigate('previous')}>
            <ArrowLeftIcon className='h-6' />
          </button>
          <button
            aria-label='Next product image'
            className={clsx(buttonClassName)}
            onClick={() => handleNavigate('next')}
          >
            <ArrowLeftIcon />
          </button>
        </div>
      ) : null}

      {images.length > 1 ? (
        <div>
          {images.map((image, index) => {
            return (
              <button
                aria-label='Enlarge product image'
                key={image.src}
                onClick={() => setCurrentImage(index)}
              >
                <Image alt={image?.altText} src={image.src} width={725} height={320} />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
