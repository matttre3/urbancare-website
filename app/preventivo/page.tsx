"use client";

import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { preventivoSchema, RequestQuoteData } from "@/lib/preventivoSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Text } from "../../components/Text";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";

export default function Preventivo() {
  const form = useForm<RequestQuoteData>({
    resolver: zodResolver(preventivoSchema) as Resolver<RequestQuoteData>,
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      area: "",
      units: undefined,
      parking: undefined,
      elevator: false,
      centralHeating: false,
      situation: undefined,
      message: "",
      privacyAccepted: false,
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: RequestQuoteData) => {
    try {
      const res = await fetch("/api/request-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        toast.error("Errore nell'invio. Prova a contattarci via email.");
        return;
      }

      toast.success("Richiesta inviata con successo");
      reset();
    } catch {
      toast.error("Connessione non riuscita. Prova a contattarci via email.");
    }
  };

  return (
    <main className="min-h-screen flex gap-40 flex-col">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Richiedi un preventivo – Amministratore condominiale Milano",
          description:
            "Modulo per richiedere un preventivo per l'amministrazione condominiale a Milano e provincia",
          about: {
            "@type": "LocalBusiness",
            name: "Urbancare",
            areaServed: "Milano e provincia",
            email: siteConfig.email,
            telephone: siteConfig.phone,
            serviceType: [
              "Amministratore condominiale Milano e provincia",
              "Gestione condominio Milano e provincia",
            ],
          },
        }}
      />
      <div className="container mx-auto w-full max-w-3xl px-4 py-12">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Text size="h1" align="center" className="font-bold">
              Preventivo amministratore condominiale a Milano e provincia
            </Text>

            <Text
              size="p"
              align="center"
              className="text-muted-foreground text-center"
            >
              Compila il modulo per richiedere un preventivo personalizzato per
              la gestione del tuo condominio a Milano e provincia.
            </Text>

            {/* Nome */}
            <FormField
              control={control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome e cognome *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome e cognome *"
                      autoComplete="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email *"
                      type="email"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Telefono */}
            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefono *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Telefono *"
                      autoComplete="tel"
                      inputMode="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {/* Zona */}
            <FormField
              control={control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comune / Zona del condominio *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Comune / Zona del condominio *"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Unità */}
            <FormField
              control={control}
              name="units"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero di unità abitative</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      inputMode="numeric"
                      placeholder="Numero di unità abitative"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Box */}
            <FormField
              control={control}
              name="parking"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero di box / posti auto</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      inputMode="numeric"
                      placeholder="Numero di box / posti auto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ascensore */}
            <FormField
              control={control}
              name="elevator"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(Boolean(checked))
                      }
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Ascensore</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* Riscaldamento */}
            <FormField
              control={control}
              name="centralHeating"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(Boolean(checked))
                      }
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Riscaldamento centralizzato</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Separator />

            {/* Situazione */}
            <FormField
              control={control}
              name="situation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Situazione attuale *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cambio_amministratore" id="s1" />
                        <Label htmlFor="s1">Cambio amministratore</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="prima_nomina" id="s2" />
                        <Label htmlFor="s2">Prima nomina</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="richiesta_info" id="s3" />
                        <Label htmlFor="s3">Richiesta informazioni</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {/* Messaggio */}
            <FormField
              control={control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Messaggio / Note</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Messaggio / Note" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* GDPR */}
            <FormField
              control={control}
              name="privacyAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(Boolean(checked))
                      }
                    />
                  </FormControl>
                  <div className="min-w-0 space-y-1 leading-none">
                    <FormLabel>
                      Acconsento al trattamento dei dati personali ai sensi del
                      GDPR e dichiaro di aver letto la{" "}
                      <Link href="/privacy-policy" className="underline">
                        Privacy Policy
                      </Link>
                      . *
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Invio..." : "Richiedi il preventivo"}
            </Button>
          </form>
        </Form>
      </div>

      <Toaster richColors position="top-right" />
    </main>
  );
}
