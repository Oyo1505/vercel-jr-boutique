'use server';
import axios from 'axios';
import { FormDataSchema } from 'lib/schema/formData';
import nodemailer from 'nodemailer';
import { string, z } from 'zod';
const verifyRecaptcha = async (token: string) => {
  const secretKey = process.env.RECAPTHA_SECRET_KEY;

  var verificationUrl =
    'https://www.google.com/recaptcha/api/siteverify?secret=' + secretKey + '&response=' + token;

  return await axios.post(verificationUrl);
};
type Inputs = z.infer<typeof FormDataSchema>;

const tesSubmit = async (formData: Inputs, tkn: string) => {
  const result = FormDataSchema.safeParse(formData);

  if (result.success) {
    const res = await verifyRecaptcha(tkn);

    if (res.status === 200) {
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
        from: process.env.OVH_MAIL,
        to: process.env.OVH_MAIL, // Adresse e-mail de destination
        subject: `Nouveau message de ${result?.data?.nom} - ${result?.data?.email}`,
        text: `${result?.data?.message} \n
          ${result?.data?.phone ? `Contact :  ${result?.data?.phone}` : ''}
          ${result?.data?.email}
        `
      };

      try {
        await transporter.sendMail(mailOptions);
        return { success: true, data: result.data };
      } catch (error) {
        console.log(error);
        return { success: false, error };
      }
    } else {
      return NextResponse.json({ msg: 'Erreur lors de la vérification du recaptcha', status: 500 });
    }
  }
  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

export default tesSubmit;
