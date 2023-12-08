'use client';
import axios from 'axios';
import clsx from 'clsx';
import { isValidPhoneNumber } from 'libphonenumber-js/min';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useReCaptcha } from 'next-recaptcha-v3';
import { FC, useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import styles from './form-contact.module.scss';
import tesSubmit from './sendEmail.action';
import { FormDataSchema } from 'lib/schema/formData';

type Inputs = z.infer<typeof FormDataSchema>;

const FormContact: FC = () => {
  const [dataForm, setDataForm] = useState<any>();
  const { executeRecaptcha } = useReCaptcha();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema)
  });

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data?.phone && !isValidPhoneNumber(data?.phone, 'FR'))
      return setError('phone', {
        type: 'custom',
        message: 'Veuillez renseignez un numéro de téléphone correct.'
      });

    const token = await executeRecaptcha('form_submit');
    const result = await tesSubmit(data, token);

    if (!result) {
      console.log('Something went wrong');
      return;
    }

    if (result.error) {
      // set local error state
      console.log(result.error);
      return;
    }

    reset();
    setDataForm(result.data);
    // const { phone } = data;
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={clsx(styles.input, errors.nom && styles.error)}
          placeholder={'Nom / Société (obligatoire)'}
          {...register('nom')}
        />
        <input
          className={clsx(styles.input, errors.nom && styles.error)}
          placeholder={'Email (obligatoire)'}
          {...register(
            'email'
            // , {
            //   validate: {
            //     maxLength: (v) => v.length <= 50 || 'l\'email doit faire moins de 50 characters',
            //     matchPattern: (v) =>
            //       /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "L'email est incorrect."
            //   }
            // }
          )}
        />
        <input
          className={clsx(styles.input, errors.phone && styles.error)}
          placeholder={'Téléphone'}
          {...register('phone')}
        />
        <textarea
          className={clsx(styles.input, styles.textarea)}
          placeholder={'Message (obligatoire)'}
          {...register('message')}
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
