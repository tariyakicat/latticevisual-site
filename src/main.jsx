import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const navItems = [
  { label: "Work", path: "/work" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "News", path: "/news" },
  { label: "Contact", path: "/contact" },
];

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
];

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
  if (path.startsWith("/work/")) return "Case Study | Lattice Visual";
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
  const project = projects.find((item) => item.slug === slug) || projects[0];
  const nextProject = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length];

  return (
    <article className="case-study">
      <section className="case-hero">
        <ProjectVisual visual={project.visual} />
        <div>
          <span>{project.discipline}</span>
          <h1>{project.title}</h1>
          <p>
            {project.client} · {project.year}
          </p>
        </div>
      </section>
      <section className="case-intro">
        <p>{project.intro}</p>
      </section>
      <CaseImageBlock visual={project.visual} />
      <blockquote>{project.quote}</blockquote>
      <section className="case-text">
        <p>
          This case study layout is prepared for real project photography, packaging mockups, campaign assets and process images. When your own work is ready, the placeholder visual can be replaced with image files while keeping this editorial structure.
        </p>
      </section>
      <section className="case-meta">
        <div>
          <span>Client</span>
          <strong>{project.client}</strong>
        </div>
        <div>
          <span>Discipline</span>
          <strong>{project.discipline}</strong>
        </div>
        <div>
          <span>Sector</span>
          <strong>{project.sector}</strong>
        </div>
      </section>
      <button className="next-project" type="button" onClick={() => onNavigate(`/work/${nextProject.slug}`)}>
        <ProjectVisual visual={nextProject.visual} />
        <span>Next Project</span>
        <strong>{nextProject.title}</strong>
      </button>
    </article>
  );
}

function CaseImageBlock({ visual }) {
  return (
    <section className="case-image-row">
      <ProjectVisual visual={visual} />
      <ProjectVisual visual={visual} />
    </section>
  );
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
