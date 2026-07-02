import React, { useState, useEffect } from 'react';
import {
  Download,
  Mail,
  BookOpen,
  Briefcase,
  GraduationCap,
  Sparkles,
  Code2,
  Database,
  Cpu,
  Globe,
  ChevronRight,
  Award,
  Linkedin,
  Github,
  Phone,
  MapPin,
  Rocket,
  Search,
  ExternalLink,
  ChevronDown,
  FileText,
  User,
  Layers,
  Send,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';
import NeuralCanvas from './components/NeuralCanvas';

// @ts-ignore
// import profilePic from './assets/images/neethu_profile_avatar_1783014281988.jpg';

export default function App() {
  // Navigation active links & mobile menu
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Custom typing animation state
  const [typingText, setTypingText] = useState('');
  const typingWords = [
    'Software Developer',
    'Full Stack Developer',
    'Machine Learning Enthusiast',
    'AI Research Aspirant'
  ];

  // Custom cursor states
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Scroll progress indicator state
  const [scrollProgress, setScrollProgress] = useState(0);

  // Contact form submission states
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Dynamic typing effect
  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const handleType = () => {
      const currentWord = typingWords[wordIndex];
      if (!isDeleting) {
        setTypingText(currentWord.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentWord.length) {
          isDeleting = true;
          timer = setTimeout(handleType, 2000); // Pause on finished word
          return;
        }
      } else {
        setTypingText(currentWord.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % typingWords.length;
        }
      }
      timer = setTimeout(handleType, isDeleting ? 45 : 85);
    };

    handleType();
    return () => clearTimeout(timer);
  }, []);

  // Custom cursor logic & viewport detection
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Set active section on scroll
  useEffect(() => {
    const handleScrollObserver = () => {
      const sections = ['home', 'about', 'education', 'publications', 'experience', 'skills', 'services', 'projects', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScrollObserver);
    return () => window.removeEventListener('scroll', handleScrollObserver);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate real server delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const resumeDownloadLink = "#"; // Standard local resume download trigger anchor

  return (
    <div className="relative min-h-screen">
      {/* Scroll Progress Indicator Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#7c3aed] via-[#38bdf8] to-[#9333ea] z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Futuristic Interactive Particle background */}
      <NeuralCanvas />

      {/* Navigation Header */}
      <nav className="sticky top-0 w-full z-40 bg-[#0f172a]/75 backdrop-blur-md border-b border-[#7c3aed]/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center space-x-2 cursor-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#7c3aed] to-[#38bdf8] flex items-center justify-center font-bold text-white text-lg tracking-wider font-heading">
              N
            </div>
            <span className="text-white font-bold text-xl tracking-wider font-heading">
              NEETHU<span className="text-[#38bdf8]">.R.A</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'education', label: 'Education' },
              { id: 'publications', label: 'Publications' },
              { id: 'experience', label: 'Experience' },
              { id: 'skills', label: 'Skills' },
              { id: 'services', label: 'Services' },
              { id: 'projects', label: 'Projects' },
              { id: 'contact', label: 'Contact' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`text-xs uppercase tracking-wider font-medium cursor-none transition-colors duration-300 ${
                  activeSection === link.id ? 'text-[#38bdf8] font-semibold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-400 hover:text-white p-2 cursor-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#0f172a] border-b border-[#7c3aed]/20 px-6 py-6 space-y-4 shadow-xl">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'education', label: 'Education' },
              { id: 'publications', label: 'Publications' },
              { id: 'experience', label: 'Experience' },
              { id: 'skills', label: 'Skills' },
              { id: 'services', label: 'Services' },
              { id: 'projects', label: 'Projects' },
              { id: 'contact', label: 'Contact' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-sm uppercase tracking-wider font-medium transition-colors ${
                  activeSection === link.id ? 'text-[#38bdf8] font-semibold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* 1. Hero Section */}
      <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center px-6 md:px-12 py-12 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Column Text details */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/30 text-xs text-[#a78bfa] font-mono tracking-wider">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#38bdf8]" />
                <span>AI RESEARCHER & SOFTWARE DEVELOPER</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-heading text-white">
                Hello, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#7c3aed] to-[#c084fc] drop-shadow-sm select-text">
                  Neethu R A
                </span>
              </h1>
              <div className="h-8 md:h-10 flex items-center text-lg md:text-xl font-mono text-gray-300">
                <span className="text-[#38bdf8] font-semibold">&gt;&nbsp;</span>
                <span className="typing-cursor select-text">{typingText}</span>
              </div>
            </div>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl select-text">
              Aspiring graduate in Computer Science with a strong academic foundation in algorithms, data structures, mathematics, software systems, and algorithmic problem-solving.
              <br /><br />
              Currently working as a <strong className="text-white">Software Developer</strong> with hands-on experience in Machine Learning, Computer Vision, Big Data Processing, Cloud Technologies, and Enterprise Backend Development. Passionate about Artificial Intelligence, Pattern Recognition, and Data-Driven Modeling.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#projects"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="cursor-none px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#9333ea] text-white font-medium hover:scale-105 transition-all shadow-lg shadow-purple-900/30 glow-button active:scale-95 text-sm flex items-center justify-center"
              >
                View Projects
              </a>
              <a
                href="#contact"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="cursor-none px-6 py-3.5 rounded-xl bg-slate-900/80 border border-[#7c3aed]/30 text-white font-medium hover:border-[#38bdf8]/50 hover:bg-slate-900 transition-all active:scale-95 text-sm flex items-center space-x-1"
              >
                <span>Contact Me</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column Profile Picture Orb */}
          <div className="lg:col-span-5 flex justify-center items-center z-10">
            <div className="relative w-72 h-72 md:w-80 md:h-80 select-none">
              {/* Spinning futuristic space rings */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#7c3aed]/40 animate-[spin_25s_linear_infinite]" />
              <div className="absolute -inset-4 rounded-full border border-double border-[#38bdf8]/15 animate-[spin_35s_linear_infinite]" />
              <div className="absolute -inset-8 rounded-full border border-[#7c3aed]/5 animate-[spin_45s_linear_infinite]" />
              
              {/* Soft particle spots */}
              <div className="absolute -top-4 -left-4 w-4 h-4 rounded-full bg-[#38bdf8]/50 blur-md animate-ping" />
              <div className="absolute -bottom-4 -right-4 w-4 h-4 rounded-full bg-[#7c3aed]/50 blur-md animate-ping" style={{ animationDelay: '1s' }} />

              {/* Glowing gradient backdrops */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#7c3aed]/25 to-[#38bdf8]/25 blur-xl animate-pulse" />

              {/* Main Avatar Image frame */}
              <div className="absolute inset-2 rounded-full p-1.5 bg-gradient-to-tr from-[#7c3aed] via-[#9333ea] to-[#38bdf8] glow-border shadow-[0_0_40px_rgba(124,58,237,0.3)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0f172a] border-2 border-[#0f172a] flex items-center justify-center">
                  <User className="w-24 h-24 text-slate-500/80 animate-pulse" />
                  {/* Uncomment the code below to restore your portrait photo in the future */}
                  {/* 
                  <img
                    src={profilePic}
                    alt="Neethu R A portrait"
                    className="w-full h-full object-cover scale-[1.03] hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  */}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll indicator chevron */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-gray-500 hover:text-[#38bdf8] transition-colors cursor-none">
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* 2. About Me Section */}
      <section id="about" className="py-24 px-6 md:px-12 bg-slate-950/40 relative border-t border-[#7c3aed]/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-heading">
              <span className="text-[#38bdf8]">&lt;</span> About Me <span className="text-[#38bdf8]">/&gt;</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-mono">NEETHU R A / PROFILE DOSSIER</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Biography text */}
            <div className="lg:col-span-7 space-y-6 select-text">
              <h3 className="text-xl md:text-2xl font-bold text-white font-heading">
                Bridging Software Engineering & Cognitive AI Systems
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                I am a highly driven, detail-oriented computer science professional blending rigorous theoretical methodologies with hands-on enterprise-level software engineering experience.
                My focus lies in building reliable backend architectures, high-performance big data ETL pipelines, and smart computer vision solutions that make automated reasoning practical.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {[
                  { label: "Software Engineering Core", desc: "Expertise in object-oriented structures, clean backend APIs, and Google Cloud services." },
                  { label: "Research Mindset", desc: "Always exploring academic papers, modeling frameworks, and experimental ML systems." },
                  { label: "AI & Data Science Domain", desc: "Skilled in feature extraction, computer vision algorithms, PySpark data parsing, and modeling." },
                  { label: "Full Stack Mastery", desc: "Capable of creating secure React SPAs, robust Node.js middleware, and blockchain validation ledgers." }
                ].map((item, index) => (
                  <div key={index} className="glass-panel p-4 rounded-xl border-l-2 border-l-[#7c3aed] space-y-1">
                    <h4 className="text-xs font-semibold text-[#38bdf8] font-mono tracking-wider uppercase">{item.label}</h4>
                    <p className="text-xs text-gray-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                { title: "2+ Years", desc: "Professional Experience", color: "from-[#7c3aed]" },
                { title: "8+ Completed", desc: "Engineering Projects", color: "from-[#38bdf8]" },
                { title: "1 Published", desc: "Research Publication", color: "from-[#9333ea]" },
                { title: "8.89 / 10", desc: "Cumulative CGPA", color: "from-[#6366f1]" },
                { title: "25+ Techs", desc: "Technologies Learned", color: "from-fuchsia-600" },
                { title: "ISRO Intern", desc: "Mission PRADAN API", color: "from-sky-500" }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass-panel p-5 rounded-xl flex flex-col justify-between hover:border-[#38bdf8]/30 hover:scale-[1.03] transition-all duration-300"
                >
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-heading">
                    {stat.title}
                  </span>
                  <span className="text-xs text-gray-400 font-mono tracking-wide mt-2">{stat.desc}</span>
                  <div className={`w-6 h-1 mt-3 rounded-full bg-gradient-to-r ${stat.color} to-transparent`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Education Timeline Section */}
      <section id="education" className="py-24 px-6 md:px-12 relative">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              <span className="text-[#38bdf8]">&lt;</span> Education Timeline <span className="text-[#38bdf8]">/&gt;</span>
            </h2>
            <p className="text-gray-400 text-sm font-mono uppercase tracking-widest">Academic Foundations & Credentials</p>
          </div>

          <div className="relative border-l border-[#7c3aed]/25 pl-6 md:pl-8 space-y-12 ml-4 md:ml-8 select-text">
            {/* Timeline Item 1 */}
            <div className="relative group">
              {/* Dot indicator */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-[#7c3aed] group-hover:border-[#38bdf8] group-hover:scale-125 transition-all duration-300 z-10" />
              <div className="absolute -left-[35px] md:-left-[43px] top-0 w-6 h-6 rounded-full bg-[#7c3aed]/25 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="glass-panel p-6 rounded-2xl space-y-3 hover:border-[#7c3aed]/40 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span className="text-xs font-semibold font-mono px-2.5 py-1 rounded bg-[#7c3aed]/10 text-[#a78bfa] border border-[#7c3aed]/20 w-fit">
                    2019 – 2023
                  </span>
                  <span className="text-xs font-bold font-mono text-[#38bdf8]">CGPA: 8.89 / 10</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white font-heading">Bachelor of Engineering (B.E.)</h3>
                  <p className="text-sm text-[#a78bfa] font-semibold">Computer Science & Engineering</p>
                  <p className="text-xs text-gray-400 mt-1">Dayananda Sagar College of Engineering — Visvesvaraya Technological University (VTU)</p>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Rigorous computer engineering coursework specializing in Object-Oriented Software Structures, Design & Analysis of Algorithms, Data Mining, Database Systems, Computer Networks, and Machine Learning applications.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-[#7c3aed] group-hover:border-[#38bdf8] group-hover:scale-125 transition-all duration-300 z-10" />
              <div className="absolute -left-[35px] md:-left-[43px] top-0 w-6 h-6 rounded-full bg-[#7c3aed]/25 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="glass-panel p-6 rounded-2xl space-y-3 hover:border-[#7c3aed]/40 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span className="text-xs font-semibold font-mono px-2.5 py-1 rounded bg-slate-800 text-gray-300 w-fit">
                    2017 – 2019
                  </span>
                  <span className="text-xs font-bold font-mono text-[#38bdf8]">Score: 89.83%</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white font-heading">Pre-University Education (Class XII)</h3>
                  <p className="text-sm text-gray-400">MES PU College</p>
                </div>
                <p className="text-xs text-gray-300">
                  Focused study on fundamental sciences, physics, chemistry, mathematics, and computer logic. Developed key analytical reasoning and mathematical problem-solving skills.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-[#7c3aed] group-hover:border-[#38bdf8] group-hover:scale-125 transition-all duration-300 z-10" />
              <div className="absolute -left-[35px] md:-left-[43px] top-0 w-6 h-6 rounded-full bg-[#7c3aed]/25 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="glass-panel p-6 rounded-2xl space-y-3 hover:border-[#7c3aed]/40 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span className="text-xs font-semibold font-mono px-2.5 py-1 rounded bg-slate-800 text-gray-300 w-fit">
                    2014 – 2017
                  </span>
                  <span className="text-xs font-bold font-mono text-[#38bdf8]">Score: 93.76%</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white font-heading">Secondary School Leaving Certificate (Class X)</h3>
                  <p className="text-sm text-gray-400">Nirmala Rani High School</p>
                </div>
                <p className="text-xs text-gray-300">
                  Completed foundational secondary curriculum with high distinctions in mathematics, sciences, and information technology logic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Publications Section */}
      <section id="publications" className="py-24 px-6 md:px-12 bg-slate-950/40 relative border-t border-[#7c3aed]/5">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              <span className="text-[#38bdf8]">&lt;</span> Research Publication <span className="text-[#38bdf8]">/&gt;</span>
            </h2>
            <p className="text-gray-400 text-sm font-mono uppercase tracking-widest">Decentralized Trust & Distributed Ledgers</p>
          </div>

          {/* Premium Research Spotlight Card */}
          <div className="glass-panel p-6 md:p-10 rounded-2xl relative overflow-hidden border border-[#7c3aed]/30 hover:border-[#38bdf8]/40 transition-all duration-500 select-text">
            {/* Glowing cosmic backdrop node inside the card */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-radial-glow opacity-60 -mr-20 -mt-20 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold font-mono tracking-wider bg-[#7c3aed]/10 text-[#c084fc] px-2.5 py-1 rounded border border-[#7c3aed]/30 uppercase">
                    IRJET JOURNAL
                  </span>
                  <span className="text-[10px] font-bold font-mono tracking-wider bg-slate-800 text-gray-300 px-2.5 py-1 rounded uppercase">
                    DECEMBER 2023 INDEXED
                  </span>
                </div>

                <h3 className="text-xl md:text-3xl font-bold text-white font-heading leading-snug">
                  Web Based and Blockchain Application for Educational Institution
                </h3>

                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  <strong>Abstract:</strong> Decentralized blockchain networks provide secure, tamper-proof ledgers perfect for preserving academic credentials. This research presents an integrated web ecosystem built for educational institutions that anchors student performance certificates on an immutable decentralized blockchain network. By incorporating cryptographic blocks validation and cryptographic hash pairing, the system completely removes administrative credential fraud, providing instantly verifiable digital transcripts for employers and recruiters.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono pt-2">
                  <div>
                    <span className="block text-gray-400">Journal:</span>
                    <span className="text-white font-medium">IRJET</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Volume & Issue:</span>
                    <span className="text-white font-medium">Vol 10, Issue 2</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Date:</span>
                    <span className="text-white font-medium">February 2023</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Status:</span>
                    <span className="text-emerald-400 font-bold flex items-center space-x-1">
                      <CheckCircle className="w-3.5 h-3.5 mr-1" /> Published
                    </span>
                  </div>
                </div>
              </div>

              {/* Graphical Blockchain Representation inside research card */}
              <div className="lg:col-span-4 bg-slate-900/80 border border-[#7c3aed]/20 rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-[#38bdf8] font-mono tracking-wider uppercase flex items-center space-x-1.5">
                  <Layers className="w-4 h-4" />
                  <span>BLOCKCHAIN ARCHITECTURE</span>
                </h4>
                <div className="space-y-3 font-mono text-[10px]">
                  {/* Block 1 */}
                  <div className="p-2 bg-slate-950 rounded border border-[#7c3aed]/30 relative">
                    <span className="block font-bold text-[#a78bfa]">Block #142 (Institution Key)</span>
                    <span className="block text-gray-500 truncate mt-0.5">Hash: 0000a1f8c...92be</span>
                    <span className="block text-gray-500 truncate">Prev: 0000e39a2...fd4c</span>
                  </div>
                  {/* Arrow connector */}
                  <div className="h-4 flex justify-center items-center">
                    <div className="w-0.5 h-full bg-[#38bdf8]" />
                  </div>
                  {/* Block 2 */}
                  <div className="p-2 bg-slate-950 rounded border border-[#38bdf8]/30 relative animate-pulse">
                    <span className="block font-bold text-[#38bdf8]">Block #143 (Student Record)</span>
                    <span className="block text-gray-500 truncate mt-0.5">Hash: 000078cd2...1a5e</span>
                    <span className="block text-gray-500 truncate">Prev: 0000a1f8c...92be</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Experience Timeline Section */}
      <section id="experience" className="py-24 px-6 md:px-12 relative">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              <span className="text-[#38bdf8]">&lt;</span> Career Experience <span className="text-[#38bdf8]">/&gt;</span>
            </h2>
            <p className="text-gray-400 text-sm font-mono uppercase tracking-widest">Professional Experience & Projects</p>
          </div>

          <div className="relative border-l border-[#7c3aed]/25 pl-6 md:pl-8 space-y-12 ml-4 md:ml-8 select-text">
            
            {/* Career Item 1: HCLTech */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-[#7c3aed] group-hover:border-[#38bdf8] group-hover:scale-125 transition-all duration-300 z-10" />
              <div className="absolute -left-[35px] md:-left-[43px] top-0 w-6 h-6 rounded-full bg-[#7c3aed]/25 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="glass-panel p-6 rounded-2xl space-y-4 hover:border-[#7c3aed]/40 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white font-heading">Software Developer</h3>
                    <p className="text-sm font-semibold text-[#a78bfa]">HCLTech</p>
                  </div>
                  <span className="text-xs font-semibold font-mono px-2.5 py-1 rounded bg-[#7c3aed]/10 text-[#a78bfa] border border-[#7c3aed]/20 w-fit">
                    June 2025 – Present
                  </span>
                </div>
                
                <p className="text-xs text-gray-300">
                  Engineering critical enterprise backend banking systems on cloud-native infrastructure, keeping speed and scale at the center of operations.
                </p>

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-[#38bdf8] uppercase tracking-wider font-mono">Key Responsibilities:</h4>
                  <ul className="text-xs text-gray-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                    <li>Developed highly secure backend services inside the Payments domain of international Enterprise Banking Applications.</li>
                    <li>Utilized object-oriented Java and Spring frameworks to implement robust, clean modular banking components.</li>
                    <li>Integrated cloud storage and message structures on Google Cloud Platform (GCP) for reliable distributed event queuing.</li>
                    <li>Designed, monitored, and scaled critical banking RESTful API pathways, improving integration times across cross-functional domains.</li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {['Java', 'Google Cloud (GCP)', 'REST APIs', 'Spring Boot', 'Enterprise Payments', 'SQL'].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-[#7c3aed]/15 text-gray-300">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Career Item 2: Kantar */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-[#7c3aed] group-hover:border-[#38bdf8] group-hover:scale-125 transition-all duration-300 z-10" />
              <div className="absolute -left-[35px] md:-left-[43px] top-0 w-6 h-6 rounded-full bg-[#7c3aed]/25 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="glass-panel p-6 rounded-2xl space-y-4 hover:border-[#7c3aed]/40 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white font-heading">Software Engineer I</h3>
                    <p className="text-sm font-semibold text-[#a78bfa]">Kantar</p>
                  </div>
                  <span className="text-xs font-semibold font-mono px-2.5 py-1 rounded bg-slate-800 text-gray-300 w-fit">
                    August 2023 – June 2025
                  </span>
                </div>

                <p className="text-xs text-gray-300">
                  Spearheaded distributed data processing architectures and analytics ETL modules for globally consumed user analytics platforms.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-[#7c3aed]/10 text-center">
                    <span className="block text-lg font-bold text-[#38bdf8] font-heading">40%</span>
                    <span className="text-[10px] text-gray-400 font-mono uppercase">System Complexity Reduced</span>
                  </div>
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-[#7c3aed]/10 text-center">
                    <span className="block text-lg font-bold text-[#c084fc] font-heading">30%</span>
                    <span className="text-[10px] text-gray-400 font-mono uppercase">Page Load Time Improved</span>
                  </div>
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-[#7c3aed]/10 text-center">
                    <span className="block text-lg font-bold text-emerald-400 font-heading">50%</span>
                    <span className="text-[10px] text-gray-400 font-mono uppercase">User Engagement Growth</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-[#38bdf8] uppercase tracking-wider font-mono">Key Highlights & ETL Pipelines:</h4>
                  <ul className="text-xs text-gray-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                    <li>Built large-scale analytical processing workflows handling millions of user records with PySpark and Python.</li>
                    <li>Designed scalable cloud pipelines on Azure Databricks and scheduled execution via Azure Data Factory.</li>
                    <li>Preprocessed high-velocity transactional databases, resolving features extraction and anomalies handling with optimized SQL scripts.</li>
                    <li>Collaborated in multi-region deployments, deploying high-integrity reports to key enterprise marketing partners.</li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {['Python', 'PySpark', 'Apache Spark', 'SQL', 'Azure Databricks', 'Azure Data Factory', 'ETL workflows'].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-[#7c3aed]/15 text-gray-300">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Career Item 3: ISRO / ISTRAC */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-[#38bdf8] group-hover:scale-125 transition-all duration-300 z-10" />
              {/* Pulsing glow indicator for space agency */}
              <span className="absolute -left-[35px] md:-left-[43px] top-0 flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8]/30 opacity-75"></span>
              </span>

              {/* Cosmic/Space visual styling for ISRO card */}
              <div className="glass-panel p-6 rounded-2xl space-y-4 hover:border-[#38bdf8]/40 border border-[#38bdf8]/20 transition-all duration-300 relative overflow-hidden bg-slate-950/60 shadow-[0_0_25px_rgba(56,189,248,0.08)]">
                {/* Visual orbital backdrop */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-radial-accent opacity-50 -mr-12 -mt-12 pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 relative z-10">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white font-heading flex items-center space-x-2">
                      <Rocket className="w-5 h-5 text-[#38bdf8] animate-bounce" />
                      <span>Software Engineering Intern</span>
                    </h3>
                    <p className="text-sm font-semibold text-[#38bdf8]">ISRO / ISTRAC</p>
                  </div>
                  <span className="text-xs font-semibold font-mono px-2.5 py-1 rounded bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 w-fit uppercase tracking-widest">
                    Nov 2022 – March 2023
                  </span>
                </div>

                <p className="text-xs text-gray-300 relative z-10">
                  Gained space-ground telemetry systems context working at <strong className="text-[#38bdf8]">ISTRAC (ISRO Telemetry, Tracking and Command Network)</strong>, contributing to active space missions applications.
                </p>

                <div className="space-y-2 relative z-10">
                  <h4 className="text-xs font-semibold text-[#38bdf8] uppercase tracking-wider font-mono">Mission Deployments & Applications:</h4>
                  <ul className="text-xs text-gray-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                    <li>Worked on core modules of the <strong className="text-white">PRADAN (Payload Data Access Network)</strong> web-application used for space data dissemination.</li>
                    <li>Aided team projects associated with historic missions data parsing such as <strong className="text-[#38bdf8]">Chandrayaan-3</strong> lunar landing and <strong className="text-amber-400">Aditya-L1</strong> solar observation platforms.</li>
                    <li>Developed responsive frontend control panels and user forms using native HTML, CSS, and modern JavaScript.</li>
                    <li>Engineered Java-based enterprise backend REST integrations parsing high-dimensional geographic coordinates.</li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 relative z-10">
                  {['Java Backend', 'HTML5', 'CSS3', 'JavaScript (ES6)', 'PRADAN Network', 'Telemetry Systems'].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e1b4b]/60 border border-[#38bdf8]/30 text-white">{t}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Skills Section */}
      <section id="skills" className="py-24 px-6 md:px-12 bg-slate-950/40 relative border-t border-[#7c3aed]/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              <span className="text-[#38bdf8]">&lt;</span> Technical Skillsets <span className="text-[#38bdf8]">/&gt;</span>
            </h2>
            <p className="text-gray-400 text-sm font-mono uppercase tracking-widest">Active Engineering Competencies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Programming & Core */}
            <div className="glass-panel p-5 rounded-2xl space-y-4 hover:border-[#7c3aed]/40 transition-all duration-300">
              <div className="flex items-center space-x-2 text-[#38bdf8]">
                <Code2 className="w-5 h-5" />
                <h3 className="text-sm font-bold font-heading uppercase tracking-wider">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Java', 'Python', 'SQL', 'JavaScript'].map((s) => (
                  <span key={s} className="text-xs font-mono px-3 py-1 bg-slate-900 border border-[#7c3aed]/10 rounded-lg text-gray-200">{s}</span>
                ))}
              </div>
            </div>

            {/* Backend & Systems */}
            <div className="glass-panel p-5 rounded-2xl space-y-4 hover:border-[#7c3aed]/40 transition-all duration-300">
              <div className="flex items-center space-x-2 text-[#c084fc]">
                <Database className="w-5 h-5" />
                <h3 className="text-sm font-bold font-heading uppercase tracking-wider">Backend</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Spring Boot', 'RESTful APIs', 'Node.js', 'Express.js'].map((s) => (
                  <span key={s} className="text-xs font-mono px-3 py-1 bg-slate-900 border border-[#7c3aed]/10 rounded-lg text-gray-200">{s}</span>
                ))}
              </div>
            </div>

            {/* Big Data & Analytics */}
            <div className="glass-panel p-5 rounded-2xl space-y-4 hover:border-[#7c3aed]/40 transition-all duration-300">
              <div className="flex items-center space-x-2 text-amber-400">
                <Layers className="w-5 h-5" />
                <h3 className="text-sm font-bold font-heading uppercase tracking-wider">Big Data</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Apache Spark', 'PySpark', 'Azure Databricks', 'Azure Data Factory'].map((s) => (
                  <span key={s} className="text-xs font-mono px-3 py-1 bg-slate-900 border border-[#7c3aed]/10 rounded-lg text-gray-200">{s}</span>
                ))}
              </div>
            </div>

            {/* AI, CV & ML */}
            <div className="glass-panel p-5 rounded-2xl space-y-4 hover:border-[#7c3aed]/40 transition-all duration-300">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Cpu className="w-5 h-5" />
                <h3 className="text-sm font-bold font-heading uppercase tracking-wider">AI & Vision</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Computer Vision', 'OpenCV', 'Feature Engineering', 'Pattern Recognition'].map((s) => (
                  <span key={s} className="text-xs font-mono px-3 py-1 bg-slate-900 border border-[#7c3aed]/10 rounded-lg text-gray-200">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Tools & Soft Skills grid footer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass-panel p-5 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Cloud & Databases</h4>
              <div className="flex flex-wrap gap-2">
                {['Google Cloud Platform (GCP)', 'MySQL', 'MongoDB', 'Elasticsearch'].map((t) => (
                  <span key={t} className="text-xs font-mono px-3 py-1 bg-slate-900 border border-[#7c3aed]/10 rounded-lg text-gray-200">{t}</span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Engineering Tools</h4>
              <div className="flex flex-wrap gap-2">
                {['GitHub', 'Postman', 'VS Code', 'Jira', 'Jupyter Notebook'].map((t) => (
                  <span key={t} className="text-xs font-mono px-3 py-1 bg-slate-900 border border-[#7c3aed]/10 rounded-lg text-gray-200">{t}</span>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Soft Skillsets</h4>
              <div className="flex flex-wrap gap-2">
                {['Problem Solving', 'Analytical Thinking', 'Curiosity', 'Adaptability', 'Communication'].map((t) => (
                  <span key={t} className="text-xs font-mono px-3 py-1 bg-slate-900 border border-[#7c3aed]/10 rounded-lg text-gray-200">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Services Section */}
      <section id="services" className="py-24 px-6 md:px-12 relative">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              <span className="text-[#38bdf8]">&lt;</span> Focus Service <span className="text-[#38bdf8]">/&gt;</span>
            </h2>
            <p className="text-gray-400 text-sm font-mono uppercase tracking-widest">Solutions & Capabilities</p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-[#7c3aed]/30 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#38bdf8]/40 transition-all duration-500">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center space-x-3 text-[#38bdf8]">
                <div className="p-2 bg-[#7c3aed]/10 rounded-xl border border-[#7c3aed]/30">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white font-heading">Full Stack Development</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed select-text">
                Design and develop scalable, responsive, and modern web applications using contemporary frontend and backend technologies with clean architecture, RESTful APIs, database integration, and cloud-ready deployment.
              </p>
              <div className="flex flex-wrap gap-2">
                {['React.js', 'Spring Boot', 'Express.js', 'MongoDB', 'Cloud APIs', 'Microservices'].map((x) => (
                  <span key={x} className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#7c3aed]/10 border border-[#7c3aed]/20 text-[#a78bfa]">{x}</span>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="cursor-none px-5 py-3 rounded-xl bg-gradient-to-tr from-[#7c3aed] to-[#38bdf8] text-white text-xs font-semibold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all text-center shrink-0 w-full md:w-auto"
            >
              Order Proposal
            </a>
          </div>
        </div>
      </section>

      {/* 8. Featured Projects Section */}
      <section id="projects" className="py-24 px-6 md:px-12 bg-slate-950/40 relative border-t border-[#7c3aed]/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              <span className="text-[#38bdf8]">&lt;</span> Engineering Projects <span className="text-[#38bdf8]">/&gt;</span>
            </h2>
            <p className="text-gray-400 text-sm font-mono uppercase tracking-widest">Highlighting Key Technical Solves</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Project 1 */}
            <div className="glass-panel rounded-2xl overflow-hidden hover:border-[#38bdf8]/40 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
              <div>
                {/* Custom visual placeholder */}
                <div className="h-44 bg-gradient-to-tr from-indigo-950 via-slate-900 to-[#0a0d24] relative flex items-center justify-center p-6 border-b border-[#7c3aed]/15">
                  <div className="text-center space-y-1 font-mono">
                    <Cpu className="w-10 h-10 mx-auto text-[#38bdf8] animate-pulse" />
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest mt-2">OpenCV Node Active</span>
                    <span className="block text-xs text-[#38bdf8]">&gt;&nbsp;[Gesture Matrix]</span>
                  </div>
                </div>

                <div className="p-6 pb-8 space-y-3 select-text">
                  <div className="flex flex-wrap gap-1.5">
                    {['Python', 'OpenCV', 'ML', 'Jupyter'].map((t) => (
                      <span key={t} className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-[#7c3aed]/10 text-[#a78bfa] uppercase">{t}</span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading">Dynamic Hand Gesture Recognition</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Developed a real-time computer vision system capable of recognizing static and dynamic hand gestures for assisting deaf users. Implemented feature extraction, frame-by-frame preprocessing, machine learning models, and real-time inference evaluation.
                  </p>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="glass-panel rounded-2xl overflow-hidden hover:border-[#38bdf8]/40 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="h-44 bg-gradient-to-tr from-fuchsia-950 via-slate-900 to-[#0a0d24] relative flex items-center justify-center p-6 border-b border-[#7c3aed]/15">
                  <div className="text-center space-y-1 font-mono">
                    <Database className="w-10 h-10 mx-auto text-[#c084fc] animate-bounce" />
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest mt-2">Alternating Least Squares</span>
                    <span className="block text-xs text-[#c084fc]">&gt;&nbsp;[ALS Cluster Engine]</span>
                  </div>
                </div>

                <div className="p-6 pb-8 space-y-3 select-text">
                  <div className="flex flex-wrap gap-1.5">
                    {['Apache Spark', 'ALS Algorithm', 'Python'].map((t) => (
                      <span key={t} className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-[#7c3aed]/10 text-[#38bdf8] uppercase">{t}</span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading">Movie Recommendation System</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Built a scalable collaborative filtering recommendation engine using Apache Spark and Alternating Least Squares (ALS), processing large-scale movie datasets with distributed computing techniques to output recommendations.
                  </p>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="glass-panel rounded-2xl overflow-hidden hover:border-[#38bdf8]/40 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="h-44 bg-gradient-to-tr from-blue-950 via-slate-900 to-[#0a0d24] relative flex items-center justify-center p-6 border-b border-[#7c3aed]/15">
                  <div className="text-center space-y-1 font-mono">
                    <Layers className="w-10 h-10 mx-auto text-emerald-400 animate-pulse" />
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest mt-2">Dapp Node Active</span>
                    <span className="block text-xs text-emerald-400">&gt;&nbsp;[Mern Ledger State]</span>
                  </div>
                </div>

                <div className="p-6 pb-8 space-y-3 select-text">
                  <div className="flex flex-wrap gap-1.5">
                    {['React.js', 'Node.js', 'MongoDB', 'Blockchain'].map((t) => (
                      <span key={t} className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-[#7c3aed]/10 text-emerald-400 uppercase">{t}</span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading">ProFolio Blockchain System</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Developed a full-stack platform enabling students to showcase skills, contribute to open-source, and manage hackathons. Integrated decentralized ledger scripts to track tamper-proof student credentials.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Achievements Section */}
      <section id="achievements" className="py-24 px-6 md:px-12 relative">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              <span className="text-[#38bdf8]">&lt;</span> Achievements <span className="text-[#38bdf8]">/&gt;</span>
            </h2>
            <p className="text-gray-400 text-sm font-mono uppercase tracking-widest">Distinctions & Milestones</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Published IRJET Research Paper",
                desc: "Ledger-secured credentials app architecture indexing. Published February 2023.",
                badge: "Publications"
              },
              {
                title: "ISRO Internship",
                desc: "Worked on planetary payloads PRADAN network telemetry used in Chandrayaan-3 and Aditya-L1.",
                badge: "ISRO Space Center"
              },
              {
                title: "Enterprise Banking Experience",
                desc: "Developed mission-critical payment services inside banking REST architectures at HCLTech.",
                badge: "Engineering Scale"
              },
              {
                title: "Big Data ETL Integration",
                desc: "Designed pipelines at Kantar processing millions of lines, cutting processing time by 30%.",
                badge: "PySpark Scale"
              },
              {
                title: "High Academic Distinction",
                desc: "Maintained a strong 8.89 Cumulative CGPA inside rigorous DSCE Computer Science curricula.",
                badge: "Academic Honor"
              }
            ].map((a, i) => (
              <div
                key={i}
                className="glass-panel p-6 rounded-2xl space-y-3 hover:border-[#38bdf8]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-wider font-bold bg-[#7c3aed]/10 text-[#c084fc] px-2.5 py-1 rounded w-fit border border-[#7c3aed]/25 uppercase block">
                    {a.badge}
                  </span>
                  <h3 className="text-base font-bold text-white font-heading select-text">{a.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed select-text">{a.desc}</p>
                </div>
                <div className="flex items-center text-[#38bdf8] text-xs font-mono font-bold mt-2">
                  <Award className="w-4 h-4 mr-1.5" /> Approved Badge
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Contact Section */}
      <section id="contact" className="py-24 px-6 md:px-12 bg-slate-950/40 relative border-t border-[#7c3aed]/5">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              <span className="text-[#38bdf8]">&lt;</span> Reach Out <span className="text-[#38bdf8]">/&gt;</span>
            </h2>
            <p className="text-gray-400 text-sm font-mono uppercase tracking-widest">Connect for Recruitments & Inquiries</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-8 select-text">
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-white font-heading">
                  Let's Collaborate on Next-Gen Systems
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  I am actively reviewing Software Engineering roles, Computer Science MS/PhD research opportunities, and data engineering projects. Let's arrange a call to discuss synergies!
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-900/60 border border-[#7c3aed]/10">
                  <div className="w-10 h-10 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center border border-[#7c3aed]/30 text-[#c084fc] shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-gray-500 uppercase text-[9px] tracking-wider">Email Address</span>
                    <a href="mailto:neethurokhadeashok@gmail.com" className="text-white hover:text-[#38bdf8] font-semibold transition-colors">neethurokhadeashok@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-900/60 border border-[#7c3aed]/10">
                  <div className="w-10 h-10 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center border border-[#7c3aed]/30 text-[#38bdf8] shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-gray-500 uppercase text-[9px] tracking-wider">Office Location</span>
                    <span className="text-white font-semibold">Bengaluru, Karnataka, India</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-900/60 border border-[#7c3aed]/10">
                  <div className="w-10 h-10 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center border border-[#7c3aed]/30 text-emerald-400 shrink-0">
                    <Linkedin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-gray-500 uppercase text-[9px] tracking-wider">LinkedIn Network</span>
                    <a
                      href="https://www.linkedin.com/in/neethu-rokhade-ashoka/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#38bdf8] font-semibold transition-colors break-all"
                    >
                      linkedin.com/in/neethu-rokhade-ashoka
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Glassmorphic Contact Form */}
            <form
              onSubmit={handleContactSubmit}
              className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-2xl border border-[#7c3aed]/30 space-y-4"
            >
              {submitSuccess ? (
                <div className="p-8 text-center space-y-3 font-mono">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h3 className="text-lg font-bold text-white">Message Transmitted!</h3>
                  <p className="text-xs text-gray-400">
                    "Thank you for reaching out! I will process your message and respond directly to your email inbox shortly." <br />— Neethu R A
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-wider">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-slate-900/80 border border-[#7c3aed]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#38bdf8] transition-colors cursor-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-wider">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="johndoe@email.com"
                        className="w-full bg-slate-900/80 border border-[#7c3aed]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#38bdf8] transition-colors cursor-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-wider">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Opportunity Collaboration / Research"
                      className="w-full bg-slate-900/80 border border-[#7c3aed]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#38bdf8] transition-colors cursor-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-wider">Your Message</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Detail your requirements or meeting suggestions..."
                      className="w-full bg-slate-900/80 border border-[#7c3aed]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#38bdf8] transition-colors resize-none cursor-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="cursor-none w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#9333ea] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg glow-button transition-transform active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING MESSAGE...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 11. Footer Section */}
      <footer className="py-12 px-6 border-t border-[#7c3aed]/10 bg-slate-950 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2">
          <h4 className="text-white font-bold text-lg font-heading tracking-wide">Neethu R A</h4>
          <p className="text-xs text-gray-400">Software Developer | Full Stack Developer | AI Enthusiast</p>
        </div>
      </footer>
    </div>
  );
}
