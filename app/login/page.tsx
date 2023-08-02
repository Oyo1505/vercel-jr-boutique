/* eslint-disable prefer-template */
/* eslint-disable no-bitwise */
'use client';
import clsx from 'clsx';
import useAuthorizationRequest from 'domains/auth/hooks/use-authorization-request';
import { generateState } from 'domains/common/utilites/generate-state/generate-state';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './page.module.scss';

interface IIFormLogin {
  identifiant: string;
  password: string;
}

export default function Page() {
  const [state, setState] = useState<string | undefined>();
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm<IIFormLogin>();
  useEffect(() => {
    const x = async () => {
      const newState = await generateState();
      setState(newState);
    };
    x();
  }, []);
  const clientId = process.env.SHOPIFY_HEADLESS_CODE_CLIENT;
  const shopId = '79699935512';
  const redirectUri = 'https://jr-boutique-production.myshopify.com';
  const nonce = '<nonce>';

  const authorizationUrl = useAuthorizationRequest(clientId, shopId, redirectUri, state, nonce);

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
        <span className={styles.lineError}>Identidiant inconus.</span>
      )}
      <input type='submit' onClick={handleLogin} className={styles.button} value={'Se Connecter'} />

      <Link href='#' className={styles.forgetPassword}>
        Mot de passe perdu ?
      </Link>
    </div>
  );
}
