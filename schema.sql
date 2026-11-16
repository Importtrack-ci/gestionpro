-- GestionPro: schéma initial multi-entreprises (PostgreSQL / Supabase)
create extension if not exists pgcrypto;

create table if not exists public.companies (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 country text,
 currency_code text not null default 'XOF',
 created_at timestamptz not null default now()
);
create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text,
 preferred_language text not null default 'fr' check (preferred_language in ('fr','en')),
 created_at timestamptz not null default now()
);
create table if not exists public.company_members (
 company_id uuid not null references public.companies(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 role text not null default 'owner' check (role in ('owner','admin','manager','sales','stock','viewer')),
 created_at timestamptz not null default now(),
 primary key(company_id,user_id)
);
create table if not exists public.warehouses (
 id uuid primary key default gen_random_uuid(),
 company_id uuid not null references public.companies(id) on delete cascade,
 name text not null,
 address text,
 created_at timestamptz not null default now(),
 unique(company_id,name)
);
create table if not exists public.products (
 id uuid primary key default gen_random_uuid(),
 company_id uuid not null references public.companies(id) on delete cascade,
 sku text,
 name text not null,
 description text,
 category text,
 unit text not null default 'unité',
 purchase_price numeric(18,2) not null default 0,
 sale_price numeric(18,2) not null default 0,
 min_stock numeric(18,3) not null default 0,
 active boolean not null default true,
 created_at timestamptz not null default now(),
 unique(company_id,sku)
);
create table if not exists public.stock_movements (
 id uuid primary key default gen_random_uuid(),
 company_id uuid not null references public.companies(id) on delete cascade,
 warehouse_id uuid not null references public.warehouses(id),
 product_id uuid not null references public.products(id),
 movement_type text not null check (movement_type in ('in','out','adjustment')),
 quantity numeric(18,3) not null check (quantity > 0),
 reference text,
 note text,
 created_by uuid references auth.users(id),
 created_at timestamptz not null default now()
);
create table if not exists public.customers (
 id uuid primary key default gen_random_uuid(),
 company_id uuid not null references public.companies(id) on delete cascade,
 name text not null,
 phone text,
 email text,
 address text,
 created_at timestamptz not null default now()
);
create table if not exists public.suppliers (
 id uuid primary key default gen_random_uuid(),
 company_id uuid not null references public.companies(id) on delete cascade,
 name text not null,
 phone text,
 email text,
 address text,
 created_at timestamptz not null default now()
);
create table if not exists public.sales (
 id uuid primary key default gen_random_uuid(),
 company_id uuid not null references public.companies(id) on delete cascade,
 customer_id uuid references public.customers(id),
 warehouse_id uuid references public.warehouses(id),
 invoice_number text not null,
 status text not null default 'draft' check (status in ('draft','confirmed','paid','cancelled')),
 subtotal numeric(18,2) not null default 0,
 tax_total numeric(18,2) not null default 0,
 total numeric(18,2) not null default 0,
 currency_code text not null default 'XOF',
 created_by uuid references auth.users(id),
 created_at timestamptz not null default now(),
 unique(company_id,invoice_number)
);
create table if not exists public.sale_items (
 id uuid primary key default gen_random_uuid(),
 sale_id uuid not null references public.sales(id) on delete cascade,
 product_id uuid not null references public.products(id),
 quantity numeric(18,3) not null check(quantity > 0),
 unit_price numeric(18,2) not null default 0,
 line_total numeric(18,2) not null default 0
);
create table if not exists public.purchases (
 id uuid primary key default gen_random_uuid(),
 company_id uuid not null references public.companies(id) on delete cascade,
 supplier_id uuid references public.suppliers(id),
 warehouse_id uuid references public.warehouses(id),
 reference text not null,
 status text not null default 'draft' check(status in ('draft','ordered','received','cancelled')),
 total numeric(18,2) not null default 0,
 currency_code text not null default 'XOF',
 created_at timestamptz not null default now(),
 unique(company_id,reference)
);
create table if not exists public.purchase_items (
 id uuid primary key default gen_random_uuid(),
 purchase_id uuid not null references public.purchases(id) on delete cascade,
 product_id uuid not null references public.products(id),
 quantity numeric(18,3) not null check(quantity > 0),
 unit_cost numeric(18,2) not null default 0,
 line_total numeric(18,2) not null default 0
);
create table if not exists public.expenses (
 id uuid primary key default gen_random_uuid(),
 company_id uuid not null references public.companies(id) on delete cascade,
 description text not null,
 category text,
 amount numeric(18,2) not null check(amount >= 0),
 currency_code text not null default 'XOF',
 expense_date date not null default current_date,
 created_by uuid references auth.users(id),
 created_at timestamptz not null default now()
);

-- Sécurité : RLS activée. Les politiques d'accès par société seront ajoutées
-- avant toute utilisation avec de vraies données. Ne pas désactiver RLS.
alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.company_members enable row level security;
alter table public.warehouses enable row level security;
alter table public.products enable row level security;
alter table public.stock_movements enable row level security;
alter table public.customers enable row level security;
alter table public.suppliers enable row level security;
alter table public.sales enable row level security;
alter table public.sale_items enable row level security;
alter table public.purchases enable row level security;
alter table public.purchase_items enable row level security;
alter table public.expenses enable row level security;

-- IMPORTANT : ce schéma crée les tables, mais aucune politique permissive n'est
-- volontairement ajoutée. Les accès seront configurés dans l'étape sécurité.
