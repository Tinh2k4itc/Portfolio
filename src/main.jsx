import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { FaAws, FaCss3Alt, FaGithub, FaHtml5, FaJava, FaNodeJs } from "react-icons/fa";
import {
  SiBlockchaindotcom,
  SiDocker,
  SiJavascript,
  SiNextdotjs,
  SiPytorch,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiSolidity,
  SiSpringboot,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";
import {
  TbArrowRight,
  TbBrain,
  TbExternalLink,
  TbLock,
  TbSchool,
  TbSettingsCog,
  TbShieldCheck,
  TbWorld,
} from "react-icons/tb";
import "./styles.css";

const profileLinks = {
  github: "https://github.com/Tinh2k4itc/",
  linkedin: "https://linkedin.com/in/tinhphan/",
  twitter: "https://twitter.com/",
  email: "mailto:tinh2004.it@gmail.com",
  phone: "tel:+84344769469",
};

const projects = [
  {
    id: "essay",
    title: "AI-Powered Korean Essay Evaluation System",
    subtitle: "Automated Korean essay grading with OCR, KoBERT and AI feedback.",
    image: "/assets/essay-project.png",
    repository: profileLinks.github,
    role: "Backend & Frontend",
    duration: "Sep 2024 - Mar 2025",
    tags: ["FastAPI", "PyTorch", "KoBERT", "React", "Firebase"],
    metrics: [
      ["OCR Accuracy", "82.25%"],
      ["Speed Improvement", "41.1%"],
      ["Plagiarism Detection", "100%"],
    ],
  },
  {
    id: "blockchain",
    title: "Decentralized Degree Verification System",
    subtitle: "Privacy-preserving blockchain verification for academic credentials.",
    image: "/assets/blockchain-project.png",
    repository: "https://github.com/Tinh2k4itc/BlockchainCelo",
    role: "Backend Developer",
    duration: "2024",
    tags: ["Solidity", "TypeScript", "Hardhat", "Viem", "Celo"],
    metrics: [
      ["Privacy", "Keccak256"],
      ["Access", "Role-based"],
      ["Testing", "Automated"],
    ],
  },
];

const techGroups = [
  {
    title: "Backend",
    items: [
      { label: "Java", icons: [FaJava], color: "#f89820" },
      { label: "Python", icons: [SiPython], color: "#ffd43b" },
      { label: "Node.js", icons: [FaNodeJs], color: "#68a063" },
      { label: "Spring Boot", icons: [SiSpringboot], color: "#6db33f" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { label: "React", icons: [SiReact], color: "#61dafb" },
      { label: "HTML/CSS", icons: [FaHtml5, FaCss3Alt], color: "#38bdf8" },
      { label: "JavaScript", icons: [SiJavascript], color: "#f7df1e" },
      { label: "Next.js", icons: [SiNextdotjs], color: "#ffffff" },
    ],
  },
  {
    title: "AI & Tools",
    items: [
      { label: "PyTorch", icons: [SiPytorch], color: "#ee4c2c" },
      { label: "TensorFlow", icons: [SiTensorflow], color: "#ff6f00" },
      { label: "Scikit-learn", icons: [SiScikitlearn], color: "#f7931e" },
      { label: "Docker", icons: [SiDocker], color: "#2496ed" },
      { label: "AWS", icons: [FaAws], color: "#ff9900" },
      { label: "Tivamne", icons: [TbBrain], color: "#25dfe8" },
    ],
  },
];

const expertise = [
  {
    title: "AI & Data Science",
    skills: [
      ["KoBERT", 90],
      ["PyTorch", 85],
      ["OpenCV", 80],
    ],
  },
  {
    title: "Backend Mastery",
    skills: [
      ["Java Spring", 90],
      ["FastAPI", 85],
      [".NET", 80],
    ],
  },
  {
    title: "Frontend Excellence",
    skills: [
      ["React", 90],
      ["Flutter", 80],
      ["TypeScript", 85],
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      ["Docker", 85],
      ["Git", 90],
      ["Firebase", 80],
    ],
  },
];

const certifications = [
  "Phenikaa University",
  "AWS Certified Cloud Practitioner",
  "Celo Blockchain Developer",
];

const certificationDetails = {
  "Phenikaa University": {
    Icon: TbSchool,
    kicker: "Education",
    title: "Phenikaa University",
    color: "#25dfe8",
  },
  "AWS Certified Cloud Practitioner": {
    Icon: FaAws,
    kicker: "Certified",
    title: "AWS Cloud Practitioner",
    color: "#ff9900",
  },
  "Celo Blockchain Developer": {
    Icon: SiBlockchaindotcom,
    kicker: "Certified",
    title: "Celo Blockchain Developer",
    color: "#35d07f",
  },
};

function useHashRoute() {
  const getRoute = () => window.location.hash.replace("#", "") || "home";
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      const nextRoute = getRoute();
      const section = document.getElementById(nextRoute);

      if (section && (nextRoute === "projects" || nextRoute === "contact")) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

function goTo(route) {
  window.location.hash = route === "home" ? "" : route;
}

function App() {
  const route = useHashRoute();
  const selectedProject = useMemo(
    () => projects.find((project) => route === `project-${project.id}`),
    [route],
  );

  if (selectedProject) {
    return (
      <>
        <TwinkleStars />
        <StarCursor />
        <ProjectDetail project={selectedProject} />
      </>
    );
  }

  return (
    <>
      <TwinkleStars />
      <StarCursor />
      <Header active={route} />
      {route === "experience" ? <ExperiencePage /> : <HomePage />}
    </>
  );
}

function StarCursor() {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || reducedMotion) {
      return undefined;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let lastX = mouseX;
    let lastY = mouseY;
    let lastTrail = 0;
    let trailIndex = 0;
    let frameId = 0;

    document.body.classList.add("custom-cursor-enabled");

    const spawnTrail = (x, y, dx, dy, distance) => {
      const trail = trailRefs.current[trailIndex % trailRefs.current.length];

      if (!trail) return;

      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const length = Math.min(96, Math.max(26, distance * 1.35));
      const driftX = -dx * 0.16 + (Math.random() - 0.5) * 10;
      const driftY = -dy * 0.16 + (Math.random() - 0.5) * 10;
      const scale = 0.72 + Math.random() * 0.48;

      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      trail.style.width = `${length}px`;
      trail.style.setProperty("--angle", `${angle}deg`);
      trail.style.setProperty("--tx", `${driftX}px`);
      trail.style.setProperty("--ty", `${driftY}px`);
      trail.style.setProperty("--scale", scale);
      trail.classList.remove("active");
      void trail.offsetWidth;
      trail.classList.add("active");

      trailIndex += 1;
    };

    const handlePointerMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      const now = performance.now();
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const distance = Math.hypot(dx, dy);

      if (distance > 7 && now - lastTrail > 16) {
        spawnTrail(mouseX, mouseY, dx, dy, distance);
        lastX = mouseX;
        lastY = mouseY;
        lastTrail = now;
      }
    };

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.32;
      cursorY += (mouseY - cursorY) * 0.32;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      }

      frameId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    frameId = requestAnimationFrame(animateCursor);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div className="star-cursor" ref={cursorRef}>
        <span className="cursor-halo" />
        <span className="cursor-star" />
      </div>
      {Array.from({ length: 24 }, (_, index) => (
        <span
          className="cursor-trail"
          key={index}
          ref={(element) => {
            trailRefs.current[index] = element;
          }}
        />
      ))}
    </div>
  );
}

