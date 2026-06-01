import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import "./styles.css";

const navItems = [
  { label: "Work", path: "/work" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "News", path: "/news" },
  { label: "Contact", path: "/contact" },
];

const easeOut = [0.16, 1, 0.3, 1];
const viewportOnce = { once: true, amount: 0.08 };
const localVideoBase = "/videos";

const services = [
  {
    name: "Brand Identity",
    description: "Logo, colour, typography and visual systems for brands that need to look considered from day one.",
    engagement: "One-off + Retainer",
  },
  {
    name: "Brand Direction",
    description: "Naming, positioning, brand story and visual direction for new launches or brand resets.",
    engagement: "Strategy project",
  },
  {
    name: "Packaging & Product Visuals",
    description: "Packaging, labels, product cards, e-commerce shots and launch visuals for consumer products.",
    engagement: "One-off / New launch",
  },
  {
    name: "Campaign & Communication",
    description: "Social media graphics, ad creatives, event posters, website banners and seasonal visual systems.",
    engagement: "One-off / Monthly",
  },
  {
    name: "Ongoing Visual Support",
    description: "Monthly visual support across social, e-commerce, product drops and packaging extensions.",
    engagement: "Retainer",
  },
];

const disciplines = ["All", "Brand Identity", "Brand Direction", "Packaging & Product", "Campaign Design", "Ongoing Support"];
const sectors = ["All", "Beauty", "Food & Drink", "Lifestyle", "Retail", "Wellness"];

const projects = [
  {
    slug: "yoso",
    title: "YŌSO 養素",
    discipline: "Packaging & Product",
    sector: "Beauty",
    year: "2024",
    client: "YŌSO Skincare",
    ratio: "wide",
    visual: "art-yoso",
    intro:
      "Brand identity and packaging for a modern Chinese botanical skincare brand built around quiet ritual, precise formulation and a restrained product system.",
    quote: "Precision and patience became the central tension of the identity.",
  },
  {
    slug: "nova-skin-lab",
    title: "Nova Skin Lab",
    discipline: "Packaging & Product",
    sector: "Beauty",
    year: "2026",
    client: "Nova Skin Lab",
    ratio: "wide",
    visual: "art-nova",
    intro:
      "A refined packaging and product visual system for a skincare brand built around clinical calm, soft contrast and shelf-ready clarity.",
    quote: "The visual system needed to feel precise, but never cold.",
  },
  {
    slug: "morrow-coffee",
    title: "Morrow Coffee",
    discipline: "Brand Identity",
    sector: "Food & Drink",
    year: "2026",
    client: "Morrow Coffee",
    ratio: "tall",
    visual: "art-morrow",
    intro:
      "A warm identity system for a coffee brand balancing everyday familiarity with a stronger retail presence.",
    quote: "A quiet identity can still become instantly recognisable.",
  },
  {
    slug: "aurelia-gifting",
    title: "Aurelia Gifting",
    discipline: "Packaging & Product",
    sector: "Lifestyle",
    year: "2026",
    client: "Aurelia",
    ratio: "standard",
    visual: "art-aurelia",
    intro:
      "Gift packaging visuals and product cards designed to make a small brand feel polished across web, print and unboxing.",
    quote: "Every touchpoint should feel like part of the same gesture.",
  },
  {
    slug: "kiko-home",
    title: "Kiko Home",
    discipline: "Campaign Design",
    sector: "Retail",
    year: "2026",
    client: "Kiko Home",
    ratio: "ultra",
    visual: "art-kiko",
    intro:
      "A campaign direction for a homeware launch, spanning website banners, social templates and event graphics.",
    quote: "The campaign language had to be simple enough to repeat and strong enough to own.",
  },
  {
    slug: "foundry-market",
    title: "Foundry Market",
    discipline: "Brand Direction",
    sector: "Retail",
    year: "2026",
    client: "Foundry Market",
    ratio: "standard",
    visual: "art-foundry",
    intro:
      "Brand story, positioning and art direction for an independent retail concept built around curated everyday objects.",
    quote: "The brand direction gave the visuals a point of view before design began.",
  },
  {
    slug: "luna-bakehouse",
    title: "Luna Bakehouse",
    discipline: "Ongoing Support",
    sector: "Food & Drink",
    year: "2026",
    client: "Luna Bakehouse",
    ratio: "tall",
    visual: "art-luna",
    intro:
      "Monthly visual support for social drops, seasonal menus, packaging extensions and e-commerce refreshes.",
    quote: "Consistency matters most when a brand is always making something new.",
  },
  {
    slug: "senka-campaign",
    title: "SENKA 鲜 — Campaign Design",
    discipline: "Campaign Design",
    sector: "Beauty",
    year: "2024",
    client: "SENKA 鲜",
    ratio: "wide",
    visual: "art-senka",
    intro:
      "Social and e-commerce campaign design for a seasonal skincare launch, built around freshness, product rhythm and digital retail clarity.",
    quote: "The campaign needed to feel immediate, seasonal and easy to scale across every launch asset.",
  },
];

