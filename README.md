# GestionPro

Base de démarrage d'un SaaS bilingue (français / anglais) de gestion commerciale et de stock.

## Contenu actuel
- Interface de tableau de bord responsive avec données de démonstration.
- Navigation entre les rubriques principales.
- Bascule de langue FR / EN.
- Schéma initial Supabase multi-entreprises, multi-utilisateurs et multi-entrepôts.
- RLS activée sur les tables.

## Lancer en local
1. Installer Node.js LTS.
2. Dans ce dossier, lancer `npm install`.
3. Lancer `npm run dev`.
4. Ouvrir http://localhost:3000.

## Supabase
- Créer un projet Supabase.
- Examiner `supabase/schema.sql` avant exécution.
- Configurer les politiques RLS et les fonctions métier avant d'utiliser des données réelles.
- Copier `.env.example` vers `.env.local` et renseigner les clés Supabase.

## État
Ceci est un premier socle de développement, pas encore un SaaS prêt pour la production : authentification, isolation stricte des données, calculs de stock transactionnels, facturation, paiements, tests et abonnements restent à implémenter et vérifier.
