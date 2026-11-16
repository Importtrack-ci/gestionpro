 "use client";
import { useState } from "react";
import { LayoutDashboard, Package, ShoppingCart, Users, Truck, Warehouse, ChartNoAxesCombined, Settings, Search, Bell, Plus, ArrowDownToLine, ArrowUpFromLine, Menu } from "lucide-react";

const copy = {
 fr: { overview:"Vue d’ensemble", products:"Produits", sales:"Ventes", customers:"Clients", suppliers:"Fournisseurs", stock:"Stocks", reports:"Rapports", settings:"Paramètres", title:"Vue d’ensemble", welcome:"Voici ce qui se passe dans votre entreprise aujourd’hui.", revenue:"Chiffre d’affaires", orders:"Commandes", productsCount:"Produits", lowStock:"Alertes de stock", recent:"Activité récente", view:"Voir tout", add:"Nouvelle vente", search:"Rechercher..." },
 en: { overview:"Overview", products:"Products", sales:"Sales", customers:"Customers", suppliers:"Suppliers", stock:"Inventory", reports:"Reports", settings:"Settings", title:"Overview", welcome:"Here’s what’s happening in your business today.", revenue:"Revenue", orders:"Orders", productsCount:"Products", lowStock:"Low-stock alerts", recent:"Recent activity", view:"View all", add:"New sale", search:"Search..." }
};
const nav = [
  ["overview",LayoutDashboard],["products",Package],["sales",ShoppingCart],["customers",Users],["suppliers",Truck],["stock",Warehouse],["reports",ChartNoAxesCombined],["settings",Settings]
] as const;
export default function Home(){
 const [lang,setLang]=useState<"fr"|"en">("fr");
 const [active,setActive]=useState("overview");
 const [mobile,setMobile]=useState(false);
 const t=copy[lang];
 const labels:Record<string,string>={overview:t.overview,products:t.products,sales:t.sales,customers:t.customers,suppliers:t.suppliers,stock:t.stock,reports:t.reports,settings:t.settings};
 return <main className="shell">
  <aside className={`sidebar ${mobile?"open":""}`}>
   <div className="brand"><div className="brand-mark">G</div><div><b>GestionPro</b><small>BUSINESS MANAGEMENT</small></div></div>
   <div className="company"><div className="company-avatar">AC</div><div><b>Mon entreprise</b><small>Plan Démo</small></div><span>⌄</span></div>
   <p className="nav-caption">MENU PRINCIPAL</p>
   <nav>{nav.map(([id,Icon])=><button key={id} className={`nav-item ${active===id?"selected":""}`} onClick={()=>{setActive(id);setMobile(false)}}><Icon size={18}/><span>{labels[id]}</span>{id==="stock"&&<i>3</i>}</button>)}</nav>
   <div className="sidebar-bottom"><div className="help"><b>Besoin d’aide ?</b><small>Consultez notre guide de démarrage.</small></div><div className="user"><div className="user-avatar">PB</div><div><b>Administrateur</b><small>admin@entreprise.com</small></div><span>•••</span></div></div>
  </aside>
  <section className="workspace">
   <header className="topbar"><button className="mobile-menu" onClick={()=>setMobile(!mobile)}><Menu/></button><div className="crumb">GestionPro <span>/</span> {labels[active]}</div><div className="top-actions"><div className="search"><Search size={16}/><input placeholder={t.search}/><kbd>⌘ K</kbd></div><button className="icon-btn" aria-label="Notifications"><Bell size={18}/><i/></button><button className="lang" onClick={()=>setLang(lang==="fr"?"en":"fr")}>{lang==="fr"?"FR | EN":"EN | FR"}</button></div></header>
   <div className="content">
    <div className="page-heading"><div><p className="eyebrow">LUNDI, 16 NOVEMBRE 2026</p><h1>{labels[active]}</h1><p className="muted">{t.welcome}</p></div><button className="primary" onClick={()=>setActive("sales")}><Plus size={17}/>{t.add}</button></div>
    <div className="stats">
     <article className="stat"><div className="stat-top"><span>{t.revenue}</span><span className="stat-icon blue">↗</span></div><strong>12 450 000 <small>FCFA</small></strong><p className="positive">↗ 12,8% <span>vs mois dernier</span></p></article>
     <article className="stat"><div className="stat-top"><span>{t.orders}</span><span className="stat-icon purple">▤</span></div><strong>148</strong><p className="positive">↗ 8,2% <span>vs mois dernier</span></p></article>
     <article className="stat"><div className="stat-top"><span>{t.productsCount}</span><span className="stat-icon green">▦</span></div><strong>326</strong><p className="neutral">Dans votre catalogue</p></article>
     <article className="stat"><div className="stat-top"><span>{t.lowStock}</span><span className="stat-icon orange">!</span></div><strong>03</strong><p className="warning">Action requise</p></article>
    </div>
    <div className="main-grid">
     <article className="panel chart-panel"><div className="panel-heading"><div><h2>Performance commerciale</h2><p>Évolution du chiffre d’affaires</p></div><select aria-label="Période"><option>Cette année</option><option>Ce mois</option></select></div><div className="chart"><div className="y-labels"><span>15M</span><span>10M</span><span>5M</span><span>0</span></div><div className="chart-area"><div className="grid-lines"><i/><i/><i/><i/></div><svg viewBox="0 0 700 220" preserveAspectRatio="none" role="img" aria-label="Graphique de chiffre d’affaires"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#3778e5" stopOpacity=".22"/><stop offset="100%" stopColor="#3778e5" stopOpacity="0"/></linearGradient></defs><path d="M0 180 C55 165 65 145 115 155 S190 105 230 125 S300 90 350 110 S420 55 465 82 S530 48 580 62 S650 20 700 32 L700 220 L0 220Z" fill="url(#fill)"/><path d="M0 180 C55 165 65 145 115 155 S190 105 230 125 S300 90 350 110 S420 55 465 82 S530 48 580 62 S650 20 700 32" fill="none" stroke="#3778e5" strokeWidth="3" vectorEffect="non-scaling-stroke"/></svg><div className="months"><span>Jan</span><span>Fév</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Juin</span><span>Juil</span><span>Août</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Déc</span></div></div></div></article>
     <article className="panel"><div className="panel-heading"><div><h2>Répartition des ventes</h2><p>Par catégorie de produits</p></div><button className="more">•••</button></div><div className="donut-wrap"><div className="donut"><div><b>148</b><small>Ventes</small></div></div></div><div className="legend"><p><i className="dot d1"/> Équipements <b>45%</b></p><p><i className="dot d2"/> Accessoires <b>30%</b></p><p><i className="dot d3"/> Consommables <b>25%</b></p></div></article>
    </div>
    <div className="bottom-grid">
     <article className="panel"><div className="panel-heading"><div><h2>{t.recent}</h2><p>Les dernières opérations enregistrées</p></div><button className="text-btn">{t.view} →</button></div><div className="table-wrap"><table><thead><tr><th>CLIENT</th><th>RÉFÉRENCE</th><th>DATE</th><th>MONTANT</th><th>STATUT</th></tr></thead><tbody><tr><td><b>Entreprise Kone</b></td><td>#VTE-0248</td><td>16 Nov. 2026</td><td><b>450 000 F</b></td><td><span className="pill paid">Payée</span></td></tr><tr><td><b>ETS Traoré</b></td><td>#VTE-0247</td><td>15 Nov. 2026</td><td><b>285 000 F</b></td><td><span className="pill pending">En attente</span></td></tr><tr><td><b>Afrique Distribution</b></td><td>#VTE-0246</td><td>15 Nov. 2026</td><td><b>1 200 000 F</b></td><td><span className="pill paid">Payée</span></td></tr></tbody></table></div></article>
     <article className="panel alerts"><div className="panel-heading"><div><h2>Alertes de stock</h2><p>Produits à réapprovisionner</p></div><button className="text-btn">Voir tout →</button></div><div className="alert-row"><div className="product-icon">📦</div><div><b>Cartouches HP 305</b><small>Stock restant : 2 unités</small></div><span className="low">Critique</span></div><div className="alert-row"><div className="product-icon">🖨️</div><div><b>Imprimante Laser</b><small>Stock restant : 4 unités</small></div><span className="low">Faible</span></div><div className="alert-row"><div className="product-icon">💻</div><div><b>Souris sans fil</b><small>Stock restant : 5 unités</small></div><span className="low">Faible</span></div></article>
    </div>
    <footer>© 2026 GestionPro · Gestion simplifiée, croissance maîtrisée <span>Données de démonstration</span></footer>
   </div>
  </section>
 </main>
}