const yosoCase = {
  slug: "yoso",
  title: "YŌSO 養素",
  tagline: "Brand identity and packaging for a modern Chinese botanical skincare brand.",
  services: ["Brand Identity", "Packaging & Product Visuals"],
  client: "YŌSO Skincare",
  sector: ["Consumer Brands", "Fashion & Beauty"],
  year: 2024,
  localVideo: "yoso-hero",
  heroVideo: "",
  heroImage: "/images/yoso/01-logo-dark.jpg",
  coverImage: "/images/yoso/07-packaging-set.jpg",
  coverVisual: "art-yoso",
  pullQuotes: [
    {
      id: 1,
      insertAfterGroup: 0,
      text:
        "Lattice Visual built YŌSO's identity around a single tension: the precision of modern formulation and the patience of traditional botanical knowledge.",
    },
    {
      id: 2,
      insertAfterGroup: 3,
      text:
        "The mark's inner drop holds its weight at 12mm on a jar label and at 3 metres on a retail banner — without becoming either timid or loud.",
    },
    {
      id: 3,
      insertAfterGroup: 6,
      text:
        "Deep ink, parchment, pale celery, and warm copper — chosen not as a palette but as four precise emotional coordinates for a brand that refuses to rush.",
    },
  ],
  imageGroups: [
    {
      id: 1,
      layout: "full",
      images: [{ src: "/images/yoso/01-logo-dark.jpg", alt: "YŌSO mark on deep ink background", aspectRatio: "16/9" }],
    },
    {
      id: 2,
      layout: "2col",
      images: [
        { src: "/images/yoso/02-logo-white.jpg", alt: "YŌSO mark on cream paper card", aspectRatio: "4/3" },
        { src: "/images/yoso/03-mark-detail.jpg", alt: "YŌSO mark — macro detail on uncoated paper", aspectRatio: "4/3" },
      ],
    },
    {
      id: 3,
      layout: "full",
      images: [{ src: "/images/yoso/04-color-type.jpg", alt: "YŌSO color palette and typeface specimen", aspectRatio: "16/9" }],
    },
    {
      id: 4,
      layout: "2col",
      images: [
        { src: "/images/yoso/05-packaging-serum.jpg", alt: "YŌSO Botanical Serum, pale grey stone", aspectRatio: "3/4" },
        { src: "/images/yoso/06-packaging-cream.jpg", alt: "YŌSO Deep Moisture Cream, travertine", aspectRatio: "3/4" },
      ],
    },
    {
      id: 5,
      layout: "full",
      images: [{ src: "/images/yoso/07-packaging-set.jpg", alt: "YŌSO full product line — morning light on limestone", aspectRatio: "16/9" }],
    },
    {
      id: 6,
      layout: "3col",
      images: [
        { src: "/images/yoso/08-render-01.jpg", alt: "CGI render — Botanical Serum dropper", aspectRatio: "1/1" },
        { src: "/images/yoso/09-render-02.jpg", alt: "CGI render — Deep Moisture Cream lid emboss", aspectRatio: "1/1" },
        { src: "/images/yoso/10-render-03.jpg", alt: "CGI render — Botanical Mask tube", aspectRatio: "1/1" },
      ],
    },
    {
      id: 7,
      layout: "full",
      images: [{ src: "/images/yoso/11-lifestyle-01.jpg", alt: "YŌSO products on travertine, strong morning directional light", aspectRatio: "21/9" }],
    },
    {
      id: 8,
      layout: "2col",
      images: [
        { src: "/images/yoso/12-label-detail.jpg", alt: "YŌSO cream jar — embossed mark in raking light", aspectRatio: "1/1" },
        { src: "/images/yoso/13-card.jpg", alt: "YŌSO brand card on white tissue", aspectRatio: "1/1" },
      ],
    },
    {
      id: 9,
      layout: "full",
      images: [{ src: "/images/yoso/14-giftbox.jpg", alt: "YŌSO gift packaging, sage green box, copper foil mark", aspectRatio: "16/9" }],
    },
    {
      id: 10,
      layout: "2col",
      images: [
        { src: "/images/yoso/15-ecom-01.jpg", alt: "YŌSO Botanical Serum — e-commerce main image", aspectRatio: "1/1" },
        { src: "/images/yoso/16-ecom-02.jpg", alt: "YŌSO serum texture — amber drop mid-fall", aspectRatio: "1/1" },
      ],
    },
    {
      id: 11,
      layout: "full",
      images: [{ src: "/images/yoso/17-brand-scale.jpg", alt: "YŌSO brand system — all touchpoints overhead flat-lay", aspectRatio: "16/9" }],
    },
  ],
  bodyText: [
    "YŌSO (養素) is a Chinese skincare brand founded on a single premise: that botanical patience and clinical precision are not opposites. Launched in 2024 with four core products — a botanical serum, a deep-moisture cream, a botanical mask, and a cleansing oil — each formula centres on a single hero ingredient, rigorously dosed and sourced from a specific growing region.",
    "Lattice Visual was engaged to build the brand from the ground up: identity, packaging design, and a complete suite of product visualisation assets for the digital launch. The brief was to carve out a distinct position in a skincare market crowded with either clinical-white minimalism or ornate heritage aesthetics. The challenge was to find a third register — quieter, more considered, and without precedent.",
    "The identity is anchored by a single mark: a thin circle enclosing a teardrop in outline form. It references the dropper — the precise instrument of botanical dosing — and the drop itself: the concentrated result of patient extraction. The mark scales without compromise from a 10mm jar emboss to a three-metre retail banner, and inverts cleanly between dark and light surfaces.",
    "Colour was developed from the raw materials of Chinese herbalism rather than from the skincare category itself. The primary palette — deep ink (深墨), parchment (宣), and pale celery (嫩) — draws from ink stone, mulberry paper, and fresh-cut fennel. A single warm copper appears only as embossed and foil-stamped finishes, used as punctuation rather than decoration, marking the handful of moments that earn emphasis.",
    "Packaging was designed to inhabit the territory between pharmacy restraint and luxury excess. The glass bottle and jar forms are round-shouldered and weighted at the base — stable, generous, unhurried. Labels are single-colour offset-printed on uncoated stock; the brand mark is blind-embossed on each lid. The shipper box, in natural kraft with an ink-stamped mark, extends the same sensibility to the unboxing moment without theatrical excess.",
    "For the digital launch on YŌSO's flagship and owned social channels, Lattice Visual produced a complete visual toolkit before any location photography was scheduled: white-background e-commerce renders for all four SKUs, atmospheric lifestyle renders on stone and linen surfaces, close-up formula texture shots, and a fifteen-second looping product animation. The resulting asset library gave the brand a consistent, high-quality visual presence from day one.",
  ],
  collaborators: [],
  nextProject: {
    title: "SENKA 鲜 — Campaign Design",
    slug: "senka-campaign",
    thumbnail: "/images/senka/cover.jpg",
    visual: "art-senka",
    tagline: "Social and e-commerce campaign for a seasonal skincare launch.",
  },
};

