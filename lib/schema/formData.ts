import { z } from 'zod';

export const FormDataSchema = z.object({
  nom: z.string().min(1, 'Le nom  est requis.'),
  email: z
    .string()
    .min(1, "l'email est requis.")
    .max(50, "l'email doit faire moins de 50 characters"),
  phone: z.string().max(10),
  message: z.string()
});