function TwinkleStars() {
  const starShapes = [
    [8, 18, 0.9, 2.4, -0.2],
    [16, 42, 0.7, 3.1, -1.4],
    [26, 12, 1.1, 2.7, -0.9],
    [34, 58, 0.8, 3.5, -2.2],
    [43, 28, 0.65, 2.9, -1.1],
    [51, 74, 1.0, 3.3, -0.5],
    [62, 16, 0.75, 2.6, -1.8],
    [70, 46, 1.15, 3.8, -2.6],
    [79, 22, 0.85, 2.8, -0.7],
    [88, 64, 0.7, 3.2, -1.9],
    [94, 36, 1.0, 2.5, -1.2],
    [11, 78, 0.8, 3.6, -2.8],
    [23, 88, 0.6, 2.9, -0.3],
    [56, 8, 0.9, 3.4, -2.1],
    [84, 82, 0.75, 2.7, -1.5],
    [4, 54, 0.65, 3.9, -3.1],
    [38, 84, 0.95, 2.8, -1.7],
    [73, 9, 0.62, 3.0, -0.8],
  ];
  const roundStars = [
    [6, 28, 3, 2.8, -0.6],
    [14, 66, 2, 3.5, -1.6],
    [22, 24, 4, 2.5, -2.1],
    [31, 46, 2, 3.2, -0.9],
    [39, 18, 3, 2.9, -1.3],
    [45, 68, 4, 3.8, -2.7],
    [57, 36, 2, 2.6, -0.4],
    [64, 54, 3, 3.1, -2.2],
    [71, 30, 2, 2.7, -1.0],
    [81, 74, 4, 3.6, -2.9],
    [89, 18, 3, 2.4, -1.8],
    [96, 52, 2, 3.0, -0.7],
    [19, 86, 3, 3.4, -2.4],
    [52, 91, 2, 2.8, -1.5],
    [77, 6, 3, 3.3, -2.0],
    [92, 89, 4, 2.9, -0.2],
  ];

  return (
    <div className="twinkle-layer" aria-hidden="true">
      {roundStars.map(([x, y, size, duration, delay], index) => (
        <i
          className="round-star"
          key={`round-${index}`}
          style={{
            "--x": `${x}vw`,
            "--y": `${y}vh`,
            "--size": `${size}px`,
            "--duration": `${duration}s`,
            "--delay": `${delay}s`,
          }}
        />
      ))}
      {starShapes.map(([x, y, scale, duration, delay], index) => (
        <i
          className="twinkle-star"
          key={`shape-${index}`}
          style={{
            "--x": `${x}vw`,
            "--y": `${y}vh`,
            "--scale": scale,
            "--duration": `${duration}s`,
            "--delay": `${delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function Header({ active }) {
  const links = [
    ["home", "Home"],
    ["projects", "Projects"],
    ["experience", "Experience"],
    ["contact", "Contact"],
  ];

  return (
    <header className="site-header">
      <button className="brand" onClick={() => goTo("home")} aria-label="Go to home">
        PVT
      </button>
      <nav aria-label="Primary navigation">
        {links.map(([route, label]) => (
          <button
            key={route}
            className={active === route ? "active" : ""}
            onClick={() => {
              goTo(route);
            }}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <main>
      <Hero />
      <TechStack />
      <ExperienceTimeline compact />
      <FeaturedProjects />
      <Education />
      <Contact />
    </main>
  );
}

function Hero() {
  return (
    <section className="hero section-band">
      <div className="circuit-bg" />
      <div className="hero-inner">
        <p className="eyebrow">Portfolio</p>
        <h1>PHAN VAN TINH</h1>
        <h2>AI Trainee | Full-stack Developer</h2>
        <p>
          Passionate about leveraging artificial intelligence and full-stack development
          to build innovative, impactful solutions.
        </p>
        <div className="actions">
          <button className="primary" onClick={() => document.getElementById("projects")?.scrollIntoView()}>
            View Projects
          </button>
          <a className="secondary" href="/2026_AI Course_PhanVanTinh.pdf">
            Download CV
          </a>
        </div>
        <div className="social-strip" aria-label="Contact links">
          <a href={profileLinks.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profileLinks.email}>Email</a>
          <a href={profileLinks.phone}>Phone</a>
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section className="section shell">
      <div className="section-title">
        <h2>Tech Stack</h2>
      </div>
      <div className="tech-grid">
        {techGroups.map((group) => (
          <article className="tech-group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="skill-tiles">
              {group.items.map((item) => (
                <div className="skill-tile" key={item.label} style={{ "--icon-color": item.color }}>
                  <span className="skill-mark" aria-hidden="true">
                    {item.icons.map((Icon, index) => (
                      <Icon className="tech-icon" key={`${item.label}-${index}`} />
                    ))}
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturedProjects() {
  return (
    <section className="section shell" id="projects">
      <div className="section-title">
        <h2>Featured Projects</h2>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.id}>
            <button className="project-image" onClick={() => goTo(`project-${project.id}`)}>
              <img src={project.image} alt={`${project.title} preview`} />
            </button>
            <div className="project-body">
              <h3>{project.title}</h3>
              <div className="tag-row">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <p>{project.subtitle}</p>
              <div className="card-actions">
                <a href={project.repository} target="_blank" rel="noreferrer">GitHub</a>
                <button onClick={() => goTo(`project-${project.id}`)}>Live Demo</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExperienceTimeline({ compact = false }) {
  return (
    <section className={`section shell ${compact ? "compact-section" : ""}`}>
      <div className="section-title">
        <h2>{compact ? "Experience Timeline" : "Professional Experience Timeline"}</h2>
      </div>
      <div className="timeline">
        <article>
          <span className="dot" />
          <h3>FPT Software | AI Trainee</h3>
          <p className="date">2023 - Present</p>
          <ul>
            <li>Assisted in developing machine learning models for client projects.</li>
            <li>Gained practical experience in full-stack tasks with React and Java.</li>
            <li>Contributed to research, documentation and team delivery.</li>
          </ul>
        </article>
        <article>
          <span className="dot" />
          <h3>ITSUPRO | Full-stack Developer Intern</h3>
          <p className="date">2022 - 2023</p>
          <ul>
            <li>Developed and maintained web applications using Python and JavaScript.</li>
            <li>Implemented frontend interfaces and integrated backend APIs.</li>
            <li>Participated in code reviews and cross-browser testing.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section shell education">
      <div className="section-title">
        <h2>Education & Certifications</h2>
      </div>
      <div className="education-layout">
        <div className="university">
          <h3>Phenikaa University</h3>
          <p>Bachelor of Science in Information Technology</p>
          <p>Graduation Year: 2024</p>
        </div>
        <div className="cert-list">
          {certifications.slice(1).map((certName) => {
            const cert = certificationDetails[certName];
            const Icon = cert.Icon;

            return (
            <div className="cert-badge" key={certName} style={{ "--cert-color": cert.color }}>
              <Icon className="cert-icon" aria-hidden="true" />
              <span>{cert.kicker}</span>
              <strong>{cert.title}</strong>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact-band" id="contact">
      <div className="shell contact-shell">
        <h2>Get In Touch</h2>
        <form className="contact-form">
          <div className="input-row">
            <label>
              <span>Name</span>
              <input type="text" name="name" placeholder="Name" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" placeholder="Email" />
            </label>
          </div>
          <label>
            <span>Message</span>
            <textarea name="message" placeholder="Message" rows="5" />
          </label>
          <button className="primary" type="button">Send Message</button>
        </form>
        <div className="footer-links">
          <a href={profileLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profileLinks.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profileLinks.twitter} target="_blank" rel="noreferrer">Twitter</a>
        </div>
        <p className="copyright">© 2024 Phan Van Tinh. All rights reserved.</p>
      </div>
    </section>
  );
}

function ExperiencePage() {
  return (
    <main>
      <section className="page-hero shell">
        <h1>Experience & Expertise</h1>
        <div className="intro-grid">
          <p>
            I am a dedicated AI Trainee and Full-stack Developer with a passion for
            building intelligent and scalable solutions. My journey bridges advanced
            data science with robust software engineering.
          </p>
          <aside className="quick-stats">
            <h2>Quick Stats</h2>
            <dl>
              <div><dt>Years of exp</dt><dd>2+</dd></div>
              <div><dt>Projects completed</dt><dd>8+</dd></div>
              <div><dt>Certifications</dt><dd>3+</dd></div>
            </dl>
          </aside>
        </div>
      </section>
      <section className="section shell">
        <div className="section-title">
          <h2>Interactive Skill Grid</h2>
          <p>Technical Expertise</p>
        </div>
        <div className="expertise-grid">
          {expertise.map((group) => (
            <article className="expertise-column" key={group.title}>
              <h3>{group.title}</h3>
              {group.skills.map(([skill, value]) => (
                <div className="meter" key={skill}>
                  <div>
                    <span>{skill}</span>
                    <strong>{value}%</strong>
                  </div>
                  <progress value={value} max="100" />
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>
      <div className="experience-split shell">
        <ExperienceTimeline />
        <section className="section soft-skills">
          <div className="section-title">
            <h2>Soft Skills & Languages</h2>
          </div>
          <div className="soft-grid">
            {["Communication", "Presentation", "Teamwork"].map((skill) => (
              <div className="soft-item" key={skill}>
                <span>{skill.slice(0, 2).toUpperCase()}</span>
                <strong>{skill}</strong>
              </div>
            ))}
          </div>
          <div className="languages">
            <h3>Languages</h3>
            <p><strong>English:</strong> Proficient (C1)</p>
            <p><strong>Korean:</strong> TOPIK Level 3 focus</p>
          </div>
          <div className="cert-cards">
            {certifications.map((certName) => {
              const cert = certificationDetails[certName];
              const Icon = cert.Icon;

              return (
              <article key={certName} style={{ "--cert-color": cert.color }}>
                <Icon className="cert-card-icon" aria-hidden="true" />
                <h3>{cert.title}</h3>
                <p>{certName === "Phenikaa University" ? "B.Eng in Information Technology" : "Issued certificate"}</p>
              </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function ProjectDetail({ project }) {
  if (project.id === "blockchain") {
    return <BlockchainProjectPage project={project} />;
  }

  const isEssay = project.id === "essay";

  return (
    <main className="project-page">
      <div className="project-shell">
        <button className="back-button" onClick={() => goTo("home")}>
          Back to Home <span aria-hidden="true">-&gt;</span>
        </button>
        <section className="detail-hero">
          <div>
            <h1>{project.title}</h1>
            <p>Role: {project.role} | Duration: {project.duration}</p>
            <div className="tag-row large">
              {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="detail-actions">
              <a href={project.repository} target="_blank" rel="noreferrer">GitHub Repository</a>
              <a href="#demo">Live Demo</a>
            </div>
          </div>
          <img src={project.image} alt={`${project.title} full preview`} />
        </section>

        {isEssay ? <EssayDetail /> : <BlockchainDetail />}

        <section className="metric-row">
          {project.metrics.map(([label, value]) => (
            <div className="metric" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

function BlockchainProjectPage({ project }) {
  const techStack = [
    { label: "Solidity", Icon: SiSolidity, color: "#7c7c7c" },
    { label: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
    { label: "Hardhat", Icon: null, color: "#f7df1e" },
    { label: "Viem", Icon: null, color: "#8b5cf6" },
    { label: "Celo", Icon: SiBlockchaindotcom, color: "#35d07f" },
  ];
  const features = [
    {
      title: "Privacy-Preserving Hashing",
      text: "Utilizes Keccak256 cryptographic hashing to secure sensitive student data, ensuring only the hash is stored on-chain.",
      Icon: TbLock,
    },
    {
      title: "Role-Based Access Control",
      text: "Implements a hierarchical governance model where only authorized institutions can issue and manage diplomas.",
      Icon: TbShieldCheck,
    },
    {
      title: "Automated Unit Testing",
      text: "Leverages the Hardhat testing suite for comprehensive automated tests to ensure contract integrity.",
      Icon: TbSettingsCog,
    },
  ];

  return (
    <main className="blockchain-page">
      <section className="blockchain-shell">
        <div className="blockchain-card">
          <nav className="blockchain-breadcrumb" aria-label="Project breadcrumb">
            <button onClick={() => goTo("home")}>Home</button>
            <span>Portfolio</span>
            <span>Blockchain</span>
            <strong>Decentralized Degree Verification System (DApp)</strong>
          </nav>

          <header className="blockchain-hero">
            <div>
              <h1>Decentralized Degree Verification System (DApp)</h1>
              <p className="blockchain-underline" aria-hidden="true" />
            </div>
            <aside>
              <p><strong>Role:</strong> Backend Developer</p>
              <p><strong>Tech:</strong> Solidity, Hardhat, Celo</p>
            </aside>
          </header>

          <div className="degree-visual" role="img" aria-label={`${project.title} verification illustration`}>
            <div className="certificate-panel">
              <span className="verified-label">Verified</span>
              <span className="cert-line long" />
              <span className="cert-line" />
              <span className="cert-line short" />
              <TbShieldCheck className="cert-check" />
            </div>
            <TbLock className="lock-orbit" />
            <SiBlockchaindotcom className="chain-seal" />
            <span className="network-dot dot-one" />
            <span className="network-dot dot-two" />
            <span className="network-dot dot-three" />
          </div>

          <section className="blockchain-tech-row">
            <div>
              <h2>Tech Stack & Repository</h2>
              <div className="blockchain-chips">
                {techStack.map(({ label, Icon, color }) => (
                  <span className="blockchain-chip" key={label} style={{ "--chip-color": color }}>
                    {Icon ? <Icon aria-hidden="true" /> : <i aria-hidden="true" />}
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="blockchain-links">
              <a href={project.repository} target="_blank" rel="noreferrer">
                <FaGithub aria-hidden="true" /> View Source Code
              </a>
              <a href="https://celoscan.io/" target="_blank" rel="noreferrer">
                <TbExternalLink aria-hidden="true" /> View Contract on CeloScan
              </a>
            </div>
          </section>

          <section className="blockchain-feature-grid">
            {features.map(({ title, text, Icon }) => (
              <article className="blockchain-feature-card" key={title}>
                <span><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </section>

          <section className="blockchain-map-section">
            <h2>Deployment Map</h2>
            <div className="blockchain-map">
              <span className="map-arc arc-one" />
              <span className="map-arc arc-two" />
              <span className="map-city city-mainnet">
                <TbWorld aria-hidden="true" /> Celo Mainnet <small>Network Status</small>
              </span>
              <span className="map-city city-alfajores">
                <TbWorld aria-hidden="true" /> Celo Alfajores Testnet <small>Network Status</small>
              </span>
              <span className="map-city city-sepolia">
                <TbWorld aria-hidden="true" /> Ethereum Sepolia Testnet <small>Network Status</small>
              </span>
            </div>
          </section>

          <section className="blockchain-contract">
            <h2>Smart Contract Logic</h2>
            <div className="contract-steps">
              <span><strong>Input Hash</strong><small>Student ID + Degree Data</small></span>
              <TbArrowRight aria-hidden="true" />
              <span><strong>On-chain Lookup</strong><small>Verify Function</small></span>
              <TbArrowRight aria-hidden="true" />
              <span><strong>Boolean Result</strong><small>True: Verified, False: Not Found</small></span>
            </div>
          </section>

          <footer className="blockchain-cta">
            <button type="button" onClick={() => goTo("home")}>Back to Home</button>
            <a href={project.repository} target="_blank" rel="noreferrer">View Source Code</a>
          </footer>
        </div>
      </section>
    </main>
  );
}

function EssayDetail() {
  return (
    <>
      <section className="achievement">
        <h2>Problem & Achievement</h2>
        <p>Won 2nd Prize at Scientific Research Competition for automating handwritten Korean grading.</p>
      </section>
      <section className="detail-grid three">
        <article>
          <h3>Custom OCR Pipeline</h3>
          <div className="pipeline">
            <span>Perspective Correction</span>
            <span>Otsu Binarization</span>
          </div>
        </article>
        <article>
          <h3>Hybrid AI Scoring Engine</h3>
          <p>Weighted KoBERT and Gemini fusion for judging grammar, content quality and feedback.</p>
          <div className="mini-flow"><span>KoBERT</span><b>+</b><span>Gemini</span></div>
        </article>
        <article>
          <h3>Full-stack Architecture</h3>
          <div className="architecture">
            <span>FastAPI</span>
            <span>MVC</span>
            <span>React</span>
          </div>
        </article>
      </section>
    </>
  );
}

function BlockchainDetail() {
  return (
    <>
      <section className="detail-grid three">
        {[
          ["Privacy-Preserving Hashing", "Utilizes Keccak256 cryptographic hashing to secure sensitive student data."],
          ["Role-Based Access Control", "Implements a hierarchical governance model for issuing and managing diplomas."],
          ["Automated Unit Testing", "Uses Hardhat tests to ensure contract integrity and prevent duplicate issuance."],
        ].map(([title, text]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="deployment">
        <h2>Deployment Map</h2>
        <div className="map-panel">
          <span className="node node-a">Celo Mainnet</span>
          <span className="node node-b">Alfajores Testnet</span>
          <span className="node node-c">Sepolia Testnet</span>
        </div>
      </section>
      <section className="contract-flow">
        <h2>Smart Contract Logic</h2>
        <div>
          <span>Input Hash</span>
          <span>On-chain Lookup</span>
          <span>Boolean Result</span>
        </div>
      </section>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
