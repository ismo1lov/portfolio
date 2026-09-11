import { useEffect, useRef, useState, type FormEvent } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import CurvedLoop from "../components/CurvedLoop";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Code2,
  Command,
  Facebook,
  Github,
  Instagram,
  Layers3,
  Linkedin,
  Menu,
  MoveUpRight,
  PenTool,
  Send,
  Sparkles,
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

const carouselSlides = [
  {
    image: "/work-stackline.svg",
    label: "Stackline / 2025",
    name: <>Stackline<br />in motion.</>,
    summary: "A fullstack product system where robust backend architecture meets a calm, high-converting interface. Strategy, product design and engineering.",
  },
  {
    image: "/work-apios.svg",
    label: "APIOS / 2024",
    name: <>APIs that<br />scale.</>,
    summary: "A resilient service layer and calm data experience for a product built to grow from first user to full team.",
  },
];

const skills = [
  {
    number: "01",
    title: "Digital direction",
    icon: <Command />,
    text: "I align a brand’s voice, system, and digital experience into one clear point of view.",
    tags: ["Art direction", "Brand systems", "Strategy"],
  },
  {
    number: "02",
    title: "Interface design",
    icon: <PenTool />,
    text: "I turn complex products into natural, clear, and distinctive interfaces.",
    tags: ["UX / UI", "Prototyping", "Design systems"],
  },
  {
    number: "03",
    title: "Creative code",
    icon: <Code2 />,
    text: "I craft fast, responsive front-end experiences that bring an idea to life on screen.",
    tags: ["React", "Motion", "Creative dev"],
  },
];

