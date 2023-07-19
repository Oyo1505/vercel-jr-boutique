import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import Email from '../../../emails';

export const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  const { firstName } = request.json();
  await resend.sendEmail({
    from: 'email@mail.jr-boutique.fr',
    to: 'rigoulet.henri.pierre@gmail.com',
    subject: 'hello world',
    react: Email({ firstName })
  });
  return NextResponse.json({ status: 200 });
}