const sectorLabels = {
  Beauty: ["Consumer Brands", "Fashion & Beauty"],
  "Food & Drink": ["Hospitality", "Food & Drink"],
  Lifestyle: ["Consumer Brands", "Lifestyle"],
  Retail: ["Retail", "Consumer Goods"],
  Wellness: ["Health", "Wellness"],
};

const serviceLabels = {
  "Brand Identity": ["Brand Identity", "Brand Direction"],
  "Brand Direction": ["Brand Direction", "Campaign & Communication Design"],
  "Packaging & Product": ["Packaging & Product Visuals", "Brand Identity"],
  "Campaign Design": ["Campaign & Communication Design", "Product Visuals"],
  "Ongoing Support": ["Ongoing Visual Support", "Campaign & Communication Design"],
};

function createCaseStudy(project, index) {
  const nextProject = projects[(index + 1) % projects.length];
  const imageRoot = `/images/${project.slug}`;
  const servicesForCase = serviceLabels[project.discipline] || [project.discipline];
  const sectorForCase = sectorLabels[project.sector] || [project.sector];

  return {
    slug: project.slug,
    title: project.title,
    tagline: project.intro,
    services: servicesForCase,
    client: project.client,
    sector: sectorForCase,
    year: Number(project.year) || 2026,
    heroImage: `${imageRoot}/hero.jpg`,
    coverImage: `${imageRoot}/cover.jpg`,
    coverVisual: project.visual,
    pullQuotes: [
      {
        id: 1,
        insertAfterGroup: 0,
        text: `Lattice Visual shaped ${project.title}'s visual language around a clear tension: commercial clarity and a more memorable emotional register.`,
      },
      {
        id: 2,
        insertAfterGroup: 2,
        text: `The system was designed to hold its character across scales, from the smallest digital crop to the most visible launch asset.`,
      },
      {
        id: 3,
        insertAfterGroup: 4,
        text: `Color, spacing and material cues were treated as working tools, giving every touchpoint a recognisable but flexible rhythm.`,
      },
    ],
    imageGroups: [
      {
        id: 1,
        layout: "full",
        images: [{ src: `${imageRoot}/01-identity-dark.jpg`, alt: `${project.title} identity on dark background`, aspectRatio: "16/9" }],
      },
      {
        id: 2,
        layout: "2col",
        images: [
          { src: `${imageRoot}/02-identity-light.jpg`, alt: `${project.title} identity on light background`, aspectRatio: "4/3" },
          { src: `${imageRoot}/03-mark-detail.jpg`, alt: `${project.title} mark and detail study`, aspectRatio: "4/3" },
        ],
      },
      {
        id: 3,
        layout: "full",
        images: [{ src: `${imageRoot}/04-system.jpg`, alt: `${project.title} visual system overview`, aspectRatio: "16/9" }],
      },
      {
        id: 4,
        layout: "portrait-right",
        images: [
          { src: `${imageRoot}/05-primary-application.jpg`, alt: `${project.title} primary application`, aspectRatio: "16/9" },
          { src: `${imageRoot}/06-secondary-application.jpg`, alt: `${project.title} secondary application`, aspectRatio: "3/4" },
        ],
      },
      {
        id: 5,
        layout: "3col",
        images: [
          { src: `${imageRoot}/07-detail-01.jpg`, alt: `${project.title} detail image one`, aspectRatio: "1/1" },
          { src: `${imageRoot}/08-detail-02.jpg`, alt: `${project.title} detail image two`, aspectRatio: "1/1" },
          { src: `${imageRoot}/09-detail-03.jpg`, alt: `${project.title} detail image three`, aspectRatio: "1/1" },
        ],
      },
      {
        id: 6,
        layout: "full",
        images: [{ src: `${imageRoot}/10-scale.jpg`, alt: `${project.title} system at scale`, aspectRatio: "21/9" }],
      },
      {
        id: 7,
        layout: "asymmetric",
        images: [
          { src: `${imageRoot}/11-context.jpg`, alt: `${project.title} contextual brand image`, aspectRatio: "4/3" },
          { src: `${imageRoot}/12-material.jpg`, alt: `${project.title} material or product detail`, aspectRatio: "3/4" },
        ],
      },
      {
        id: 8,
        layout: "full",
        images: [{ src: `${imageRoot}/13-rollout.jpg`, alt: `${project.title} rollout image`, aspectRatio: "16/9" }],
      },
    ],
    bodyText: [
      `${project.client} is a ${project.sector.toLowerCase()} brand working in a market where visual memory is built quickly and lost just as quickly. The brand needed an identity that could carry product, campaign and retail communication without feeling inflated. Its visual presence had to feel confident enough for launch and restrained enough to grow.`,
      `Lattice Visual was asked to define the visual direction and translate it into a practical design system. The challenge was not to add more decoration, but to make every repeated element work harder: mark, type, color, image crop and layout rhythm. The brief called for a visual language that could move between founder-led storytelling and polished commercial presentation.`,
      `The identity work began with proportion. The mark was treated as an anchor rather than a badge, designed to sit quietly on product surfaces and expand with authority across larger campaign formats. Typography was set with a geometric sans for clarity, paired with more generous spacing to keep the system calm under dense information.`,
      `Color was developed from the brand's own materials and audience cues. Instead of relying on a single fashionable shade, the palette combines black ink, warm paper and one sharper accent tone. This gives the system contrast without turning every touchpoint into a poster.`,
      `Applications were designed as a family: launch visuals, product cards, e-commerce compositions, campaign frames and social templates all share the same grid logic. Each format has enough independence to feel intentional, while still returning to the same core behaviour of type, image and negative space.`,
      `For rollout, Lattice Visual prepared the assets as a working toolkit rather than a static presentation. The result is a case study structure ready for final photography, motion work and product imagery, allowing the brand to replace placeholder material with real launch assets as they are produced.`,
    ],
    collaborators: [],
    nextProject: {
      title: nextProject.title,
      slug: nextProject.slug,
      thumbnail: `/images/${nextProject.slug}/cover.jpg`,
      visual: nextProject.visual,
      tagline: nextProject.intro,
    },
  };
}