const miniWork = [
  ["02 / 2024", "KITE", "Identity / Digital"],
  ["09 / 2023", "NORTH", "Web experience"],
  ["04 / 2023", "MELA", "Product direction"],
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
  const [introState, setIntroState] = useState<"enter" | "exit" | "done">("enter");
  const [entered, setEntered] = useState(false);
  const [revisited] = useState(() => !!sessionStorage.getItem("intro-shown"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navDark, setNavDark] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    const floatEl = document.querySelector<HTMLElement>(".about-float");
    const corners = Array.from(document.querySelectorAll<HTMLElement>(".about-corner"));
    if (!floatEl && corners.length === 0) return;
    let rafId = 0;
    const duration = 5000;
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

    const isRevisit = sessionStorage.getItem("intro-shown") === "true" || revisited;
    sessionStorage.setItem("intro-shown", "true");

    let exitTimer: number | undefined;
    let doneTimer: number | undefined;
    let enterRaf: number | undefined;
    if (!isRevisit) {
      exitTimer = window.setTimeout(() => setIntroState("exit"), 1700);
      doneTimer = window.setTimeout(() => setIntroState("done"), 2550);
      enterRaf = window.requestAnimationFrame(() => setEntered(true));
    }
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 },
    );
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    const onScroll = () => {
      setScrolled(window.scrollY > 70);
      let dark = false;
      document.querySelectorAll<HTMLElement>("section, .work-feature").forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 84 && rect.bottom >= 84) {
          dark = isDarkBackground(getComputedStyle(element).backgroundColor);
        }
      });
      setNavDark(dark);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (exitTimer) window.clearTimeout(exitTimer);
      if (doneTimer) window.clearTimeout(doneTimer);
      if (enterRaf) window.cancelAnimationFrame(enterRaf);
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      locomotive.destroy();
      scrollRef.current = null;
    };
  }, []);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    if (id === "top") {
      scrollRef.current?.scrollTo(0, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else {
      scrollRef.current?.scrollTo(`#${id}`, {
        offset: 0,
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    }
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
<div className="site-shell" id="top">
      {!revisited && (
      <div className={`welcome-screen ${entered ? "is-enter" : ""} ${introState === "exit" || introState === "done" ? "is-exit" : ""} ${introState === "done" ? "is-done" : ""}`} aria-hidden="true">
          <div className="welcome-mark">
            <span className="welcome-kicker">Portfolio / 2024—2025</span>
            <span className="welcome-word-frame">
              <span className="welcome-word" aria-label={introWord}>
                {Array.from(introWord).map((char, index) => (
                  <span className="welcome-char" style={{ animationDelay: `${(0.15 + index * 0.045).toFixed(2)}s` }} key={index}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
              <span className="welcome-ring" aria-hidden="true"><span className="welcome-ring-l">&lt;</span><span className="welcome-ring-r">&gt;</span></span>
            </span>
            <span className="welcome-line" />
          </div>
        </div>
      )}

      <header className="nav-wrap">
        <nav className={`nav ${scrolled ? "is-scrolled" : "is-hero"} ${navDark ? "is-dark-section" : ""}`} aria-label="Main navigation">
          <button className="logo" onClick={() => handleNav("top")} aria-label="Go to top">
            <span className="logo-mark"><i className="logo-sym">&lt;</i>ismo<i className="logo-one">1</i>lov<i className="logo-sym">&gt;</i></span>
          </button>
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            {navItems.map(([label, id]) => (
              <a href={`#${id}`} key={id} onClick={(event) => { event.preventDefault(); handleNav(id); }}>
                {label}
              </a>
            ))}
          </div>
          <a className="nav-cta" href="mailto:salom@skstudio.uz">Let’s talk <ArrowUpRight size={14} /></a>
          <button className="nav-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true" />
          <div className="page-frame hero-copy">
            <div className="eyebrow reveal">Fullstack developer</div>
            <h1 className="hero-title reveal" data-delay="1" id="hero-title">Code that feels <em className="accent">alive.</em></h1>
            <div className="hero-bottom reveal" data-delay="2">
              <p className="hero-intro">I combine strategy, design, and code to craft digital experiences people remember.</p>
            </div>
          </div>
          <div className="scroll-cue"><span /> Scroll to explore <ArrowDown size={13} /></div>
        </section>

        <div className="ticker reveal" aria-label="Services ticker">
          <CurvedLoop marqueeText={`${tickerServices.join(" ✦ ")} ✦`} curveAmount={0} speed={1} direction="left" interactive={false} />
        </div>

        <section className="section section-about" id="about">
          <div className="section-frame">
            <div className="section-label reveal">A little context</div>
            <div className="about-grid">
              <div className="about-content">
                <h2 className="about-title reveal" data-reveal="left">Good work sits<br />between <em>logic</em><br />and instinct.</h2>
                <div className="about-body reveal" data-delay="1">
                  <p>As a <strong>creative developer and designer</strong>, I build digital worlds for brands that don’t just look pretty — they feel right.</p>
                  <p>Every project is a process of asking questions, stripping away what’s unnecessary, and ending up with something that feels just a little more interesting.</p>
                </div>
              </div>
              <div className="about-image reveal" data-reveal="scale">
                <div className="about-float">
                  <img src="/about-image.png" alt="Abstract developer portrait" />
                </div>
                <a className="about-corner about-corner-top" href="mailto:salom@skstudio.uz" aria-label="Contact"><span className="about-corner-label">Contact</span><ArrowRight size={16} /></a>
                <a className="about-corner about-corner-bottom" href="mailto:salom@skstudio.uz?subject=Download%20CV" aria-label="Download CV"><span className="about-corner-label">Download CV</span><ArrowRight size={16} /></a>
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
                  <div className="skill-icon">{skill.icon}</div>
                  <div>
                    <h2 className="skill-title">{skill.title}</h2>
                    <p className="skill-desc">{skill.text}</p>
                    <div className="skill-tags">{skill.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
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
              <p className="work-caption">Projects across different fields, one shared principle: clear thinking, good rhythm, no unnecessary noise.</p>
            </div>
            <div className="reveal" data-reveal="scale">
              <article className="work-feature">
                <div className="work-image">
                  <img src={carouselSlides[0].image} alt={`${carouselSlides[0].label} case study artwork`} />
                  <div className="work-code-card" aria-hidden="true"><span className="code-dot" /><span className="code-dot" /><span className="code-dot" /><div className="code-lines"><i /><i /><i /><i /><i /></div><b>ship / stable / 99.9%</b></div>
                  <span className="work-image-label">{carouselSlides[0].label}</span>
                </div>
                <div className="work-detail">
                  <div>
                    <div className="work-meta"><span>Featured project</span></div>
                    <h3 className="work-name">{carouselSlides[0].name}</h3>
                    <p className="work-summary">{carouselSlides[0].summary}</p>
                  </div>
                  <a className="work-link" href="mailto:salom@skstudio.uz?subject=Stackline%20case%20study">View case study <ArrowUpRight size={16} /></a>
                </div>
              </article>
            </div>
            <div className="work-list">
              {miniWork.map(([date, title, kind], index) => <a className="work-mini reveal" data-reveal="up" data-delay={index} href="mailto:salom@skstudio.uz" key={title}><small>{date}</small><h3>{title}</h3><p>{kind} <ArrowUpRight size={13} style={{ verticalAlign: "middle" }} /></p></a>)}
            </div>
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
          <CurvedLoop marqueeText={`${tickerServices.join(" ✦ ")} ✦`} curveAmount={0} speed={1} direction="right" interactive={false} />
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
                <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20} /></a>
                <a href="https://t.me/" target="_blank" rel="noreferrer" aria-label="Telegram"><Send size={20} /></a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={20} /></a>
                <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X"><Twitter size={20} /></a>
              </div>
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