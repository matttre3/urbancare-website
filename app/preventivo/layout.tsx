import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preventivo – Amministratore condominiale Milano",
  description:
    "Richiedi un preventivo per l'amministrazione condominiale a Milano e provincia. Gestione condominio trasparente e supporto dedicato.",
  alternates: { canonical: "/preventivo" },
  robots: { index: true, follow: true },
};

export default function PreventivoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
