import { useEffect, useRef, useState, type FormEvent } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import CurvedLoop from "../components/CurvedLoop";
import { CircularGallery, type GalleryItem } from "../components/ui/circular-gallery";
import DottedSurface from "../components/ui/dotted-surface";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Code2,
  Facebook,
  Github,
  Instagram,
  Layers3,
  Linkedin,
  Menu,
  Send,
  Twitter,
  X,
} from "lucide-react";

const navItems = [
  ["Home", "top"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Work", "work"],
  ["Notes", "notes"],
  ["Contact", "contact"],
];

const introWord = "ismo1lov";

const workGalleryItems: GalleryItem[] = [
  {
    common: "lumina",
    photo: {
      url: "/projects-img/lumina.jpg",
      text: "lumina",
    },
  },
  {
    common: "feyza",
    photo: {
      url: "/projects-img/feyza.jpg",
      text: "feyza",
    },
  },
  {
    common: "hrbpa",
    photo: {
      url: "/projects-img/hrbpa.png",
      text: "hrbpa",
    },
  },
  {
    common: "finway",
    photo: {
      url: "/projects-img/finwayjpg.jpg",
      text: "finway",
    },
  },
  {
    common: "bonitokids",
    photo: {
      url: "/projects-img/bonitokids.jpg",
      text: "bonitokids",
    },
  },
  {
    common: "lumina",
    photo: {
      url: "/projects-img/lumina.jpg",
      text: "lumina",
    },
  },
  {
    common: "feyza",
    photo: {
      url: "/projects-img/feyza.jpg",
      text: "feyza",
    },
  },
  {
    common: "hrbpa",
    photo: {
      url: "/projects-img/hrbpa.png",
      text: "hrbpa",
    },
  },
  {
    common: "finway",
    photo: {
      url: "/projects-img/finwayjpg.jpg",
      text: "finway",
    },
  },
  {
    common: "bonitokids",
    photo: {
      url: "/projects-img/bonitokids.jpg",
      text: "bonitokids",
    },
  },
];

const skills = [
  {
    number: "01",
    title: "Frontend Engineering",
    icon: <Code2 />,
    text: "I build fast, responsive, and modern web interfaces that deliver seamless user experiences.",
    tags: ["React.js", "Next.js", "JavaScript"],
  },
  {
    number: "02",
    title: "Backend & APIs",
    icon: <Blocks />,
    text: "I build robust server-side logic and RESTful APIs to power dynamic and scalable web applications.",
    tags: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    number: "03",
    title: "Clean Architecture",
    icon: <Layers3 />,
    text: "I apply analytical problem-solving and clean code practices to build optimized web solutions.",
    tags: ["Git / GitHub", "Optimization", "Clean Code"],
  },
];

const tickerServices = ["Fullstack development", "Brand systems", "Backend architecture", "Interaction design", "React / Node.js", "Cloud-ready builds"];

function isDarkBackground(color: string) {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return false;
  const [, r = "0", g = "0", b = "0", a = "1"] = match;
  if (Number(a) === 0) return false;
  const luminance = 0.299 * Number(r) + 0.587 * Number(g) + 0.114 * Number(b);
  return luminance < 140;
}

export default function Home() {
  const isReload =
    typeof window !== "undefined" &&
    (window.performance?.getEntriesByType?.("navigation")?.[0] as PerformanceNavigationTiming | undefined)?.type ===
      "reload";
  const [skipDrop] = useState(
    () => typeof window !== "undefined" && window.sessionStorage.getItem("intro:pre-reload-drop") === "1",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [navDark, setNavDark] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [particleColor, setParticleColor] = useState<[number, number, number]>([200, 200, 200]);
  const [particleHidden, setParticleHidden] = useState(false);
  const particleColorRef = useRef(particleColor);
  const particleHiddenRef = useRef(particleHidden);
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    const floatEl = document.querySelector<HTMLElement>(".about-float");
    const corners = Array.from(document.querySelectorAll<HTMLElement>(".about-corner"));
    if (!floatEl && corners.length === 0) return;
    let rafId = 0;
    const duration = 8000;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) % duration;
      const phase = (elapsed / duration) * Math.PI * 2;
      const offset = -Math.sin(phase) * 26;
      if (floatEl) {
        floatEl.style.transform = `translateY(${offset}px)`;
        floatEl.style.willChange = "transform";
      }
      corners.forEach((el) => {
        el.style.translate = `0 ${offset}px`;
        el.style.willChange = "transform";
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const locomotive = new LocomotiveScroll({
      lenisOptions: {
        smoothWheel: true,
        lerp: 0.1,
      },
    });
    scrollRef.current = locomotive;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    locomotive.scrollTo(0, { duration: 0 });

    let exitTimer: number | undefined;
    let doneTimer: number | undefined;
    let refreshTimer: number | undefined;
    const loader = document.querySelector<HTMLElement>(".welcome-screen");
    if (loader) {
      if (isReload) loader.classList.add("is-reload");
      if (skipDrop) loader.classList.add("is-skip");
    }
    window.sessionStorage.removeItem("intro:pre-reload-drop");
    exitTimer = window.setTimeout(() => {
      loader?.classList.add("is-exit");
    }, isReload ? 2050 : 2400);
    doneTimer = window.setTimeout(() => {
      loader?.classList.add("is-done");
    }, isReload ? 2950 : 3200);

    const onRefreshKeyDown = (event: KeyboardEvent) => {
      const wantsRefresh =
        event.key === "F5" ||
        ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "r");
      if (!wantsRefresh) return;
      event.preventDefault();
      if (window.sessionStorage.getItem("intro:pre-reload-drop") === "1") return;
      window.sessionStorage.setItem("intro:pre-reload-drop", "1");
      const overlay = document.querySelector<HTMLElement>(".welcome-screen");
      if (overlay) {
        overlay.classList.remove("is-enter", "is-exit", "is-done");
        overlay.classList.add("is-cover");
      }
      refreshTimer = window.setTimeout(() => window.location.reload(), 400);
    };
    window.addEventListener("keydown", onRefreshKeyDown);
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 },
    );
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    const onScroll = () => {
      setScrolled(window.scrollY > 70);
      let dark = false;
      let hidden = false;
      const probe = window.scrollY + window.innerHeight * 0.3;
      const centerY = window.innerHeight / 2;
      const vh = window.innerHeight;
      const workSection = document.getElementById("work");
      if (workSection) {
        const rect = workSection.getBoundingClientRect();
        hidden = rect.top < vh && rect.bottom > 0;
      }
      document.querySelectorAll<HTMLElement>("section, .work-feature, .stack-card").forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 84 && rect.bottom >= 84) {
          dark = isDarkBackground(getComputedStyle(element).backgroundColor);
        }
        if (rect.top <= centerY && rect.bottom >= centerY) {
          const isDark = isDarkBackground(getComputedStyle(element).backgroundColor);
          const next: [number, number, number] = isDark ? [200, 200, 200] : [0, 0, 0];
          if (
            particleColorRef.current[0] !== next[0] ||
            particleColorRef.current[1] !== next[1] ||
            particleColorRef.current[2] !== next[2]
          ) {
            particleColorRef.current = next;
            setParticleColor(next);
          }
        }
      });
      if (particleHiddenRef.current !== hidden) {
        particleHiddenRef.current = hidden;
        setParticleHidden(hidden);
      }
      setNavDark(dark);

      let active = "top";
      for (const [, id] of navItems) {
        if (id === "top") continue;
        const section = document.getElementById(id);
        if (!section) continue;
        if (probe >= section.getBoundingClientRect().top + window.scrollY) active = id;
      }
      setActiveSection((prev) => (prev === active ? prev : active));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (exitTimer) window.clearTimeout(exitTimer);
      if (doneTimer) window.clearTimeout(doneTimer);
      if (refreshTimer) window.clearTimeout(refreshTimer);
      window.removeEventListener("keydown", onRefreshKeyDown);
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      locomotive.destroy();
      scrollRef.current = null;
    };
  }, []);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);
    if (id === "top") {
      if (scrollRef.current) scrollRef.current.scrollTo(0, { duration: 1.2, easing: ease });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(id);
      if (!section) return;
      if (scrollRef.current) scrollRef.current.scrollTo(`#${id}`, { offset: 0, duration: 1.2, easing: ease });
      else section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
<div className="site-shell" id="top">
      <header className="nav-wrap">
        <nav className={`nav ${scrolled ? "is-scrolled" : "is-hero"} ${navDark ? "is-dark-section" : ""}`} aria-label="Main navigation">
          <button className="logo" onClick={() => handleNav("top")} aria-label="Go to top">
            <span className="logo-mark"><i className="logo-sym">&lt;</i>ismo<i className="logo-one">1</i>lov<i className="logo-sym">&gt;</i></span>
          </button>
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            {navItems.map(([label, id]) => (
              <a href={`#${id}`} key={id} onClick={(event) => { event.preventDefault(); handleNav(id); }} className={activeSection === id ? "is-active" : ""}>
                {label}
              </a>
            ))}
          </div>
          <a className="nav-cta" href="#contact" onClick={(event) => { event.preventDefault(); handleNav("contact"); }}>Let’s talk <ArrowUpRight size={14} /></a>
          <button className="nav-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <DottedSurface size={8} opacity={0.8} sizeAttenuation vertexColors particleColor={particleColor} hidden={particleHidden} aria-hidden="true" />
          <div className="hero-art" aria-hidden="true" />
          <div className="page-frame hero-copy">
            <div className="eyebrow reveal">Fullstack developer</div>
            <h1 className="hero-title reveal" data-delay="1" id="hero-title">Code that feels <em className="accent">alive.</em></h1>
            <div className="hero-bottom reveal" data-delay="2">
              <p className="hero-intro">Full-stack developer engineering fast responsive frontend interfaces backed by robust logic.</p>
            </div>
          </div>
          <div className="hero-social" aria-label="Social media links">
            <span className="hero-social-line" aria-hidden="true" />
            <div className="hero-social-links">
              <a href="https://github.com/ismo1lov" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
              <a href="https://www.linkedin.com/in/ismo1lov" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="https://www.instagram.com/ismo1lovabdulloh/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://t.me/AbdullohIsmoilov" target="_blank" rel="noreferrer" aria-label="Telegram"><Send size={18} /></a>
            </div>
            <span className="hero-social-line" aria-hidden="true" />
          </div>
          <div className="scroll-cue"><span /> Scroll to explore <ArrowDown size={13} /></div>
        </section>

        <div className="ticker reveal" aria-label="Services ticker">
          <CurvedLoop marqueeText={`${tickerServices.join(" ✦ ")} ✦`} curveAmount={0} speed={1} direction="left" interactive={false} scrollDriven />
        </div>

        <section className="section section-about" id="about">
          <div className="section-frame">
            <div className="section-label reveal">A little context</div>
            <div className="about-grid">
              <div className="about-content">
                <h2 className="about-title reveal" data-reveal="left">Hi, I’m Abdulloh<br />Ismoilov, a<br /><em>Full-Stack</em> dev.</h2>
                <div className="about-body reveal" data-delay="1">
                  <p>I specialize in building fast, responsive frontend interfaces and scalable backend solutions. My real-world experience at Odilsoft allows me to craft digital products that deliver real value.</p>
                  <p>Combining an Economics background with modern web technology, I bring strong analytical thinking and problem-solving to every project.</p>
                </div>
              </div>
              <div className="about-image reveal" data-reveal="scale">
                <div className="about-float">
                  <img src="/about-image.png" alt="Abstract developer portrait" />
                </div>
                <a className="about-corner about-corner-top" href="#contact" onClick={(event) => { event.preventDefault(); handleNav("contact"); }} aria-label="Contact"><span className="about-corner-label">Contact</span><ArrowRight size={16} /></a>
                <a className="about-corner about-corner-bottom" href="/Ismoilov%20Abdulloh.pdf" target="_blank" rel="noreferrer" aria-label="Download CV"><span className="about-corner-label">Download CV</span><ArrowRight size={16} /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-dark" id="skills">
          <div className="section-frame">
            <div className="section-label reveal">What I bring</div>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <article className="skill-card reveal" data-reveal="scale" data-delay={index} key={skill.number}>
                  <div className="skill-head">
                    <h2 className="skill-title">{skill.title}</h2>
                    <div className="skill-icon">{skill.icon}</div>
                  </div>
                  <p className="skill-desc">{skill.text}</p>
                  <div className="skill-tags">{skill.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="section-frame">
            <div className="section-label reveal">Selected work</div>
            <div className="work-header reveal">
              <h2 className="work-title">A few things<br />I’ve made <em>recently.</em></h2>
              <img className="work-illus" src="/work-ilus.svg" alt="Work illustration" />
            </div>
          </div>
          <div className="work-gallery reveal">
            <CircularGallery items={workGalleryItems} radius={470} />
          </div>
        </section>

        <section className="section section-acid" id="notes">
          <div className="section-frame">
            <div className="section-label reveal">A note from the process</div>
            <div className="note-wrap">
              <span className="note-mark reveal" data-reveal="scale" aria-hidden="true">“</span>
              <blockquote className="note-quote reveal" data-reveal="fade">
                <p>Beautiful design is not decoration — it’s the <em>quiet signal</em> that shows people their next step with confidence.</p>
                <cite>— A working principle, not a slogan</cite>
              </blockquote>
            </div>
          </div>
        </section>

        <div className="ticker ticker-dark reveal" aria-label="Services ticker">
          <CurvedLoop marqueeText={`${tickerServices.join(" ✦ ")} ✦`} curveAmount={0} speed={1} direction="right" interactive={false} scrollDriven />
        </div>

        <section className="contact" id="contact">
          <div className="section-frame">
            <div className="section-label reveal">Start a conversation</div>
            <div className="contact-top">
              <h2 className="contact-title reveal" data-reveal="scale">Have a good<br /><span>idea?</span></h2>
              <form className="contact-form reveal" data-reveal="right" onSubmit={handleContactSubmit}>
                <div className="contact-field">
                  <label htmlFor="contact-name">Your name</label>
                  <input id="contact-name" name="name" type="text" placeholder="Jane Doe" autoComplete="name" required />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" name="email" type="email" placeholder="you@studio.uz" autoComplete="email" required />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="message" rows={4} placeholder="Tell me about your project…" required />
                </div>
                {submitted ? (
                  <p className="contact-sent" role="status"><span className="contact-sent-dot" /> Thanks — I’ll get back to you soon.</p>
                ) : (
                  <button className="contact-submit" type="submit">Send message <ArrowUpRight size={15} /></button>
                )}
              </form>
            </div>
          </div>
        </section>
        <footer className="site-footer reveal" data-reveal="fade">
          <div className="section-frame">
            <div className="footer-main">
              <div className="footer-brand">
                <a className="footer-logo" href="#top" onClick={(event) => { event.preventDefault(); handleNav("top"); }}>
                  <span className="logo-mark"><i className="logo-sym">&lt;</i>ismo<i className="logo-one">1</i>lov<i className="logo-sym">&gt;</i></span>
                </a>
                <p className="footer-tagline">Fullstack developer crafting calm, deliberate digital products. Let’s build something good together.</p>
              </div>
              <div className="footer-socials" aria-label="Social media links">
                <a href="https://github.com/ismo1lov" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20} /></a>
                <a href="https://t.me/AbdullohIsmoilov" target="_blank" rel="noreferrer" aria-label="Telegram"><Send size={20} /></a>
                <a href="https://www.linkedin.com/in/ismo1lov" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
                <a href="https://www.instagram.com/ismo1lovabdulloh/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
                <a href="https://www.facebook.com/profile.php?id=61555173012563" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={20} /></a>
                <a href="https://x.com/RaidMirzak83586" target="_blank" rel="noreferrer" aria-label="X"><Twitter size={20} /></a>
              </div>
            </div>
            <div className="footer-contact">
              <a href="tel:+998977318666" aria-label="Call">tel: +998 97 731 86 66</a>
              <a href="mailto:mirzakarimovrasid@gmail.com" aria-label="Email">mirzakarimovrasid@gmail.com</a>
            </div>
            <div className="footer-bottom">
              <span>© 2026 &lt;ismo1lov/&gt; / Made with intent.</span>
              <a className="footer-back" href="#top" onClick={(event) => { event.preventDefault(); handleNav("top"); }}>Back to top <ArrowUpRight size={13} /></a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}