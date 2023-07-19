'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import styles from './page.module.scss';
//export const runtime = 'edge';

interface IIFormLogin {
  identifiant: string;
  password: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm<IIFormLogin>();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Connexion</h3>
      <div className={styles.rowInput}>
        <label>Identifiant ou adresse de messagerie*</label>
        <input
          className={clsx(styles.input, errors.identifiant && styles.error)}
          {...register('identifiant', { required: true, maxLength: 20 })}
        />
      </div>
      <div className={styles.rowInput}>
        <label>Mot de passe*</label>
        <input
          className={clsx(styles.input, errors.password && styles.error)}
          {...register('password', { required: true, maxLength: 20 })}
        />
      </div>
      {(errors?.password || errors?.identifiant) && (
        <span className={styles.lineError}>Identidiant incoonus.</span>
      )}
      <input type="submit" className={styles.button} value={'Se Connecter'} />

      <Link href="#" className={styles.forgetPassword}>
        Mot de passe perdu ?
      </Link>
    </div>
  );
}