const caseStudies = projects.map((project, index) => (project.slug === "yoso" ? yosoCase : createCaseStudy(project, index)));

const newsPosts = [
  {
    title: "How visual consistency helps small brands look larger",
    category: "Brand Systems",
    date: "May 2026",
    excerpt:
      "A practical note on why colour, type, packaging and campaign assets should be designed as one connected system.",
  },
  {
    title: "What makes packaging feel premium without over-designing it",
    category: "Packaging",
    date: "May 2026",
    excerpt:
      "Material cues, spacing, restraint and product hierarchy often matter more than decorative complexity.",
  },
  {
    title: "Building launch visuals before a product photoshoot",
    category: "Product Visuals",
    date: "May 2026",
    excerpt:
      "How renders, mockups and structured art direction can help a brand prepare its campaign before final production assets arrive.",
  },
];

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.title = getPageTitle(path);
    document
      .querySelector("meta[name='description']")
      ?.setAttribute("content", "Lattice Visual is a brand visualization studio for identity, packaging, product visuals and campaign design.");
  }, [path]);

  const navigate = (target) => {
    window.history.pushState({}, "", target);
    setPath(window.location.pathname);
    setMenuOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="site-shell">
      <Navbar
        path={path}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((value) => !value)}
        onNavigate={navigate}
        onSearchOpen={() => setSearchOpen(true)}
      />
      <div className="page-fade" key={path}>
        {renderRoute(path, navigate)}
      </div>
      <Footer onNavigate={navigate} />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} onNavigate={navigate} />}
    </main>
  );
}

