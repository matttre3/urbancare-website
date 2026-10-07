import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Preventivo – Amministratore condominiale Milano",
  description:
    "Richiedi un preventivo per l'amministrazione condominiale a Milano e provincia. Gestione condominio trasparente e supporto dedicato.",
  path: "/preventivo",
});

export default function PreventivoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
