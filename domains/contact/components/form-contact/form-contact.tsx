'use client';
import axios from 'axios';
import clsx from 'clsx';
import { isValidPhoneNumber } from 'libphonenumber-js/min';
import { useReCaptcha } from 'next-recaptcha-v3';
import { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import styles from './form-contact.module.scss';
import tesSubmit from './sendEmail.action';

interface IFormContact {
  nom: string;
  phone: number;
  message: string;
  email: string;
}

const FormContact: FC = () => {
  const [, setLoading] = useState<string>();

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
  } as any;

  const onSubmit = async (data: IFormContact) => {
    const { email, message, nom, phone } = data;

    if (phone && !isValidPhoneNumber(String(phone), 'FR'))
      return setError('phone', {
        type: 'custom',
        message: 'Veuillez renseignez un numéro de téléphone correct.'
      });

    // Generate ReCaptcha token
    const token = await executeRecaptcha('form_submit');
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('email', email);
    formData.append('phone', String(phone));
    formData.append('message', message);
    formData.append('token', token);
    setLoading('loading');
    console.log(formData, email, message, nom, phone);
    await tesSubmit(formData);

    // try {
    //   const res = await axios({
    //     url: '/api/email',
    //     method: 'POST',
    //     data: {
    //       nom,
    //       email,
    //       phone,
    //       message,
    //       token
    //     }
    //   });
    //   if (res.status === 200) {
    //     toast.success('Votre message à bien été envoyé', toastConfig);
    //     setValue('nom', '', { shouldValidate: false });
    //     setValue('email', '', { shouldValidate: false });
    //     setValue('phone',0 , { shouldValidate: false });
    //     setValue('message', '', { shouldValidate: false });
    //   }
    //   setTimeout(() => {
    //     setLoading('ready');
    //   }, 1500);
    // } catch (e) {
    //   toast.error('Erreur lors de l\'envoi du message', toastConfig);
    //   console.log(e);
    // }
  };

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
          {...register('email', {
            required: true,
            validate: {
              maxLength: (v) => v.length <= 50 || 'The email should have at most 50 characters',
              matchPattern: (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "L'email est incorrect."
            }
          })}
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
          <span className={styles.lineError}>
            {errors?.email?.message
              ? errors?.email?.message
              : 'Veuillez renseignez tous champs obligatoires.'}
          </span>
        )}
        {errors?.phone && <span className={styles.lineError}>{errors?.phone?.message}</span>}

        <input type="submit" className={styles.button} value={'Envoyer'} />
      </form>
    </div>
  );
};

export default FormContact;