function renderRoute(path, navigate) {
  if (path === "/work") return <WorkPage onNavigate={navigate} />;
  if (path.startsWith("/work/")) return <CaseStudyPage slug={path.replace("/work/", "")} onNavigate={navigate} />;
  if (path === "/services") return <ServicesPage />;
  if (path === "/about") return <AboutPage />;
  if (path === "/news" || path === "/blog") return <NewsPage />;
  if (path === "/contact") return <ContactPage />;
  return <HomePage onNavigate={navigate} />;
}

function getPageTitle(path) {
  if (path === "/work") return "Work | Lattice Visual";
  if (path.startsWith("/work/")) {
    const slug = path.replace("/work/", "");
    const caseStudy = caseStudies.find((item) => item.slug === slug);
    return `${caseStudy?.title || "Case Study"} | Lattice Visual`;
  }
  if (path === "/services") return "Services | Lattice Visual";
  if (path === "/about") return "About | Lattice Visual";
  if (path === "/news" || path === "/blog") return "News | Lattice Visual";
  if (path === "/contact") return "Contact | Lattice Visual";
  return "Lattice Visual | Brand Visualization Studio";
}

function Navbar({ path, menuOpen, onMenuToggle, onNavigate, onSearchOpen }) {
  const isActive = (target) => path === target || (target === "/work" && path.startsWith("/work/"));

  return (
    <header className="navbar">
      <button className="wordmark" type="button" onClick={() => onNavigate("/")}>
        Lattice Visual
      </button>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <button className={isActive(item.path) ? "active" : ""} type="button" key={item.path} onClick={() => onNavigate(item.path)}>
            {item.label}
          </button>
        ))}
        <button type="button" onClick={onSearchOpen}>
          Search
        </button>
      </nav>
      <button className="menu-toggle" type="button" onClick={onMenuToggle} aria-expanded={menuOpen}>
        <span />
        <span />
      </button>
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <button type="button" key={item.path} onClick={() => onNavigate(item.path)}>
              {item.label}
            </button>
          ))}
          <button type="button" onClick={onSearchOpen}>
            Search
          </button>
        </div>
      )}
    </header>
  );
}

function HomePage({ onNavigate }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <HomeServices />
      <FeaturedWork onNavigate={onNavigate} />
      <ProcessStrip />
      <HomeCTA onNavigate={onNavigate} />
    </>
  );
}

function Hero({ onNavigate }) {
  return (
    <section className="hero">
      <div className="hero-reel" aria-hidden="true">
        {projects.slice(0, 4).map((project) => (
          <ProjectVisual key={project.slug} visual={project.visual} />
        ))}
      </div>
      <div className="hero-content">
        <p className="eyebrow">Brand Visualization Studio</p>
        <h1>
          We make brands
          <br />
          visually unforgettable.
        </h1>
        <p className="hero-subline">Brand identity · Packaging · Product visuals · Campaign design</p>
        <button className="outline-cta" type="button" onClick={() => onNavigate("/work")}>
          View Our Work
        </button>
      </div>
      <button className="scroll-indicator" type="button" onClick={() => document.querySelector(".services-overview")?.scrollIntoView({ behavior: "smooth" })}>
        Scroll
      </button>
    </section>
  );
}

