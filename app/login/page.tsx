/* eslint-disable prefer-template */
/* eslint-disable no-bitwise */
'use client';
import clsx from 'clsx';
import useAuthorizationRequest from 'domains/auth/hooks/use-authorization-request';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import styles from './page.module.scss';

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

  const clientId = process.env.SHOPIFY_HEADLESS_CODE_CLIENT;
  const shopId = '79699935512';
  const redirectUri = 'https://jr-boutique-production.myshopify.com';
  const state = '<state>';
  const nonce = '<nonce>';

  const authorizationUrl = useAuthorizationRequest(
    clientId,
    shopId,
    redirectUri,
    state,
    nonce
  );

  const handleLogin = () => {
    // Redirigez l'utilisateur vers l'URL d'autorisation générée
    window.location.href = authorizationUrl;
  };
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
      <input type='submit' onClick={handleLogin} className={styles.button} value={'Se Connecter'} />

      <Link href='#' className={styles.forgetPassword}>
        Mot de passe perdu ?
      </Link>
    </div>
  );
}
