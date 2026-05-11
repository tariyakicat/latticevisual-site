import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import * as THREE from "three";
import {
  ArrowUpRight,
  Boxes,
  BrainCircuit,
  CalendarDays,
  ChevronRight,
  CirclePlay,
  Clock3,
  Layers3,
  Mail,
  Microscope,
  Orbit,
  PenTool,
  Search,
  Sparkles,
  Waypoints,
} from "lucide-react";
import "./styles.css";

const services = [
  {
    eyebrow: "MOA / MOD Animation",
    title: "Mechanisms translated into memorable stories",
    image: "/assets/motion-graphics.png",
    icon: BrainCircuit,
    intro:
      "High-end 3D animation for mechanism of action, mechanism of disease, therapeutic platforms and microscopic biological processes. Built for audiences who need to understand the science quickly without losing the nuance.",
    items: ["MOA and MOD animation", "Disease pathway and cellular biology sequences", "Congress, investor and HCP-ready edits"],
  },
  {
    eyebrow: "Scientific Illustration",
    title: "Single images that carry complex science",
    image: "/assets/scientific-illustration.png",
    icon: Microscope,
    intro:
      "Publication figures, graphical abstracts and campaign visuals that bring structure to dense concepts. Each image is composed to explain, persuade and remain scientifically credible.",
    items: ["Graphical abstracts and TOC visuals", "2D / 3D mechanism diagrams", "Journal cover and hero science imagery"],
  },
  {
    eyebrow: "Device & Product CGI",
    title: "Technical products shown with precision",
    image: "/assets/product-visualization.png",
    icon: Boxes,
    intro:
      "Clean, high-fidelity product visuals for medical devices, diagnostics, hardware and advanced manufacturing. Designed to reveal how a product works, what makes it different and where the engineering value sits.",
    items: ["Launch and website product renders", "Exploded views and internal system visuals", "Macro material, sensor and component detail"],
  },
];

const useCases = [
  {
    title: "For science that needs to be understood",
    text: "Clarify a mechanism, pathway, platform or product story for people who do not have time to decode dense technical material.",
  },
  {
    title: "For launch moments that need visual authority",
    text: "Build the core imagery for websites, investor decks, announcements, congress booths, sales materials and internal alignment.",
  },
  {
    title: "For publications, education and review",
    text: "Create figures, abstracts and explanatory assets that preserve hierarchy, scientific accuracy and audience confidence.",
  },
];

const featuredWorks = [
  {
    title: "Molecular Mechanism",
    type: "Mechanism Visual Direction",
    image: "/assets/hero-lattice.png",
  },
  {
    title: "Membrane Receptor Mechanism",
    type: "Publication Visual Direction",
    image: "/assets/scientific-illustration.png",
  },
  {
    title: "Exploded View",
    type: "Product CGI Direction",
    image: "/assets/product-visualization.png",
  },
];

const portfolioGroups = [
  {
    label: "MOA / MOD Animation",
    description: "Visual directions for therapeutic mechanisms, disease pathways, microscopic transport and platform science.",
    works: [
      ["Molecular Transformation Sequence", "3D animation direction", "/assets/motion-graphics.png"],
      ["Cellular Pathway Environment", "MOA environment study", "/assets/hero-lattice.png"],
    ],
  },
  {
    label: "Scientific Illustration",
    description: "Still-image systems for manuscripts, graphical abstracts, pitch decks and campaign hero visuals.",
    works: [
      ["Membrane Receptor Study", "3D scientific illustration", "/assets/scientific-illustration.png"],
      ["Publication Visual System", "Graphical abstract direction", "/assets/hero-lattice.png"],
    ],
  },
  {
    label: "Device & Product CGI",
    description: "Product-led visuals for medical devices, diagnostics, hardware launches and high-value technical systems.",
    works: [
      ["Exploded View", "Product structure direction", "/assets/product-visualization.png"],
      ["Investor Deck Product Hero", "High-resolution CGI direction", "/assets/product-visualization.png"],
    ],
  },
];

