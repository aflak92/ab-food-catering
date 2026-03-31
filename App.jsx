import React, { useState, useEffect } from 'react';
import { ShoppingBag, Clock, MapPin, Phone, Instagram, Facebook, Menu, X, ArrowRight } from 'lucide-react';

const LOGO_URL = "AB_Foods_Catering_Logo.png";

const menuCategories = [
  {
    title: "Signature Combos",
    items: [
      { name: "Meat + 2 Sides",    price: "$18.50",  desc: "A curated pairing of premium protein and two signature soul sides." },
      { name: "Meat + 3 Sides",    price: "$22.50",  desc: "The ultimate tasting experience. One meat and three deliberate sides." },
      { name: "Four-Side Garden",  price: "$15.00",  desc: "For the purist. A selection of any four garden-fresh southern sides." },
    ],
  },
  {
    title: "Elevated Proteins",
    items: [
      { name: "6-Hour Smoked Chicken", price: "Incl.",    desc: "Slow-rendered with hickory, finished with a signature spice lacquer." },
      { name: "Smothered Center-Cut",  price: "Incl.",    desc: "Tender pork loin chops, pan-seared and draped in silk onion gravy." },
      { name: "Wichita Blue Catfish",  price: "Fri–Sun",  desc: "Cornmeal crusted with a delicate Texas-heat finish." },
    ],
  },
  {
    title: "The Sides",
    items: [
      { name: "Jalapeño Cheddar Rice",  price: "Side", desc: "A creamy, sharp-aged cheddar base with hand-cut jalapeño heat." },
      { name: "Pot-Liquor Collards",    price: "Side", desc: "Slow-steeped with smoked turkey and a bouquet of southern aromatics." },
      { name: "Cinnamon-Glazed Yams",   price: "Side", desc: "Roasted with clarified butter, nutmeg, and caramelized brown sugar." },
    ],
  },
];

