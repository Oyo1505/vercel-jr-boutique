'use client';
import { revalidatePath } from 'next/cache';
import tesSubmit from '../form-contact/sendEmail.action';
import { FormEventHandler } from 'react';
import { useRouter } from 'next/navigation';

const TestForm = () => {
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event?.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    await tesSubmit(formData);
    router.refresh();
    form.reset();
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TestForm;
