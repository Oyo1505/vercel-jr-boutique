'use server';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const verifyRecaptcha = async (token: string) => {
  const secretKey = process.env.RECAPTHA_SECRET_KEY;

  var verificationUrl =
    'https://www.google.com/recaptcha/api/siteverify?secret=' + secretKey + '&response=' + token;

  return await axios.post(verificationUrl);
};

const tesSubmit = async (formData: FormData) => {
  const formDatad = new FormData();
  formDatad.append('nom', formData?.nom);
  formDatad.append('email', formData?.email);
  formDatad.append('phone', String(formData?.phone));
  formDatad.append('message', formData?.message);
  formDatad.append('token', formData?.token);
  console.log(formDatad);
  const nom = formDatad.get('nom') as string;
  const email = formDatad.get('email') as string;
  const message = formDatad.get('message') as string;
  const phone = formDatad.get('phone') as string;
  const token = formDatad.get('token') as string;

  const res = await verifyRecaptcha(token);

  if (res.status === 200) {
    console.log(formData);
    const transporter = nodemailer.createTransport({
      host: 'pro3.mail.ovh.net',
      port: 587,
      secure: false,
      auth: {
        user: process.env.OVH_MAIL,
        pass: process.env.OVH_MAIL_PASSWORD
      }
    });

    const mailOptions = {
      to: process.env.OVH_MAIL, // Adresse e-mail de destination
      subject: `Nouveau message de ${nom} - ${email}`,
      text: `${message} \n
        ${phone ? `Contact :  ${phone}` : ''}
        ${email}
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ msg: 'Email envoyer', status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ msg: "Erreur lors de l'envoi de l'e-mail", status: 500 });
    }
  } else {
    return NextResponse.json({ msg: 'Erreur lors de la vérification du recaptcha', status: 500 });
  }
};

export default tesSubmit;