const workflow = [
  {
    icon: Search,
    title: "Understand the science",
    text: "We clarify the mechanism, audience, claims, references and review requirements before deciding what the viewer needs to see.",
  },
  {
    icon: PenTool,
    title: "Shape the story",
    text: "Scripts, figure hierarchy, storyboards and visual references are shaped into a clear direction before production begins.",
  },
  {
    icon: Layers3,
    title: "Build the visual system",
    text: "Molecules, products, cells, materials, lighting and camera direction are developed into a coherent visual language.",
  },
  {
    icon: Sparkles,
    title: "Deliver for every channel",
    text: "Final assets are prepared as stills, loops, edits and presentation-ready exports for scientific and commercial use.",
  },
];

const capabilities = [
  "MOA animation",
  "MOD animation",
  "3D medical animation",
  "Graphical abstracts",
  "Journal cover art",
  "2D mechanism diagrams",
  "Exploded-view device CGI",
  "4K product renders",
  "Website hero visuals",
  "Investor deck assets",
  "Conference screen content",
];

const blogPosts = [
  {
    title: "How MOA Animation Turns Microscopic Complexity Into a Clear Scientific Story",
    tag: "Medical Animation",
    date: "May 2026",
    readTime: "5 min read",
    summary:
      "How receptors, pathways and cellular environments can be translated into animation that stays accurate while becoming easier to understand.",
  },
  {
    title: "What Makes a Graphical Abstract Work at Journal, Pitch and Website Scale",
    tag: "Publication Visuals",
    date: "May 2026",
    readTime: "4 min read",
    summary:
      "A practical look at hierarchy, contrast, simplification and scientific restraint when a single image needs to carry a complex idea.",
  },
  {
    title: "Using 3D Product Visualization to Explain Medical Devices and Technical Systems",
    tag: "Device CGI",
    date: "May 2026",
    readTime: "6 min read",
    summary:
      "How exploded views, macro details and hero renders help audiences understand form, function and internal innovation.",
  },
  {
    title: "Choosing Between Scientific Illustration, Motion Graphics and Full 3D Animation",
    tag: "Visual Strategy",
    date: "May 2026",
    readTime: "4 min read",
    summary:
      "A decision framework for matching format to mechanism, audience, timeline, review process and final use.",
  },
];

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = `${Math.round((event.clientX / window.innerWidth) * 100)}%`;
      const y = `${Math.round((event.clientY / window.innerHeight) * 100)}%`;
      document.documentElement.style.setProperty("--mouse-x", x);
      document.documentElement.style.setProperty("--mouse-y", y);
    };

    const handlePopState = () => setPath(window.location.pathname);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    const title =
      path === "/blog"
        ? "Blog | Lattice Visual"
        : "Lattice Visual | Scientific Animation & Product CGI";
    const description =
      path === "/blog"
        ? "Articles on MOA animation, scientific illustration, medical device CGI and visual strategy for research-led teams."
        : "Lattice Visual creates scientific animation, medical CGI, publication imagery and product visualisation for research-led companies.";

    document.title = title;
    document.querySelector("meta[name='description']")?.setAttribute("content", description);
  }, [path]);

  const navigate = (target) => {
    if (target.startsWith("#")) {
      if (path !== "/") {
        window.history.pushState({}, "", `/${target}`);
        setPath("/");
        requestAnimationFrame(() => document.querySelector(target)?.scrollIntoView());
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState({}, "", target);
      }
      return;
    }

    window.history.pushState({}, "", target);
    setPath(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <SiteHeader path={path} onNavigate={navigate} />
      {path === "/blog" ? <BlogPage onNavigate={navigate} /> : <HomePage onNavigate={navigate} />}
    </main>
  );
}

