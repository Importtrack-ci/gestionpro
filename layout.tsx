import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "GestionPro — Gestion commerciale et de stock",
  description: "Gérez vos ventes, achats, produits et stocks dans une seule plateforme."
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="fr"><body>{children}</body></html>;
}