const marqueeItems = [
  "Strawberry Crunch Cake",
  "Jalapeño Cheddar Rice",
  "6-Hour Smoked Chicken",
  "Honey Bun Cake",
  "Pot-Liquor Collards",
  "Cinnamon-Glazed Yams",
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080707] text-[#F2EDE4] selection:bg-[#E0185E] selection:text-white overflow-x-hidden">

      {/* ── GLOBAL STYLES ─────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700;1,900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        /* Tokens */
        :root {
          --pink:  #E0185E;
          --gold:  #C9A84C;
          --cream: #F2EDE4;
          --ink:   #080707;
          --surf:  #111010;
          --muted: #6A6560;
        }

        .font-display { font-family: 'Playfair Display', serif; font-style: italic; }
        .font-ui      { font-family: 'DM Sans', sans-serif; }

        /* Noise */
        .noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 9999;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px; opacity: 0.028; mix-blend-mode: overlay;
        }

        /* Ghost headline */
        .ghost {
          -webkit-text-stroke: 1px rgba(242,237,228,0.18);
          color: transparent;
        }

        /* Marquee */
        .marquee-track { display: flex; animation: ticker 45s linear infinite; }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* Image slow zoom */
        .img-zoom { transition: transform 14s cubic-bezier(.25,.46,.45,.94); }
        .img-zoom:hover { transform: scale(1.07); }

        /* Menu item reveal */
        .item-bar {
          position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
          background: var(--pink);
          transform: scaleY(0); transform-origin: top;
          transition: transform 0.4s cubic-bezier(.4,0,.2,1);
        }
        .menu-item:hover .item-bar { transform: scaleY(1); }
        .menu-item { transition: padding-left 0.4s cubic-bezier(.4,0,.2,1); }
        .menu-item:hover { padding-left: 18px; }

        /* Leader dots */
        .dots {
          flex: 1; border-bottom: 1px dotted rgba(255,255,255,0.12);
          margin: 0 12px; align-self: flex-end; padding-bottom: 4px;
        }

        /* Fade-in for mobile drawer */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-in { animation: fadeIn 0.25s ease; }

        /* Button base */
        .btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          border-radius: 2px; cursor: pointer; transition: all 0.25s ease;
          text-decoration: none; border: none;
        }
        .btn-pink  { background: var(--pink); color: #fff; padding: 15px 36px; }
        .btn-pink:hover  { background: #f01e6a; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(224,24,94,.28); }
        .btn-gold  { background: transparent; color: var(--gold); border: 1px solid var(--gold); padding: 14px 32px; }
        .btn-gold:hover  { background: var(--gold); color: var(--ink); }
        .btn-pink-outline { background: transparent; color: var(--pink); border: 1px solid var(--pink); padding: 14px 32px; }
        .btn-pink-outline:hover { background: var(--pink); color: #fff; }
      `}</style>

      <div className="noise" />

      {/* ── NAV ───────────────────────────────────────────── */}
      <nav className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-8 md:px-14 transition-all duration-500
        ${scrolled
          ? 'h-16 bg-[#080707]/92 backdrop-blur-xl border-b border-white/5'
          : 'h-20 bg-transparent'}`}
      >
        {/* Hat mark */}
        <a href="#" className="h-11 w-11 overflow-hidden relative block shrink-0 cursor-pointer"
          style={{ transition: 'transform .35s cubic-bezier(.34,1.56,.64,1)' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) rotate(-3deg)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
        >
          <img
            src={LOGO_URL}
            alt="AB Foods"
            style={{
              position: 'absolute', top: '-4px', left: '-3px',
              width: '52px', mixBlendMode: 'lighten', filter: 'brightness(1.1)',
            }}
          />
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-10 font-ui">
          <div className="flex gap-8 text-[10px] font-medium tracking-[0.2em] uppercase text-[#6A6560]">
            {['#menu', '#story', '#contact'].map((href, i) => (
              <a key={i} href={href}
                className="hover:text-[#C9A84C] transition-colors duration-200"
              >{['Menu', 'Philosophy', 'Access'][i]}</a>
            ))}
          </div>
          <a href="#menu" className="btn btn-pink text-[10px]">
            Order Now <ArrowRight size={13} />
          </a>
        </div>

        <button className="lg:hidden text-[#C9A84C]" onClick={() => setIsMenuOpen(true)}>
          <Menu size={26} strokeWidth={1.5} />
        </button>
      </nav>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative h-screen flex flex-col md:flex-row overflow-hidden border-b border-white/5">

        {/* Left */}
        <div className="w-full md:w-[55%] h-full flex flex-col justify-center
          px-8 md:px-20 pt-20 md:pt-0 bg-[#080707] relative z-10
          after:content-[''] after:absolute after:inset-y-[10%] after:right-0 after:w-px
          after:bg-gradient-to-b after:from-transparent after:via-[rgba(201,168,76,.2)] after:to-transparent"
        >
          {/* Full logo */}
          <div className="mb-10 w-[230px]">
            <img
              src={LOGO_URL}
              alt="AB Foods & Catering"
              style={{ width: '100%', mixBlendMode: 'lighten', filter: 'brightness(1.05) saturate(.95)' }}
            />
          </div>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6 font-ui text-[9px] font-medium tracking-[.44em] uppercase text-[#C9A84C]">
            <span className="block w-6 h-px bg-[#C9A84C]" />
            Wichita Falls · Est. 2024
          </div>

          {/* Headline */}
          <h1 className="font-display font-[900] leading-[.88] tracking-tight uppercase mb-10"
            style={{ fontSize: 'clamp(56px, 7vw, 96px)' }}
          >
            Soul<br />
            <span style={{ color: '#E0185E' }}>Food</span><br />
            <span className="ghost">Refined.</span>
          </h1>

          {/* Tagline */}
          <p className="font-display text-[18px] text-[#6A6560] mb-12 leading-snug">
            Bubbly personality.<br />
            <span style={{ color: '#C9A84C' }}>Upscale Texas heat.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <a href="#menu" className="btn btn-pink">Start Order <ArrowRight size={14} /></a>
            <a href="#story" className="btn btn-gold">Our Story</a>
          </div>

          {/* Pickup */}
          <div className="pt-8 border-t border-[rgba(201,168,76,.25)] max-w-xs">
            <span className="font-ui text-[9px] font-medium tracking-[.4em] uppercase text-[#C9A84C] block mb-2">
              Pickups Begin
            </span>
            <span className="font-display font-[900] text-[52px] leading-none text-[#C9A84C]">12:30</span>
          </div>
        </div>

        {/* Right — image */}
        <div className="w-full md:w-[45%] h-full relative overflow-hidden"
          style={{ borderBottom: '3px solid #E0185E' }}
        >
          <div className="h-full w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80"
              alt="Gourmet Southern Soul Food"
              className="h-full w-full object-cover img-zoom"
              style={{ filter: 'brightness(.62) saturate(.72)' }}
            />
          </div>
          <div className="absolute bottom-8 right-8 z-10">
            <span className="font-ui text-[9px] font-medium tracking-[.38em] uppercase text-[#C9A84C]
              bg-black/50 backdrop-blur-sm px-4 py-2 border border-[rgba(201,168,76,.25)]">
              Ghost Kitchen · TX
            </span>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────── */}
      <div className="bg-[#0d0c0b] border-y border-[rgba(201,168,76,.22)] py-4 overflow-hidden relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10"
          style={{ background: 'linear-gradient(to right, #0d0c0b, transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10"
          style={{ background: 'linear-gradient(to left, #0d0c0b, transparent)' }} />

        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center gap-8 shrink-0 px-8">
              <span className="font-display text-[15px] italic tracking-wide text-[#F2EDE4]/60 whitespace-nowrap">
                {item}
              </span>
              <span className="w-[5px] h-[5px] rounded-full bg-[#E0185E] opacity-60 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* ── MENU ──────────────────────────────────────────── */}
      <section id="menu" className="py-28 bg-[#080707]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-20">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6
            mb-16 pb-10 border-b border-[rgba(201,168,76,.18)]"
          >
            <div>
              <div className="flex items-center gap-3 mb-4 font-ui text-[9px] font-medium tracking-[.44em] uppercase text-[#C9A84C]">
                <span className="w-5 h-px bg-[#C9A84C] block" /> The Curation
              </div>
              <h2 className="font-display font-[900] uppercase leading-none tracking-tight"
                style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}
              >
                Crafted with{' '}
                <span style={{ color: '#E0185E' }}>Intention</span>
              </h2>
            </div>
            <p className="font-display italic text-[16px] text-[#6A6560] max-w-xs leading-relaxed md:text-right">
              A premium approach to comfort classics — every dish seasoned with purpose.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {menuCategories.map((cat, ci) => (
              <div key={ci} className={`space-y-0 ${ci > 0 ? 'md:pl-16' : ''} ${ci < 2 ? 'md:pr-16' : ''} py-8 md:py-0`}>
                <h3 className="font-ui text-[9px] font-medium tracking-[.44em] uppercase text-[#C9A84C]
                  pb-5 mb-8 border-b border-[rgba(201,168,76,.2)]"
                >
                  {cat.title}
                </h3>
                <div className="space-y-8">
                  {cat.items.map((item, ii) => (
                    <div key={ii} className="menu-item group relative cursor-pointer pl-0">
                      <div className="item-bar" />
                      <div className="flex items-end mb-2">
                        <h4 className="font-display text-[19px] group-hover:text-[#C9A84C] transition-colors duration-300 leading-tight">
                          {item.name}
                        </h4>
                        <span className="dots" />
                        <span className="font-ui text-[11px] font-medium text-[#E0185E] shrink-0 pb-0.5">
                          {item.price}
                        </span>
                      </div>
                      <p className="font-ui text-[12px] text-[#6A6560] leading-relaxed italic">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ────────────────────────────────────── */}
      <section id="story" className="bg-[#111010] border-y border-white/5 py-28">
        <div className="max-w-[1400px] mx-auto px-8 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Image */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[3/4] overflow-hidden rounded-[2px] border-l-[3px] border-[#E0185E]">
              <img
                src="https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80"
                alt="Kitchen craft"
                className="h-full w-full object-cover img-zoom"
                style={{ filter: 'brightness(.65) saturate(.7)' }}
              />
            </div>
            <div className="absolute -bottom-5 right-0">
              <span className="font-ui text-[9px] font-medium tracking-[.5em] uppercase text-[#C9A84C]">
                Authenticity · 01
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6 font-ui text-[9px] font-medium tracking-[.44em] uppercase text-[#C9A84C]">
              <span className="w-5 h-px bg-[#C9A84C] block" /> The Philosophy
            </div>

            <blockquote className="border-l-2 border-[#E0185E] pl-8 mb-10">
              <p className="font-display font-[900] italic uppercase leading-tight tracking-tight text-[#F2EDE4]"
                style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
              >
                "Bright. Bubbly.<br />
                Unapologetically{' '}
                <span style={{ color: '#C9A84C' }}>Texas.</span>"
              </p>
            </blockquote>

            <p className="font-display italic text-[17px] text-[#6A6560] leading-[1.8] mb-6 max-w-lg">
              Soul food isn't just a recipe — it's an inheritance. We take the traditions of Wichita Falls and elevate them with urban flair.
            </p>
            <p className="font-display italic text-[17px] text-[#6A6560] leading-[1.8] max-w-lg">
              Every ingredient is respected. Every spice is deliberate. Every plate is an act of love with a Texas-sized personality behind it.
            </p>

            <div className="mt-12 pt-10 border-t border-[rgba(201,168,76,.2)] grid grid-cols-2 gap-10">
              {[['6 hrs', 'Smoke time,\nsignature chicken'], ['Daily', 'Fresh prep,\nno shortcuts']].map(([num, lbl], i) => (
                <div key={i}>
                  <span className="font-display font-[900] italic text-[48px] text-[#C9A84C] leading-none block mb-2">
                    {num}
                  </span>
                  <span className="font-ui text-[9px] font-medium tracking-[.28em] uppercase text-[#6A6560] leading-relaxed whitespace-pre">
                    {lbl}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer id="contact" className="bg-[#080707] pt-24 pb-10 border-t border-[rgba(201,168,76,.22)]">
        <div className="max-w-[1400px] mx-auto px-8 md:px-20">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">

            {/* Brand */}
            <div className="md:col-span-2">
              <div className="w-[170px] mb-7">
                <img
                  src={LOGO_URL}
                  alt="AB Foods & Catering"
                  style={{ width: '100%', mixBlendMode: 'lighten', opacity: 0.88, filter: 'saturate(.9)' }}
                />
              </div>
              <p className="font-ui text-[9px] font-medium tracking-[.45em] uppercase text-[#6A6560] mb-10 leading-loose">
                Wichita Falls · Refined Southern Soul
              </p>
              {/* Square social buttons — not circles */}
              <div className="flex gap-3">
                {[Instagram, Facebook].map((Icon, i) => (
                  <button key={i}
                    className="h-10 w-10 border border-[rgba(201,168,76,.35)] flex items-center justify-center
                      text-[#C9A84C] transition-all duration-250 rounded-[2px]
                      hover:border-[#E0185E] hover:text-[#E0185E]"
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <span className="font-ui text-[9px] font-medium tracking-[.42em] uppercase text-[#C9A84C] block mb-8">
                Contact
              </span>
              <div className="space-y-6">
                {[
                  ['Operations', '12:30 PM — 8:00 PM Daily'],
                  ['Direct',     '832.398.8071'],
                  ['Kitchen',    'Wichita Falls, TX'],
                ].map(([lbl, val]) => (
                  <div key={lbl}>
                    <span className="font-ui text-[8px] font-medium tracking-[.28em] uppercase text-[#6A6560] block mb-1">
                      {lbl}
                    </span>
                    <span className="font-display italic text-[16px] tracking-tight text-[#F2EDE4]/80">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Access */}
            <div>
              <span className="font-ui text-[9px] font-medium tracking-[.42em] uppercase text-[#C9A84C] block mb-8">
                Access
              </span>
              <div className="space-y-5">
                {['Menu Sync', 'Catering Guide', 'Order Status', 'Ghost Partners'].map(link => (
                  <p key={link}
                    className="font-ui text-[10px] font-medium tracking-[.2em] uppercase text-[#6A6560]
                      hover:text-[#F2EDE4] transition-colors cursor-pointer"
                  >
                    {link}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4
            font-ui text-[9px] font-medium tracking-[.32em] uppercase text-[#6A6560]"
          >
            <p>© 2024 AB Foods & Catering</p>
            <p className="italic tracking-[.45em] text-[#E0185E]">Refined Southern Soul</p>
          </div>
        </div>
      </footer>

      {/* ── MOBILE DRAWER ─────────────────────────────────── */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#080707] px-10 py-12 flex flex-col justify-center fade-in">
          <button
            className="absolute top-10 right-10 text-[#C9A84C] font-ui text-[9px] tracking-[.3em] uppercase flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Close <X size={20} strokeWidth={1.5} />
          </button>
          <div className="space-y-10 mb-16">
            {[['#menu', 'Menu'], ['#story', 'Story'], ['#menu', 'Order'], ['#contact', 'Access']].map(([href, label]) => (
              <a key={label} href={href}
                onClick={() => setIsMenuOpen(false)}
                className="block font-display font-[900] italic uppercase tracking-tight
                  text-[#F2EDE4]/25 hover:text-[#E0185E] transition-colors duration-200"
                style={{ fontSize: 'clamp(36px, 10vw, 56px)' }}
              >
                {label}
              </a>
            ))}
          </div>
          <button className="w-full btn btn-pink-outline py-5 justify-center text-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            Order Now <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
