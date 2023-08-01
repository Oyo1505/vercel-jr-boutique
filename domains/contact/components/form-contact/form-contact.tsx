'use client';
import axios from 'axios';
import clsx from 'clsx';
import { isValidPhoneNumber } from 'libphonenumber-js/min';
import { ReCaptcha, useReCaptcha } from 'next-recaptcha-v3';
import { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import styles from './form-contact.module.scss';

interface IFormContact {
  nom: string;
  phone: string;
  message: string;
  email: string;
}

const FormContact: FC = () => {
  const [, setLoading] = useState<string>();
  const [, setToken] = useState('');

  const { executeRecaptcha } = useReCaptcha();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
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
      const { email, message, nom, phone } = data;
     
      if(phone && !isValidPhoneNumber(phone, 'FR')) return setError('phone', { type: 'custom', message: 'Veuillez renseignez un numéro de téléphone correct.' });

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
            phone,
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
        toast.error('Erreur lors de l\'envoi du message', toastConfig);
        console.log(e);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {...register('email', { required: true,  validate: {
            maxLength: (v) =>
              v.length <= 50 || "The email should have at most 50 characters",
            matchPattern: (v) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              "L'email est incorrect.",
          }, })}
        />
        <input
         className={clsx(styles.input, errors.phone && styles.error)}
          placeholder={'Téléphone'}
          {...register('phone', { maxLength: 10 })}
        />
        <textarea
          className={clsx(styles.input, styles.textarea)}
          placeholder={'Message (obligatoire)'}
          {...register('message', { required: true })}
        />
        {(errors?.nom || errors?.email || errors?.message) && (
          <span className={styles.lineError}>{errors?.email?.message ? errors?.email?.message :  'Veuillez renseignez tous champs obligatoires.'}</span>
        )}
         {(errors?.phone) && (
          <span className={styles.lineError}>{errors?.phone?.message}</span>
        )}
        <ReCaptcha onValidate={setToken} action='page_view' />
        <input type='submit' className={styles.button} value={'Envoyer'} />
      </form>
    </div>
  );
};

export default FormContact;
