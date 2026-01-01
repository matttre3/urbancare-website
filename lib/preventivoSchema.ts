import { z } from "zod";

export const preventivoSchema = z.object({
  fullName: z.string().min(3, "Nome obbligatorio"),
  email: z.string().email("Email non valida"),
  phone: z.string().min(6, "Telefono non valido"),

  area: z.string().min(2, "Comune o zona obbligatori"),

  units: z.coerce.number().int().positive().optional(),
  parking: z.coerce.number().int().nonnegative().optional(),

  elevator: z.boolean(),
  centralHeating: z.boolean(),

  situation: z
    .string()
    .min(1, "Seleziona la situazione")
    .pipe(
      z.enum(["cambio_amministratore", "prima_nomina", "richiesta_info"]) as any
    ),

  message: z.string().optional(),

  privacyAccepted: z.coerce.boolean().refine((v) => v === true, {
    message:
      "Devi accettare il consenso al trattamento dei dati ai sensi del GDPR",
  }),
});

export type RequestQuoteData = z.infer<typeof preventivoSchema>;