function HomeServices() {
  return (
    <section className="section services-overview">
      <SectionLabel label="Services" />
      <div className="service-grid">
        {services.map((service, index) => (
          <article className="service-card" key={service.name}>
            <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <span className="service-tag">{service.engagement}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturedWork({ onNavigate }) {
  return (
    <section className="section featured-work">
      <div className="section-row">
        <SectionLabel label="Featured Work" />
        <button className="text-link" type="button" onClick={() => onNavigate("/work")}>
          All Work →
        </button>
      </div>
      <div className="featured-grid">
        {projects.slice(0, 4).map((project, index) => (
          <ProjectCard key={project.slug} project={project} featured={index === 0 || index === 3} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
}

function ProcessStrip() {
  const steps = ["Direction", "Design", "Production", "Rollout"];
  return (
    <section className="section process-strip">
      <SectionLabel label="Process" />
      <div className="process-line">
        {steps.map((step, index) => (
          <article key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{step}</h2>
            <p>{getProcessCopy(step)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function getProcessCopy(step) {
  const copy = {
    Direction: "Define the audience, market position and visual ambition before design begins.",
    Design: "Develop the identity, packaging or campaign language across the right touchpoints.",
    Production: "Create polished assets for print, digital, e-commerce and launch communication.",
    Rollout: "Prepare files, guidance and extensions so the system can keep working after delivery.",
  };
  return copy[step];
}

function HomeCTA({ onNavigate }) {
  return (
    <section className="home-cta">
      <h2>Ready to make your brand easier to recognise, remember and trust?</h2>
      <button className="outline-cta" type="button" onClick={() => onNavigate("/contact")}>
        Start a Project
      </button>
    </section>
  );
}

function WorkPage({ onNavigate }) {
  const [discipline, setDiscipline] = useState("All");
  const [sector, setSector] = useState("All");

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const disciplineMatch = discipline === "All" || project.discipline === discipline;
        const sectorMatch = sector === "All" || project.sector === sector;
        return disciplineMatch && sectorMatch;
      }),
    [discipline, sector],
  );

  return (
    <section className="page-section">
      <PageHeader eyebrow="Work" title="Our Work" intro="A portfolio structure for brand identities, packaging systems, campaign visuals and ongoing design support." />
      <FilterGroup title="Discipline" options={disciplines} active={discipline} onChange={setDiscipline} />
      <FilterGroup title="Sector" options={sectors} active={sector} onChange={setSector} />
      <div className="work-columns">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} onNavigate={onNavigate} />
        ))}
      </div>
      <button className="load-more" type="button">
        Load more
      </button>
    </section>
  );
}

function FilterGroup({ title, options, active, onChange }) {
  return (
    <div className="filter-group" aria-label={title}>
      <span>{title}</span>
      <div>
        {options.map((option) => (
          <button className={active === option ? "active" : ""} type="button" key={option} onClick={() => onChange(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function ServicesPage() {
  return (
    <section className="page-section">
      <PageHeader eyebrow="Services" title="Visual systems for brands that need to look ready." intro="Work can begin with strategy, identity, packaging, campaign assets or an ongoing support model." />
      <div className="service-detail-list">
        {services.map((service, index) => (
          <article key={service.name}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <small>{service.engagement}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="page-section about-page">
      <PageHeader eyebrow="About" title="兰格视觉 / Lattice Visual" intro="A brand visualization studio helping emerging consumer brands build sharper visual identities, packaging and campaign systems." />
      <div className="about-grid">
        <p>
          Lattice Visual works with founders and small teams who need design that feels structured, polished and commercially useful. The focus is not on decoration, but on building a visual language that can hold together across every touchpoint.
        </p>
        <p>
          From a first logo system to packaging extensions, e-commerce visuals and launch campaigns, the work is designed to make brands easier to recognise, remember and trust.
        </p>
      </div>
    </section>
  );
}

function NewsPage() {
  return (
    <section className="page-section">
      <PageHeader eyebrow="News" title="Notes on brand visualization" intro="Short articles and observations on identity, packaging, product visuals and communication design." />
      <div className="news-grid">
        {newsPosts.map((post) => (
          <article className="news-card" key={post.title}>
            <span>{post.category}</span>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <small>{post.date}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="page-section contact-page">
      <div className="contact-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>
            Let's build
            <br />
            something
            <br />
            unforgettable.
          </h1>
          <p>Tell us about your project and we will get back within 24 hours.</p>
          <a href="mailto:latticevisualltd@gmail.com">latticevisualltd@gmail.com</a>
          <span>Instagram: @latticevisual</span>
          <span>WeChat: latticevisual</span>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          {submitted ? (
            <div className="form-success">We'll be in touch soon.</div>
          ) : (
            <>
              <FormField label="Name" name="name" />
              <FormField label="Company" name="company" />
              <FormSelect label="Service needed" name="service" options={["Brand Identity", "Brand Direction", "Packaging & Product", "Campaign Design", "Ongoing Support", "Not sure yet"]} />
              <FormSelect label="Project stage" name="stage" options={["New brand", "Rebrand", "New product launch", "Campaign launch", "Ongoing support"]} />
              <label>
                <span>Project brief</span>
                <textarea name="brief" rows="5" />
              </label>
              <button type="submit">Submit Enquiry</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function FormField({ label, name }) {
  return (
    <label>
      <span>{label}</span>
      <input name={name} type="text" />
    </label>
  );
}

function FormSelect({ label, name, options }) {
  return (
    <label>
      <span>{label}</span>
      <select name={name} defaultValue="">
        <option value="" disabled>
          Select
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function CaseStudyPage({ slug, onNavigate }) {
  const caseStudy = caseStudies.find((item) => item.slug === slug) || yosoCase;

  return (
    <article className="case-study">
      <CaseHeader caseStudy={caseStudy} />
      <CaseHero caseStudy={caseStudy} />
      <CaseBody caseStudy={caseStudy} />
      <CaseText bodyText={caseStudy.bodyText} />
      <CaseMetadata caseStudy={caseStudy} />
      <NextProject nextProject={caseStudy.nextProject} onNavigate={onNavigate} />
    </article>
  );
}

function CaseHeader({ caseStudy }) {
  return (
    <header className="case-header">
      <motion.div className="case-tags" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.6, ease: easeOut }}>
        {caseStudy.services.map((service) => (
          <span key={service}>{service}</span>
        ))}
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6, ease: easeOut }}>
        {caseStudy.title}
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6, ease: easeOut }}>
        {caseStudy.tagline}
      </motion.p>
    </header>
  );
}

function CaseHero({ caseStudy }) {
  return (
    <section className="case-hero-video" aria-label={`${caseStudy.title} hero`}>
      {caseStudy.localVideo ? (
        <CaseLocalVideo caseStudy={caseStudy} />
      ) : caseStudy.heroVideo ? (
        <iframe
          title={`${caseStudy.title} hero video`}
          src={`https://player.vimeo.com/video/${caseStudy.heroVideo}?autoplay=1&muted=1&loop=1&background=1`}
          allow="autoplay; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : (
        <CaseHeroImage src={caseStudy.heroImage} alt={`${caseStudy.title} hero image`} visual={caseStudy.coverVisual} />
      )}
    </section>
  );
}

function CaseLocalVideo({ caseStudy }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <CaseHeroImage src={caseStudy.heroImage} alt={`${caseStudy.title} hero image`} visual={caseStudy.coverVisual} />;
  }

  return (
    <video key={caseStudy.slug} autoPlay muted loop playsInline poster={caseStudy.heroImage} onError={() => setFailed(true)}>
      <source src={`${localVideoBase}/${caseStudy.slug}/${caseStudy.localVideo}.webm`} type="video/webm" />
      <source src={`${localVideoBase}/${caseStudy.slug}/${caseStudy.localVideo}.mp4`} type="video/mp4" />
    </video>
  );
}

function CaseHeroImage({ src, alt, visual }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div className="case-hero-fallback">
        <ProjectVisual visual={visual || "art-yoso"} />
      </div>
    );
  }

  return <img src={src} alt={alt} onError={() => setFailed(true)} />;
}

function CaseBody({ caseStudy }) {
  return (
    <section className="case-body">
      {caseStudy.imageGroups.map((group) => (
        <React.Fragment key={group.id}>
          {caseStudy.pullQuotes
            .filter((quote) => quote.insertAfterGroup === group.id - 1)
            .map((quote) => (
              <PullQuote key={quote.id} text={quote.text} />
            ))}
          <CaseImageGroup group={group} />
        </React.Fragment>
      ))}
    </section>
  );
}

function PullQuote({ text }) {
  return (
    <motion.blockquote
      className="case-pullquote"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: easeOut }}
    >
      {text}
    </motion.blockquote>
  );
}

function CaseImageGroup({ group }) {
  return (
    <motion.section
      className={`case-image-group layout-${group.layout}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: easeOut }}
    >
      {group.images.map((image, index) => (
        <CaseImage image={image} key={`${group.id}-${image.src}`} index={index} />
      ))}
    </motion.section>
  );
}

function CaseImage({ image, index }) {
  const [failed, setFailed] = useState(!image.src);
  const ratioClass = `ratio-${image.aspectRatio.replace("/", "-")}`;

  return (
    <figure className={`case-image ${ratioClass} image-${index + 1}`}>
      {failed ? (
        <div className="case-image-placeholder" aria-label={image.alt}>
          <span />
          <span />
          <span />
          <span />
        </div>
      ) : (
        <img src={image.src} alt={image.alt} loading="lazy" onError={() => setFailed(true)} />
      )}
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  );
}

function CaseText({ bodyText }) {
  return (
    <section className="case-longform">
      <div className="case-longform-separator" />
      <div className="case-longform-inner">
        {bodyText.map((paragraph, index) => (
          <motion.p
            key={paragraph}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: index * 0.08, duration: 0.6, ease: easeOut }}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </section>
  );
}

function CaseMetadata({ caseStudy }) {
  const items = [
    { label: "Client", values: [caseStudy.client] },
    { label: "Sector", values: caseStudy.sector },
    { label: "Services", values: caseStudy.services },
    { label: "Year", values: [String(caseStudy.year)] },
    { label: "Studio", values: ["Lattice Visual"] },
  ];

  return (
    <section className="case-metadata">
      <div>
        {items.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            {item.values.map((value) => (
              <strong key={value}>{value}</strong>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

function NextProject({ nextProject, onNavigate }) {
  return (
    <button className="next-project" type="button" onClick={() => onNavigate(`/work/${nextProject.slug}`)}>
      <CaseNextVisual nextProject={nextProject} />
      <span className="next-overlay" />
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, ease: easeOut }}>
        <span>Next Project</span>
        <strong>{nextProject.title}</strong>
        <p>{nextProject.tagline}</p>
      </motion.div>
    </button>
  );
}

function CaseNextVisual({ nextProject }) {
  const [failed, setFailed] = useState(!nextProject.thumbnail);

  if (failed) {
    return <ProjectVisual visual={nextProject.visual || "art-yoso"} />;
  }

  return <img src={nextProject.thumbnail} alt="" loading="lazy" onError={() => setFailed(true)} />;
}

function ProjectCard({ project, featured = false, onNavigate }) {
  return (
    <article className={`project-card ${featured ? "featured" : ""}`} onClick={() => onNavigate(`/work/${project.slug}`)}>
      <ProjectVisual visual={project.visual} />
      <div className="project-overlay">
        <h2>{project.title}</h2>
        <p>{project.discipline}</p>
      </div>
      <div className="project-caption">
        <h2>{project.title}</h2>
        <p>{project.discipline} · {project.sector}</p>
      </div>
    </article>
  );
}

function ProjectVisual({ visual }) {
  return (
    <div className={`project-visual ${visual}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function PageHeader({ eyebrow, title, intro }) {
  return (
    <header className="page-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{intro}</p>
    </header>
  );
}

function SectionLabel({ label }) {
  return <p className="section-label">{label}</p>;
}

function SearchOverlay({ onClose, onNavigate }) {
  const [query, setQuery] = useState("");
  const results = projects.filter((project) => `${project.title} ${project.discipline} ${project.sector}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="search-overlay">
      <button type="button" onClick={onClose}>
        Close
      </button>
      <label>
        <span>Search work, services or sectors</span>
        <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try packaging, beauty or campaign" />
      </label>
      <div>
        {(query ? results : projects.slice(0, 4)).map((project) => (
          <button type="button" key={project.slug} onClick={() => onNavigate(`/work/${project.slug}`)}>
            <strong>{project.title}</strong>
            <span>{project.discipline} · {project.sector}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div>
        <strong>Lattice Visual</strong>
        <p>Brand Visualization Studio</p>
        <small>© 2026 Lattice Visual. All rights reserved.</small>
      </div>
      <div className="footer-links">
        <div>
          <span>Services</span>
          {services.map((service) => (
            <button type="button" key={service.name} onClick={() => onNavigate("/services")}>
              {service.name}
            </button>
          ))}
        </div>
        <div>
          <span>Company</span>
          {navItems.map((item) => (
            <button type="button" key={item.path} onClick={() => onNavigate(item.path)}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="footer-contact">
        <a href="mailto:latticevisualltd@gmail.com">latticevisualltd@gmail.com</a>
        <button type="button" onClick={() => onNavigate("/contact")}>
          Start a project →
        </button>
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
