'use client';

import { render } from '@react-email/render';
import clsx from 'clsx';
import nodemailer from 'nodemailer';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styles from './form-contact.module.scss';

interface EmailProps {
  url: string;
}

export const Email: React.FC<Readonly<EmailProps>> = ({ url }) => {
  return (
    <div lang="en">
      <a href={url}>Click me</a>
    </div>
  );
};

const transporter = nodemailer.createTransport({
  host: 'smtp.jr-boutique.fr',
  port: 443,
  secure: false,
  auth: {
    user: 'rh36637-ovh',
    pass: 'Shagrath25'
  }
});
const emailHtml = render(<Email url="https://example.com" />);
const options = {
  from: 'contact@jr-boutique.fr',
  to: 'rigoulet.henri.pierre@gmail.com',
  subject: 'hello world',
  html: emailHtml
};
transporter.sendMail(options);

interface IInputsForm {
  nom: string;
  email: string;
  phone: number;
  message: string;
}

const FormContact: FC = () => {
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm<IInputsForm>();

  const onSubmit = (data) => {
    transporter.sendMail(options);
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
          {...register('email', { required: true, maxLength: 20 })}
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