function SiteHeader({ path, onNavigate }) {
  const linkClass = (target) => (path === target ? "active" : "");

  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => onNavigate("/")} aria-label="Lattice Visual home">
        <img src="/assets/logo.png" alt="Lattice Visual" />
      </button>
      <nav aria-label="Primary navigation">
        <button type="button" onClick={() => onNavigate("#services")}>
          Services
        </button>
        <button type="button" onClick={() => onNavigate("#portfolio")}>
          Portfolio
        </button>
        <button type="button" onClick={() => onNavigate("#studio")}>
          Studio
        </button>
        <button className={linkClass("/blog")} type="button" onClick={() => onNavigate("/blog")}>
          Blog
        </button>
        <button type="button" onClick={() => onNavigate("#contact")}>
          Contact
        </button>
      </nav>
    </header>
  );
}

function HomePage({ onNavigate }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <UseCases />
      <Services />
      <FeaturedWork />
      <Studio />
      <Portfolio />
      <Process />
      <Deliverables />
      <Contact />
    </>
  );
}

function Hero({ onNavigate }) {
  return (
    <section id="top" className="hero-section">
      <ScienceHeroScene />
      <div className="hero-overlay" />
      <div className="mouse-glow" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow">Scientific Animation · Medical CGI · Product Visualisation</p>
        <h1>The art of structured vision</h1>
        <p className="hero-copy">
          Lattice Visual creates cinematic scientific animation, publication imagery and product CGI
          for research-led teams turning complex ideas into stories people can understand, trust and remember.
        </p>
        <div className="hero-actions">
          <button className="primary-button" type="button" onClick={() => onNavigate("#portfolio")}>
            View portfolio
            <ChevronRight size={18} strokeWidth={2.2} />
          </button>
          <button className="ghost-button" type="button" onClick={() => onNavigate("#services")}>
            Explore services
            <ArrowUpRight size={18} strokeWidth={2.2} />
          </button>
        </div>
      </div>
      <div className="hero-status" aria-label="Core capabilities">
        <span>MOA animation</span>
        <span>Publication imagery</span>
        <span>Device CGI</span>
      </div>
    </section>
  );
}

function ScienceHeroScene() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03070d, 0.065);

    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0.35, 0.15, 9.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const heroGroup = new THREE.Group();
    heroGroup.position.set(1.85, 0.05, 0);
    heroGroup.rotation.set(-0.1, -0.28, -0.18);
    scene.add(heroGroup);

    const dna = createDnaModel();
    dna.position.set(0.9, 0.05, -0.35);
    dna.scale.setScalar(0.98);
    heroGroup.add(dna);

    const protein = createProteinCluster();
    protein.position.set(-2.25, -0.42, 0.55);
    protein.scale.setScalar(0.9);
    heroGroup.add(protein);

    const secondProtein = createProteinCluster();
    secondProtein.position.set(2.45, 0.95, -1.1);
    secondProtein.scale.setScalar(0.48);
    heroGroup.add(secondProtein);

    const particles = createParticleField();
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0x8aaeff, 0.95));

    const key = new THREE.PointLight(0x63dfff, 48, 22);
    key.position.set(-3.4, 3.3, 4.6);
    scene.add(key);

    const rim = new THREE.PointLight(0x2d63ff, 64, 24);
    rim.position.set(3.2, -2.2, 4.8);
    scene.add(rim);

    const warm = new THREE.PointLight(0xffb7c8, 16, 18);
    warm.position.set(1.6, 2.6, 3.4);
    scene.add(warm);

    let frameId = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: 0, y: 0 };

    const resize = () => {
      width = Math.max(host.clientWidth, 1);
      height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event) => {
      const rect = host.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const animate = () => {
      const time = performance.now() * 0.001;
      heroGroup.rotation.y += 0.0023;
      heroGroup.rotation.x = -0.1 + pointer.y * 0.035 + Math.sin(time * 0.42) * 0.035;
      heroGroup.position.x = 1.85 + pointer.x * 0.18;
      dna.rotation.y += 0.0068;
      dna.rotation.z = Math.sin(time * 0.36) * 0.08;
      protein.rotation.y -= 0.004;
      protein.rotation.x = Math.sin(time * 0.5) * 0.08;
      secondProtein.rotation.y += 0.005;
      particles.rotation.y += 0.0008;
      particles.rotation.x = Math.sin(time * 0.18) * 0.04;
      camera.position.x += (pointer.x * 0.28 - camera.position.x + 0.35) * 0.025;
      camera.position.y += (-pointer.y * 0.18 - camera.position.y + 0.15) * 0.025;
      camera.lookAt(0.6, 0.02, 0);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onPointerMove);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="hero-canvas" ref={hostRef} aria-hidden="true" />;
}

