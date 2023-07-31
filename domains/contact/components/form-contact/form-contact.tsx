'use client';
import axios from 'axios';
import clsx from 'clsx';
import { FC, useCallback, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { ReCaptcha, useReCaptcha } from 'next-recaptcha-v3';

import { useForm } from 'react-hook-form';
import styles from './form-contact.module.scss';

interface IFormContact {
  nom: string;
  phone: string;
  message: string;
  email: string;
}

const FormContact: FC = () => {
  const [, setLoading] = useState<string>();
  const [token, setToken] = useState('');

  const { executeRecaptcha } = useReCaptcha();

  const verifyRecaptchaCallback = useCallback((token: string) => {
    setToken(token);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IInputsForm>();

  const toastConfig = {
    duration: 4000,
    position: 'top-right',

    // Styling
    className: styles.toaster,
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: '#cd1619'
    },

    // Aria
    ariaProps: {
      role: 'status',
      'aria-live': 'polite'
    }
  };

  const onSubmit = useCallback(
    async (data: IFormContact) => {
      const { email, message, nom } = data;
      // Generate ReCaptcha token
      const token = await executeRecaptcha('form_submit');

      setLoading('loading');
      try {
        const res = await axios({
          url: '/api/email',
          method: 'POST',
          data: {
            nom,
            email,
            message,
            token
          }
        });
        if (res.status === 200) {
          toast.success('Votre message à bien été envoyé', toastConfig);
          setValue('nom', '', { shouldValidate: false });
          setValue('email', '', { shouldValidate: false });
          setValue('phone', '', { shouldValidate: false });
          setValue('message', '', { shouldValidate: false });
        }
        setTimeout(() => {
          setLoading('ready');
        }, 1500);
      } catch (e) {
        console.log(e);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [executeRecaptcha, handleSubmit]
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
        <ReCaptcha onValidate={setToken} action="page_view" />
        <input type="submit" className={styles.button} value={'Envoyer'} />
      </form>
    </div>
  );
};

export default FormContact;
