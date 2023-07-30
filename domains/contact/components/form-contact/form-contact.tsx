'use client';
import axios from 'axios';
import clsx from 'clsx';
import { FC, useRef, useState } from 'react';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from 'react-hook-form';
import styles from './form-contact.module.scss';
interface IFormContact {
  nom:string
  phone:number
  message:string
  email:string
}

const FormContact: FC = () => {
  const [, setLoading] = useState<string>();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const recaptchaRef = useRef()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IInputsForm>();


  const onSubmit = async (data:IFormContact) => {
  
    const {email, message, nom} = data;
    setLoading('loading');
    try{
      
     const res =  await axios({
        url:'/api/email',
        method: 'POST',
        data: {
          nom,
          email,
          message,
        }
      });
      if(res.status === 200){
        console.log('message envoye')
        setValue('nom', '', { shouldValidate: false })
        setValue('email', '', { shouldValidate: false })
        setValue('phone', 0, { shouldValidate: false })
        setValue('message', '', { shouldValidate: false })
      }
      setTimeout(() => {
        setLoading('ready');
      }, 1500);
    }catch(e){
      console.log(e)
    }

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
        <input type='submit' className={styles.button} value={'Envoyer'} />
      </form>
    </div>
  );
};

export default FormContact;
