import { z } from 'zod';

export const FormDataSchema = z.object({
  nom: z.string().min(1, 'Le nom  est requis.').max(50, 'Le nom doit faire moins de 50 characters'),
  email: z
    .string()
    .regex(new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/), "L'email est incorrect.")
    .min(1, "L'email est requis.")
    .max(50, "L'email doit faire moins de 50 characters"),
  phone: z.string().max(10),
  message: z.string().min(1, 'Le message est requis')
});