function createDnaModel() {
  const group = new THREE.Group();
  const sphereGeometry = new THREE.SphereGeometry(0.075, 18, 18);
  const rungMaterial = new THREE.LineBasicMaterial({ color: 0x7bdcff, transparent: true, opacity: 0.5 });
  const strandMaterialA = new THREE.LineBasicMaterial({ color: 0x4be6ff, transparent: true, opacity: 0.8 });
  const strandMaterialB = new THREE.LineBasicMaterial({ color: 0x3f72ff, transparent: true, opacity: 0.76 });
  const atomMaterialA = new THREE.MeshStandardMaterial({
    color: 0x7bdcff,
    emissive: 0x0b6d9b,
    emissiveIntensity: 0.72,
    roughness: 0.28,
    metalness: 0.12,
  });
  const atomMaterialB = new THREE.MeshStandardMaterial({
    color: 0x2b67ff,
    emissive: 0x0537a8,
    emissiveIntensity: 0.8,
    roughness: 0.32,
    metalness: 0.18,
  });

  const strandA = [];
  const strandB = [];
  const rungVertices = [];
  const steps = 88;
  const height = 6.2;
  const radius = 0.86;

  for (let index = 0; index < steps; index += 1) {
    const progress = index / (steps - 1);
    const angle = progress * Math.PI * 7.2;
    const y = (progress - 0.5) * height;
    const pointA = new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    const pointB = new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius);
    strandA.push(pointA);
    strandB.push(pointB);
    rungVertices.push(pointA.x, pointA.y, pointA.z, pointB.x, pointB.y, pointB.z);

    if (index % 2 === 0) {
      const atomA = new THREE.Mesh(sphereGeometry, atomMaterialA);
      atomA.position.copy(pointA);
      group.add(atomA);

      const atomB = new THREE.Mesh(sphereGeometry, atomMaterialB);
      atomB.position.copy(pointB);
      group.add(atomB);
    }
  }

  const lineA = new THREE.Line(new THREE.BufferGeometry().setFromPoints(strandA), strandMaterialA);
  const lineB = new THREE.Line(new THREE.BufferGeometry().setFromPoints(strandB), strandMaterialB);
  const rungs = new THREE.LineSegments(
    new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(rungVertices, 3)),
    rungMaterial,
  );

  group.add(lineA, lineB, rungs);
  return group;
}

function createProteinCluster() {
  const group = new THREE.Group();
  const colors = [0xc7ecff, 0x6dd8ff, 0x4d72ff, 0xd9c28a];
  const materialCache = colors.map(
    (color) =>
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.15,
        roughness: 0.42,
        metalness: 0.02,
        transparent: true,
        opacity: 0.86,
      }),
  );

  for (let index = 0; index < 36; index += 1) {
    const radius = 0.13 + Math.random() * 0.17;
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 18, 18), materialCache[index % materialCache.length]);
    const angle = index * 1.74;
    const band = Math.sin(index * 0.83);
    mesh.position.set(
      Math.cos(angle) * (0.34 + Math.random() * 0.62),
      band * (0.34 + Math.random() * 0.56),
      Math.sin(angle) * (0.3 + Math.random() * 0.64),
    );
    group.add(mesh);
  }

  return group;
}

