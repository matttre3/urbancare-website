import { z } from "zod";

const situationValues = [
  "cambio_amministratore",
  "prima_nomina",
  "richiesta_info",
] as const;

const emptyToUndefined = (value: unknown) =>
  value === "" || value === null ? undefined : value;

export const preventivoSchema = z.object({
  fullName: z.string().trim().min(3, "Nome obbligatorio").max(150),
  email: z.string().email("Email non valida").max(254),
  phone: z.string().min(6, "Telefono non valido").max(40),

  area: z.string().min(2, "Comune o zona obbligatori").max(200),

  units: z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().nonnegative().max(200).optional()
  ),
  parking: z.preprocess(
    emptyToUndefined,
    z.coerce.number().int().nonnegative("Inserisci un numero positivo").max(200).optional()
  ),

  elevator: z.boolean(),
  centralHeating: z.boolean(),

  situation: z.enum(situationValues, {
    error: "Seleziona la situazione",
  }),

  message: z.string().max(10000).optional(),

  privacyAccepted: z.boolean().refine((v) => v === true, {
    message:
      "Devi accettare il consenso al trattamento dei dati ai sensi del GDPR",
  }),
});

export type RequestQuoteData = z.infer<typeof preventivoSchema>;
