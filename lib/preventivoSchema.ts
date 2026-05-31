import { z } from "zod";

const situationValues = [
  "cambio_amministratore",
  "prima_nomina",
  "richiesta_info",
] as const;

const emptyToUndefined = (value: unknown) =>
  value === "" || value === null ? undefined : value;

export const preventivoSchema = z.object({
  fullName: z.string().min(3, "Nome obbligatorio"),
  email: z.string().email("Email non valida"),
  phone: z.string().min(6, "Telefono non valido"),

  area: z.string().min(2, "Comune o zona obbligatori"),

  units: z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().positive("Inserisci un numero maggiore di 0").optional()
  ),
  parking: z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().nonnegative("Inserisci un numero positivo").optional()
  ),

  elevator: z.boolean(),
  centralHeating: z.boolean(),

  situation: z.enum(situationValues, {
    error: "Seleziona la situazione",
  }),

  message: z.string().optional(),

  privacyAccepted: z.coerce.boolean().refine((v) => v === true, {
    message:
      "Devi accettare il consenso al trattamento dei dati ai sensi del GDPR",
  }),
});

export type RequestQuoteData = z.infer<typeof preventivoSchema>;