function createParticleField() {
  const count = 820;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const colorA = new THREE.Color(0x7bdcff);
  const colorB = new THREE.Color(0x2f62ff);
  const colorC = new THREE.Color(0xf0b5c9);

  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (Math.random() - 0.5) * 13;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 7;
    positions[index * 3 + 2] = (Math.random() - 0.5) * 8;
    const color = index % 7 === 0 ? colorC : index % 2 === 0 ? colorA : colorB;
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.026,
    vertexColors: true,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}

function UseCases() {
  return (
    <section className="usecase-section" aria-labelledby="usecase-title">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow">Where Visualisation Helps</p>
          <h2 id="usecase-title">For teams whose science needs to move beyond the slide deck.</h2>
        </div>
        <p>
          Strong scientific visuals do more than decorate a story. They help audiences see a mechanism,
          follow a product, remember a message and trust the organisation behind it.
        </p>
      </div>
      <div className="usecase-grid">
        {useCases.map((item) => (
          <article className="usecase-card tilt-card" key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="services-section" aria-labelledby="services-title">
      <span id="work" className="anchor-proxy" aria-hidden="true" />
      <div className="section-heading">
        <p className="eyebrow">Services</p>
        <h2 id="services-title">Visual communication for molecules, mechanisms, devices and launch stories.</h2>
      </div>
      <div className="service-stack">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <article className="service-panel tilt-card" key={service.title}>
              <div className="service-image">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="service-body">
                <div className="service-index">0{index + 1}</div>
                <Icon className="service-icon" size={30} strokeWidth={1.8} aria-hidden="true" />
                <p className="eyebrow">{service.eyebrow}</p>
                <h3>{service.title}</h3>
                <p>{service.intro}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>
                      <Orbit size={16} strokeWidth={1.8} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function FeaturedWork() {
  const doubled = useMemo(() => [...featuredWorks, ...featuredWorks], []);

  return (
    <section className="featured-strip" aria-labelledby="featured-title">
      <div className="strip-heading">
        <p className="eyebrow">Visual Directions</p>
        <h2 id="featured-title">Selected directions for molecular mechanisms, scientific illustration and product visualisation.</h2>
      </div>
      <div className="work-marquee" aria-label="Automatically scrolling featured work">
        <div className="work-track">
          {doubled.map((work, index) => (
            <article className="mini-work-card" key={`${work.title}-${index}`}>
              <img src={work.image} alt={work.title} />
              <div>
                <span>{work.type}</span>
                <strong>{work.title}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section id="studio" className="studio-section" aria-labelledby="studio-title">
      <div className="section-grid">
        <div>
          <p className="eyebrow">Studio Approach</p>
          <h2 id="studio-title">A specialist visual partner for science-led communication.</h2>
        </div>
        <div className="about-copy">
          <p>
            Lattice Visual works where scientific accuracy and visual craft need to meet. The focus is
            on making invisible processes, technical structures and research narratives easier to explain
            without flattening the science.
          </p>
          <p>
            Each project is treated as a communication system: one core idea can become a hero still,
            a short animation, a figure, a product visual and a set of campaign assets.
          </p>
        </div>
      </div>
      <div className="proof-grid" aria-label="Lattice Visual strengths">
        <article className="proof-card tilt-card">
          <Microscope size={24} aria-hidden="true" />
          <strong>Science-led thinking</strong>
          <p>Visual choices are grounded in mechanism, hierarchy, references and audience understanding.</p>
        </article>
        <article className="proof-card tilt-card">
          <CirclePlay size={24} aria-hidden="true" />
          <strong>Cinematic execution</strong>
          <p>Lighting, materials, camera movement and composition are used to make the explanation feel vivid.</p>
        </article>
        <article className="proof-card tilt-card">
          <Waypoints size={24} aria-hidden="true" />
          <strong>Channel-aware outputs</strong>
          <p>Assets can be adapted for publications, websites, decks, events, campaigns and social channels.</p>
        </article>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section id="portfolio" className="portfolio-section" aria-labelledby="portfolio-title">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow">Portfolio Preview</p>
          <h2 id="portfolio-title">A clear structure for your real work, organised by service type.</h2>
        </div>
        <p>
          The current visuals are temporary direction images. Your own scientific illustrations,
          renders and animation stills can replace them while keeping this same category structure.
        </p>
      </div>
      <div className="portfolio-groups">
        {portfolioGroups.map((group) => (
          <section className="portfolio-group" key={group.label} aria-label={group.label}>
            <div className="portfolio-group-header">
              <h3>{group.label}</h3>
              <p>{group.description}</p>
            </div>
            <div className="portfolio-grid">
              {group.works.map(([title, type, image]) => (
                <article className="portfolio-card tilt-card" key={title}>
                  <img src={image} alt={title} />
                  <div className="portfolio-card-copy">
                    <span>{type}</span>
                    <strong>{title}</strong>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="process-section" aria-labelledby="process-title">
      <div className="section-grid">
        <div>
          <p className="eyebrow">Process</p>
          <h2 id="process-title">A workflow built for scientific review and premium production.</h2>
        </div>
        <p className="lead">
          The process keeps the science reviewable while giving the final work the polish needed for
          commercial, academic and investor-facing contexts.
        </p>
      </div>
      <div className="process-grid">
        {workflow.map((step) => {
          const Icon = step.icon;
          return (
            <article className="process-card tilt-card" key={step.title}>
              <Icon size={24} strokeWidth={1.9} aria-hidden="true" />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Deliverables() {
  return (
    <section id="deliverables" className="deliverables-section" aria-labelledby="deliverables-title">
      <div className="deliverables-media tilt-card">
        <img src="/assets/product-visualization.png" alt="Transparent medical device visualization" />
      </div>
      <div className="deliverables-content">
        <p className="eyebrow">Deliverables</p>
        <h2 id="deliverables-title">One visual system, adapted across the places your audience sees it.</h2>
        <div className="deliverable-list">
          {capabilities.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-inner">
        <img src="/assets/logo.png" alt="Lattice Visual" />
        <p className="eyebrow">Start A Brief</p>
        <h2 id="contact-title">Bring a mechanism, manuscript, device or platform story into focus.</h2>
        <p>
          Send a research summary, sketch, manuscript excerpt, CAD reference, deck or animation outline.
          Lattice Visual can help turn it into a focused visual brief and production plan.
        </p>
        <a className="primary-button" href="mailto:latticevisualltd@gmail.com">
          <Mail size={18} strokeWidth={2.1} />
          latticevisualltd@gmail.com
        </a>
      </div>
    </section>
  );
}

function BlogPage({ onNavigate }) {
  return (
    <section className="blog-page" aria-labelledby="blog-title">
      <div className="blog-hero">
        <p className="eyebrow">Journal</p>
        <h1 id="blog-title">Notes on scientific animation, medical CGI and visual strategy.</h1>
        <p>
          Search-friendly articles can help future clients understand the value of MOA animation,
          publication visuals, product CGI and campaign-ready scientific content.
        </p>
        <button className="ghost-button" type="button" onClick={() => onNavigate("/")}>
          Back to homepage
          <ArrowUpRight size={18} strokeWidth={2.2} />
        </button>
      </div>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <article className="blog-card tilt-card" key={post.title}>
            <span className="blog-tag">{post.tag}</span>
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
            <div className="blog-meta">
              <span>
                <CalendarDays size={15} aria-hidden="true" />
                {post.date}
              </span>
              <span>
                <Clock3 size={15} aria-hidden="true" />
                {post.readTime}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
