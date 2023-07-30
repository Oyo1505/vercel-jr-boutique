import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req:NextRequest): Promise<Response> {
  if (req.method === 'POST') {
    
    const {email, message, nom} = await req.json();
    const transporter = nodemailer.createTransport({
      host: 'ssl0.ovh.net', 
      port:465,
      auth: {
        user: 'contact@jr-boutique.fr',
        pass: process.env.OVH_MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: 'contact@jr-boutique.fr', // Adresse e-mail de destination
      subject: `Nouveau message de ${nom}`,
      text: `${message}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
     return  NextResponse.json({ msg: "Email envoyer",status:200})
    } catch (error) {
      console.log(error);
      return NextResponse.json({ msg: 'Erreur lors de l\'envoi de l\'e-mail',status:500})
    }
  } else {
    return NextResponse.json({ msg: 'Méthode non autorisée',status:405})

  }
}
