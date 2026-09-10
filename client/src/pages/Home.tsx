import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Code2,
  Command,
  Layers3,
  Menu,
  MoveUpRight,
  PenTool,
  Sparkles,
  X,
} from "lucide-react";

const navItems = [
  ["Intro", "top"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Work", "work"],
  ["Notes", "notes"],
  ["Contact", "contact"],
];

const carouselSlides = [
  {
    image: "/manus-storage/greenline-work_f706024f.png",
    label: "Northstar / 2024",
    name: <>Northstar<br />in motion.</>,
    summary: "A travel platform that turns planning into a feeling of forward motion. Strategy, identity, product design and a new digital home.",
  },
  {
    image: "/manus-storage/greenline-hero_6d7418bf.png",
    label: "Kite / 2024",
    name: <>Kite<br />takes flight.</>,
    summary: "A sharper brand world and a high-converting digital experience for a new generation of ambitious products.",
  },
];

const skills = [
  {
    number: "01",
    title: "Digital direction",
    icon: <Command />,
    text: "Brendning ovozini, tizimini va raqamli tajribasini bir nuqtaga yig‘aman.",
    tags: ["Art direction", "Brand systems", "Strategy"],
  },
  {
    number: "02",
    title: "Interface design",
    icon: <PenTool />,
    text: "Murakkab mahsulotlarni tabiiy, tushunarli va o‘ziga xos interfeyslarga aylantiraman.",
    tags: ["UX / UI", "Prototyping", "Design systems"],
  },
  {
    number: "03",
    title: "Creative code",
    icon: <Code2 />,
    text: "G‘oyani ekranda jonlantiradigan, tez va sezgir front-end tajribalarni quraman.",
    tags: ["React", "Motion", "Creative dev"],
  },
];

const miniWork = [
  ["02 / 2024", "KITE", "Identity / Digital"],
  ["09 / 2023", "NORTH", "Web experience"],
  ["04 / 2023", "MELA", "Product direction"],
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntroDone(true), 1450);
    const carouselTimer = window.setInterval(() => setActiveSlide((slide) => (slide + 1) % carouselSlides.length), 5200);
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 },
    );
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

    let ticking = false;
    const parallax = () => {
      const scrollY = window.scrollY;
      document.querySelectorAll("[data-parallax]").forEach((element) => {
        const speed = Number(element.getAttribute("data-parallax")) || 0.08;
        (element as HTMLElement).style.transform = `translate3d(0, ${scrollY * speed * -1}px, 0)`;
      });
      ticking = false;
    };
    const onScroll = () => {
      setScrolled(window.scrollY > 70);
      if (!ticking) {
        window.requestAnimationFrame(parallax);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(introTimer);
      window.clearInterval(carouselTimer);
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <div className="site-shell" id="top">
      <div className={`welcome-screen ${introDone ? "is-done" : ""}`} aria-hidden="true">
        <div className="welcome-mark">
          <span className="welcome-kicker">Portfolio / 2024—2025</span>
          <span className="welcome-word">&lt;ismo1lov/&gt;</span>
          <span className="welcome-line" />
        </div>
      </div>

      <header className="nav-wrap">
        <nav className={`nav ${scrolled ? "is-scrolled" : "is-hero"}`} aria-label="Main navigation">
          <button className="logo" onClick={() => handleNav("top")} aria-label="Go to top">
            <span className="logo-dot" />
            <span>&lt;ismo1lov/&gt;</span>
          </button>
          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            {navItems.map(([label, id]) => (
              <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
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
          <div className="hero-art" data-parallax="0.035">
            <img src="/manus-storage/ismo1lov-dev-hero_24dfba37.png" alt="Abstract fullstack developer network and code visual" />
          </div>
          <div className="grid-overlay" />
          <div className="page-frame hero-copy">
            <div className="eyebrow reveal">Fullstack developer / Tashkent, UZ</div>
            <h1 className="hero-title reveal" id="hero-title">Code that feels <em className="accent">alive.</em></h1>
            <div className="hero-bottom reveal">
              <p className="hero-intro">Men strategiya, design va kodni birlashtirib, odamlar eslab qoladigan raqamli tajribalar yarataman.</p>
              <div className="hero-note"><span className="pulse" /> Available for select projects</div>
            </div>
          </div>
          <div className="scroll-cue"><span /> Scroll to explore <ArrowDown size={13} /></div>
        </section>

        <div className="ticker" aria-label="Services ticker">
          <div className="ticker-track">
            {["Fullstack development", "Brand systems", "Backend architecture", "Interaction design", "React / Node.js", "Cloud-ready builds", "Fullstack development", "Brand systems", "Backend architecture", "Interaction design", "React / Node.js", "Cloud-ready builds"].map((item, index) => <span className="ticker-item" key={`${item}-${index}`}>{item}</span>)}
          </div>
        </div>

        <section className="section" id="about">
          <div className="section-frame">
            <div className="section-label reveal"><b>02</b> / A little context</div>
            <div className="about-grid">
              <h2 className="about-title reveal">Good work sits<br />between <em>logic</em><br />and instinct.</h2>
              <div className="about-body reveal">
                <p>Men <strong>creative developer va designer</strong> sifatida brendlar uchun faqat chiroyli ko‘rinish emas, balki to‘g‘ri his qilinadigan raqamli dunyolar quraman.</p>
                <p>Har bir loyiha — savol berish, keraksizini olib tashlash va oxirida odamga bir oz ko‘proq qiziq tuyuladigan narsa yaratish jarayoni.</p>
                <span className="signature">ismo1lov / Independent fullstack developer</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-dark" id="skills">
          <div className="section-frame">
            <div className="section-label reveal"><b>03</b> / What I bring</div>
            <div className="skills-grid reveal">
              {skills.map((skill) => (
                <article className="skill-card" key={skill.number}>
                  <div className="skill-icon"><span className="skill-index">{skill.number}</span>{skill.icon}</div>
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
            <div className="section-label reveal"><b>04</b> / Selected work</div>
            <div className="work-header reveal">
              <h2 className="work-title">A few things<br />I’ve made <em>recently.</em></h2>
              <p className="work-caption">Turli sohalardagi loyihalar, bir xil tamoyil: aniq fikr, yaxshi ritm, keraksiz shovqinsiz.</p>
            </div>
            <article className="work-feature" key={activeSlide}>
              <div className="work-image">
                <img src={carouselSlides[activeSlide].image} alt={`${carouselSlides[activeSlide].label} case study artwork`} />
                <span className="work-image-label">{carouselSlides[activeSlide].label}</span>
              </div>
              <div className="work-detail">
                <div>
                  <div className="work-meta"><span>Featured project</span><span>01 / 04</span></div>
                  <h3 className="work-name">{carouselSlides[activeSlide].name}</h3>
                  <p className="work-summary">{carouselSlides[activeSlide].summary}</p>
                </div>
                <a className="work-link" href="mailto:salom@skstudio.uz?subject=Northstar%20case%20study">View case study <ArrowUpRight size={16} /></a>
                <div className="carousel-controls" aria-label="Portfolio carousel controls">
                  {carouselSlides.map((slide, index) => <button key={slide.label} className={index === activeSlide ? "is-active" : ""} onClick={() => setActiveSlide(index)} aria-label={`Show ${slide.label}`} />)}
                </div>
              </div>
            </article>
            <div className="work-list reveal">
              {miniWork.map(([date, title, kind]) => <a className="work-mini" href="mailto:salom@skstudio.uz" key={title}><small>{date}</small><h3>{title}</h3><p>{kind} <ArrowUpRight size={13} style={{ verticalAlign: "middle" }} /></p></a>)}
            </div>
          </div>
        </section>

        <section className="section section-acid" id="notes">
          <div className="section-frame">
            <div className="section-label reveal"><b>05</b> / A note from the process</div>
            <div className="quote-wrap">
              <h2 className="quote-title reveal"><span className="quote-mark">“</span>Make it simple.<br />Make it matter.</h2>
              <blockquote className="reveal">
                <p className="quote">“Ajoyib dizayn dekoratsiya emas. U odamga keyingi qadamni ishonch bilan ko‘rsatadigan kichik signal.”</p>
                <cite>— A working principle, not a slogan</cite>
              </blockquote>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="section-frame">
            <div className="section-label reveal"><b>06</b> / Start a conversation</div>
            <div className="contact-top">
              <h2 className="contact-title reveal">Have a good<br /><span>idea?</span></h2>
              <p className="contact-side reveal">Yangi loyiha, hamkorlik yoki shunchaki salom aytish uchun yozing. Men har doim yaxshi savolga vaqt topaman.</p>
            </div>
            <a className="contact-button reveal" href="mailto:salom@skstudio.uz">salom@skstudio.uz <ArrowUpRight size={16} /></a>
            <footer className="footer"><span>© 2025 &lt;ismo1lov/&gt; / Made with intent.</span><div className="footer-links"><a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a><a href="#top">Back to top <ArrowRight size={12} style={{ verticalAlign: "middle" }} /></a></div></footer>
          </div>
        </section>
      </main>
    </div>
  );
}
