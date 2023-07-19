'use client';

import clsx from 'clsx';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './form-contact.module.scss';

const FormContact: FC = () => {
  const [, setLoading] = useState<string>();
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm<IInputsForm>();

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading('loading');
    await fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify({
        firstName: 'COMSE'
      })
    });
    setTimeout(() => {
      setLoading('ready');
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(onSubmit(e))}>
        <input
          className={clsx(styles.input, errors.nom && styles.error)}
          placeholder={'Nom / Société (obligatoire)'}
          {...register('nom', { required: true, maxLength: 20 })}
        />
        <input
          className={clsx(styles.input, errors.nom && styles.error)}
          placeholder={'Email (obligatoire)'}
          {...register('email', { required: true, maxLength: 60 })}
        />
        <input
          className={styles.input}
          placeholder={'Téléphone'}
          {...register('phone', { maxLength: 10 })}
        />
        <textarea
          className={clsx(styles.input, styles.textarea)}
          placeholder={'Message (obligatoire)'}
          {...register('message', { required: true })}
        />
        {(errors?.nom || errors?.email || errors?.message) && (
          <span className={styles.lineError}>Veuillez renseignez tous champs obligatoires.</span>
        )}

        <input type="submit" className={styles.button} value={'Envoyer'} />
      </form>
    </div>
  );
};

export default FormContact;
