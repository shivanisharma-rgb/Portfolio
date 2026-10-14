import { useEffect, useState } from "react";
import "../styles.css";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";

export default function App() {
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));

    return () => revealObserver.disconnect();
  }, []);

  async function handleContactSubmit(event) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    setIsSubmitting(true);
    setFormStatus("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to save your message right now.");
      setFormStatus(result.message);
      form.reset();
    } catch (error) {
      setFormStatus(error instanceof Error ? error.message : "Unable to save your message right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function downloadResume() {
    const resume = [
      "SHIVANI SHARMA",
      "BCA Student | Aspiring Business Developer | Web Development Enthusiast",
      "",
      "CONTACT",
      "Phone: +91 76178 94298",
      "Email: shivanisharma25@navgurukul.org",
      "LinkedIn: https://www.linkedin.com/in/shivani-sharma-a50274392/",
      "GitHub: https://github.com/shivanisharma-rgb",
      "",
      "PROFILE",
      "Second-year BCA student at Eternal University interested in technology, business development, marketing, and sales. Developing technical and professional skills through practical projects, teamwork, and internship experience.",
      "",
      "EDUCATION",
      "Bachelor of Computer Applications (BCA), currently in second year",
      "Eternal University, Baru Sahib, Sirmaur, Himachal Pradesh, India",
      "",
      "INTERNSHIP",
      "YSF — Business Marketing Internship (1 month)",
      "Introductory learning in business fundamentals, raw-material selection, procurement, logistics, and business operations.",
      "",
      "TECHNICAL SKILLS",
      "HTML and CSS, JavaScript, React, Node.js, Express.js, MongoDB, REST APIs, Git, GitHub",
      "",
      "BUSINESS AND PROFESSIONAL SKILLS",
      "Communication, marketing and sales, teamwork and collaboration, business development, willingness to learn",
      "",
      "PRACTICAL PROJECTS",
      "EcoWatch; Smart Daily Task Manager; AI Practice Hub / Ask Gemini; CollabSphere; Contact Collector / Progress Tracker",
      "Project technology details and links to be confirmed.",
    ].join("\n");
    const fileUrl = URL.createObjectURL(new Blob([resume], { type: "text/plain;charset=utf-8" }));
    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = "Shivani-Sharma-Resume.txt";
    document.body.append(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    URL.revokeObjectURL(fileUrl);
  }

  return (
    <>
    <a className="skip-link" href="#main">Skip to content</a>
        <header className="site-header">
          <nav className="nav container" aria-label="Main navigation">
            <a className="wordmark" href="#home" aria-label="Shivani Sharma home">shivani<span>.</span></a>
            <button className="menu-toggle" type="button" aria-expanded={isNavOpen} aria-controls="nav-links" aria-label={isNavOpen ? "Close navigation" : "Open navigation"} onClick={() => setIsNavOpen(!isNavOpen)}>
              <span></span><span></span>
            </button>
            <div className={`nav-links${isNavOpen ? " is-open" : ""}`} id="nav-links" onClick={() => setIsNavOpen(false)}>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#experience">Internship</a>
              <a href="#education">Education</a>
              <a className="nav-contact" href="#contact">Contact <span aria-hidden="true">↗</span></a>
            </div>
          </nav>
        </header>
    
        <main id="main">
          <section className="hero section-shell" id="home">
            <div className="hero-orb hero-orb-one" aria-hidden="true"></div>
            <div className="hero-orb hero-orb-two" aria-hidden="true"></div>
            <div className="hero-inner container">
              <div className="hero-copy">
                <p className="eyebrow"><span className="availability-dot"></span> BCA student · Eternal University</p>
                <h1>Curious mind.<br /><span>Thoughtful work.</span></h1>
                <p className="hero-intro">I’m <strong>Shivani Sharma</strong> — an aspiring business developer and web development enthusiast, interested in bringing people, ideas, and technology together.</p>
                <p className="hero-role">BCA Student <i aria-hidden="true">·</i> Aspiring Business Developer <i aria-hidden="true">·</i> Web Development Enthusiast</p>
                <div className="hero-actions">
                  <a className="button button-primary" href="#projects">View projects <span aria-hidden="true">↗</span></a>
                  <a className="button button-outline" href="#contact">Contact me <span aria-hidden="true">→</span></a>
                </div>
                <div className="hero-socials" aria-label="Social profiles">
                  <a href="mailto:shivanisharma25@navgurukul.org">Email <span aria-hidden="true">↗</span></a>
                  <a href="https://www.linkedin.com/in/shivani-sharma-a50274392/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
                  <a href="https://github.com/shivanisharma-rgb" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
                </div>
              </div>
              <div className="hero-visual">
                <div className="portrait-frame">
                  <div className="portrait-backdrop"></div>
                  <img className="portrait" src="assets/shivani-sharma.png" alt="Portrait of Shivani Sharma" />
                  <div className="portrait-caption">
                    <span className="caption-mark" aria-hidden="true">S.</span>
                    <span><strong>Shivani Sharma</strong><small>Learning by doing</small></span>
                    <span className="caption-spark" aria-hidden="true">✳</span>
                  </div>
                </div>
                <div className="floating-note"><span className="note-icon" aria-hidden="true">✳</span><span>Open to learning<br />and growing together</span></div>
                <span className="visual-doodle" aria-hidden="true">✳</span>
              </div>
            </div>
            <a className="scroll-cue" href="#about"><span></span> Scroll to explore</a>
          </section>
    
          <section className="section section-about" id="about">
            <div className="container about-grid">
              <div className="section-heading reveal">
                <p className="eyebrow">A little about me</p>
                <h2>Good work starts<br />with <span>curiosity.</span></h2>
                <span className="heading-dash" aria-hidden="true"></span>
              </div>
              <div className="about-copy reveal">
                <p className="lead">I’m a second-year BCA student at Eternal University with an interest in technology, business development, marketing, and sales.</p>
                <p>I’m building my technical and professional skills through practical projects, teamwork, and internship experience. I enjoy learning new technologies, communicating with people, solving problems, and collaborating with teams.</p>
                <p>My goal is to combine my technical knowledge and business skills to contribute to an organization and grow professionally.</p>
                <a className="text-link" href="#experience">A little about my experience <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            <div className="interest-strip container reveal">
              <span>Currently curious about</span>
              <div><b>01</b> Business development</div><div><b>02</b> Marketing &amp; sales</div><div><b>03</b> Web development</div><div><b>04</b> Client relationships</div>
            </div>
          </section>
    
          <section className="section section-skills" id="skills">
            <div className="container">
              <div className="section-topline reveal">
                <div className="section-heading">
                  <p className="eyebrow">What I’m building</p>
                  <h2>Skills &amp; <span>strengths.</span></h2>
                </div>
                <p className="section-aside">A growing toolkit, shaped by practice and a willingness to learn.</p>
              </div>
              <div className="skills-grid">
                <article className="skill-card technical-card reveal">
                  <div className="skill-card-head"><span className="skill-icon" aria-hidden="true">&lt;/&gt;</span><span className="skill-index">01 / TECHNICAL</span></div>
                  <h3>Technology</h3>
                  <p>Tools and technologies I’m learning and applying in practice.</p>
                  <div className="skill-tags">
                    <span>HTML &amp; CSS</span><span>JavaScript</span><span>React</span><span>Node.js</span><span>Express.js</span><span>MongoDB</span><span>REST APIs</span><span>Git</span><span>GitHub</span>
                  </div>
                </article>
                <article className="skill-card professional-card reveal">
                  <div className="skill-card-head"><span className="skill-icon" aria-hidden="true">✳</span><span className="skill-index">02 / PROFESSIONAL</span></div>
                  <h3>People &amp; business</h3>
                  <p>Interests and strengths I bring to a collaborative team.</p>
                  <div className="skill-tags">
                    <span>Communication</span><span>Marketing &amp; sales</span><span>Teamwork</span><span>Collaboration</span><span>Business development</span><span>Willingness to learn</span>
                  </div>
                </article>
              </div>
            </div>
          </section>
    
          <section className="section section-projects" id="projects">
            <div className="container">
              <div className="section-topline reveal">
                <div className="section-heading">
                  <p className="eyebrow">A few things I’ve explored</p>
                  <h2>Projects &amp; <span>practice.</span></h2>
                </div>
                <p className="section-aside">A few live demos from my practical work. I’ve kept technology details accurate and marked unconfirmed stacks.</p>
              </div>
              <div className="projects-grid">
                <article className="project-card reveal">
                  <div className="project-preview preview-eco" role="img" aria-label="Concept preview of an environmental issue reporting dashboard">
                    <div className="mock-window"><div className="mock-top"><span className="mock-logo"><i></i> ecowatch</span><span className="mock-avatar">S</span></div><div className="mock-body"><div className="mock-sidebar"><i></i><i></i><i></i><i></i></div><div className="mock-content"><span className="mock-kicker">COMMUNITY OVERVIEW</span><b>Cleaner places, together.</b><div className="mock-stat-row"><span><i className="stat-dot green"></i>Resolved <strong>18</strong></span><span><i className="stat-dot amber"></i>In progress <strong>07</strong></span></div><div className="mock-map"><span className="map-pin pin-a"></span><span className="map-pin pin-b"></span><span className="map-pin pin-c"></span><span className="map-road road-one"></span><span className="map-road road-two"></span></div></div></div></div>
                    <span className="preview-label">Concept preview</span>
                  </div>
                  <div className="project-info"><div className="project-number">01 <span>— COMMUNITY &amp; ENVIRONMENT</span></div><h3>EcoWatch</h3><p>An environmental monitoring project for reporting community issues such as waste dumping and pollution, and tracking progress toward resolution.</p><div className="project-tags"><span>Environmental monitoring</span><span>Technology details to confirm</span></div><div className="project-actions"><button type="button" className="button button-small button-muted" disabled>GitHub link pending</button><button type="button" className="button button-small button-muted" disabled>Live demo pending</button></div></div>
                </article>
                <article className="project-card reveal">
                  <div className="project-preview preview-tasks" role="img" aria-label="Concept preview of a daily task list and progress tracker">
                    <div className="mock-window task-window"><div className="task-heading"><div><span className="mock-kicker">YOUR SPACE</span><b>Today, made manageable.</b></div><span className="task-add">+</span></div><div className="task-progress"><span>Daily progress</span><b>3 of 5</b><i><u></u></i></div><div className="task-item done"><span className="task-check">✓</span><span>Review class notes</span><small>09:00</small></div><div className="task-item done"><span className="task-check">✓</span><span>Reply to messages</span><small>11:30</small></div><div className="task-item"><span className="task-check"></span><span>Practice JavaScript</span><small>02:00</small></div><div className="task-item"><span className="task-check"></span><span>Plan tomorrow</span><small>04:30</small></div></div>
                    <span className="preview-label">Concept preview</span>
                  </div>
                  <div className="project-info"><div className="project-number">02 <span>— PLANNING &amp; PRODUCTIVITY</span></div><h3>Smart Daily Task Manager</h3><p>A task management application for organizing daily tasks and tracking their completion.</p><div className="project-tags"><span>Task management</span><span>Technology details to confirm</span></div><div className="project-actions"><button type="button" className="button button-small button-muted" disabled>GitHub link pending</button><a className="button button-small button-primary" href="https://shivani-smart-task-manager-2026.netlify.app/" target="_blank" rel="noreferrer">Live demo ↗</a></div></div>
                </article>
                <article className="project-card reveal">
                  <div className="project-preview preview-ai" role="img" aria-label="Concept preview of an AI learning assistant chat">
                    <div className="mock-window ai-window"><div className="ai-nav"><span className="ai-spark">✳</span><b>Ask Gemini</b><span className="ai-menu">•••</span></div><div className="ai-chat"><span className="ai-welcome">What would you like<br />to learn today?</span><div className="ai-prompt">Can you help me practise a new topic?</div><div className="ai-answer"><span className="ai-spark">✳</span><span>Of course! Tell me what you’re exploring, and we can take it one step at a time.</span></div></div><div className="ai-input">Ask anything <span>↑</span></div></div>
                    <span className="preview-label">Concept preview</span>
                  </div>
                  <div className="project-info"><div className="project-number">03 <span>— AI &amp; LEARNING</span></div><h3>AI Practice Hub / Ask Gemini</h3><p>An AI-powered practice application designed to provide helpful responses and learning content through Gemini API integration.</p><div className="project-tags"><span>Gemini API integration</span><span>Other technologies to confirm</span></div><div className="project-actions"><button type="button" className="button button-small button-muted" disabled>GitHub link pending</button><a className="button button-small button-primary" href="https://phase-5-shivani.netlify.app/" target="_blank" rel="noreferrer">Live demo ↗</a></div></div>
                </article>
                <article className="project-card reveal">
                  <div className="project-preview preview-collab" role="img" aria-label="Concept preview of the CollabSphere workspace application">
                    <div className="mock-window collab-window"><div className="collab-top"><b>◈ CollabSphere</b><span>Log in　 Register</span></div><div className="collab-body"><span className="mock-kicker">WELCOME TO COLLABSPHERE</span><b>Project clarity,<br />all in one workspace.</b><p>Organize your work and collaborate with your team.</p><span className="collab-signin">Sign in　 ↗</span><div className="collab-features"><span>Projects</span><span>Shared files</span><span>AI tools</span></div></div></div>
                    <span className="preview-label">Live project preview</span>
                  </div>
                  <div className="project-info"><div className="project-number">04 <span>— COLLABORATION &amp; WORKSPACE</span></div><h3>CollabSphere</h3><p>A collaborative workspace for creating projects, sharing files and notes, and using AI tools for documentation.</p><div className="project-tags"><span>Project workspace</span><span>AI tools</span></div><div className="project-actions"><button type="button" className="button button-small button-muted" disabled>GitHub link pending</button><a className="button button-small button-primary" href="https://venerable-semolina-c405b0.netlify.app/login" target="_blank" rel="noreferrer">Live demo ↗</a></div></div>
                </article>
                <article className="project-card reveal">
                  <div className="project-preview preview-ai" role="img" aria-label="Preview of a personal web project">
                    <div className="mock-window ai-window"><div className="ai-nav"><span className="ai-spark">✳</span><b>Personal Web Project</b></div><div className="ai-chat"><span className="ai-welcome">A personal page,<br />made with care.</span><div className="ai-prompt">A small web project</div><div className="ai-answer"><span className="ai-spark">✳</span><span>A personal web project made by Shivani.</span></div></div><div className="ai-input">Visit live project <span>↗</span></div></div>
                    <span className="preview-label">Live project preview</span>
                  </div>
                  <div className="project-info"><div className="project-number">05 <span>— PERSONAL WEB PROJECT</span></div><h3>Personal Web Project</h3><p>A personal web project created as a small expressive website.</p><div className="project-tags"><span>Personal web project</span><span>Technology details to confirm</span></div><div className="project-actions"><button type="button" className="button button-small button-muted" disabled>GitHub link pending</button><a className="button button-small button-primary" href="https://shivani-web-project.netlify.app/" target="_blank" rel="noreferrer">Live demo ↗</a></div></div>
                </article>
                <article className="project-card reveal">
                  <div className="project-preview preview-tracker" role="img" aria-label="Concept preview of a contact list and progress tracker">
                    <div className="mock-window tracker-window"><div className="tracker-top"><div><span className="mock-kicker">KEEP THINGS MOVING</span><b>Small steps add up.</b></div><span className="tracker-plus">+</span></div><div className="tracker-progress"><span>Weekly progress</span><b>68%</b><i><u></u></i></div><div className="tracker-row"><span className="tracker-bubble">A</span><span><b>New connections</b><small>Contacts collected</small></span><strong>12</strong></div><div className="tracker-row"><span className="tracker-bubble bubble-two">✓</span><span><b>Learning goals</b><small>Progress this week</small></span><strong>4/6</strong></div><div className="tracker-row"><span className="tracker-bubble bubble-three">↗</span><span><b>Next milestone</b><small>Keep up the momentum</small></span><strong>→</strong></div></div>
                    <span className="preview-label">Concept preview</span>
                  </div>
                  <div className="project-info"><div className="project-number">06 <span>— CONTACTS &amp; PROGRESS</span></div><h3>Contact Collector / Progress Tracker</h3><p>Practice applications for collecting contact information or tracking progress.</p><div className="project-tags"><span>Practice applications</span><span>Technology details to confirm</span></div><div className="project-actions"><button type="button" className="button button-small button-muted" disabled>GitHub link pending</button><button type="button" className="button button-small button-muted" disabled>Live demo pending</button></div></div>
                </article>
              </div>
            </div>
          </section>
    
          <section className="section section-experience" id="experience">
            <div className="container">
              <div className="section-topline reveal">
                <div className="section-heading">
                  <p className="eyebrow">Learning beyond the classroom</p>
                  <h2>Internship &amp; <span>certificate.</span></h2>
                </div>
                <p className="section-aside">An introduction to the people, processes, and decisions behind business operations.</p>
              </div>
              <div className="experience-grid reveal">
                <article className="experience-card">
                  <div className="experience-date"><span className="date-dot"></span> 1 month</div>
                  <p className="eyebrow">Business marketing internship</p>
                  <h3>YSF</h3>
                  <p className="experience-description">Gained introductory knowledge of business fundamentals, raw-material selection, procurement, logistics, and business operations. The experience helped me understand how different business activities work together and strengthened my interest in business development and marketing.</p>
                  <div className="experience-footer"><span>Business fundamentals</span><span>Marketing</span><span>Operations</span></div>
                </article>
                <a className="certificate-card" href="assets/internship-certificate.png" target="_blank" rel="noreferrer" aria-label="Open the YFS Virtual Internship Program 2026 certificate image">
                  <div className="certificate-image-wrap"><img src="assets/internship-certificate.png" alt="Internship certificate for Shivani Sharma, YFS Virtual Internship Program 2026" /><span className="certificate-open" aria-hidden="true">↗</span></div>
                  <div className="certificate-caption"><span><b>Certificate of Internship</b><small>YFS Virtual Internship Program 2026 · Foundations of Inventory and Manufacturing Flow</small></span><span className="certificate-link">View certificate ↗</span></div>
                </a>
              </div>
              <p className="certificate-note">Certificate title is shown as printed on the supplied certificate.</p>
            </div>
          </section>
    
          <section className="section section-education" id="education">
            <div className="container education-wrap reveal">
              <div className="section-heading">
                <p className="eyebrow">The learning journey</p>
                <h2>Education &amp; <span>direction.</span></h2>
              </div>
              <article className="education-card">
                <div className="education-mark" aria-hidden="true">EU</div>
                <div className="education-info"><p className="eyebrow">Currently in second year</p><h3>Bachelor of Computer Applications <span>(BCA)</span></h3><p>Eternal University</p><span className="education-location">Baru Sahib, Sirmaur, Himachal Pradesh, India</span></div>
                <span className="education-year">Undergraduate</span>
              </article>
              <div className="education-quote"><span aria-hidden="true">“</span><p>Building technical foundations while staying curious about how businesses grow and people connect.</p></div>
            </div>
          </section>
    
          <section className="section section-contact" id="contact">
            <div className="container">
              <div className="contact-heading reveal">
                <p className="eyebrow">Have an opportunity or an idea?</p>
                <h2>Let’s start a<br /><span>conversation.</span></h2>
                <p>I’d love to connect, learn about your work, or explore how I could contribute.</p>
              </div>
              <div className="contact-grid">
                <div className="contact-details reveal">
                  <a className="contact-method" href="mailto:shivanisharma25@navgurukul.org"><span className="contact-icon" aria-hidden="true">✉</span><span><small>EMAIL</small><b>shivanisharma25@navgurukul.org</b></span><span className="contact-arrow" aria-hidden="true">↗</span></a>
                  <a className="contact-method" href="tel:+917617894298"><span className="contact-icon" aria-hidden="true">↗</span><span><small>PHONE</small><b>+91 76178 94298</b></span><span className="contact-arrow" aria-hidden="true">↗</span></a>
                  <a className="contact-method" href="https://www.linkedin.com/in/shivani-sharma-a50274392/" target="_blank" rel="noreferrer"><span className="contact-icon text-icon" aria-hidden="true">in</span><span><small>LINKEDIN</small><b>Connect with me</b></span><span className="contact-arrow" aria-hidden="true">↗</span></a>
                  <a className="contact-method" href="https://github.com/shivanisharma-rgb" target="_blank" rel="noreferrer"><span className="contact-icon text-icon" aria-hidden="true">GH</span><span><small>GITHUB</small><b>See my GitHub profile</b></span><span className="contact-arrow" aria-hidden="true">↗</span></a>
                  <button className="resume-button" type="button" id="download-resume" onClick={downloadResume}><span className="resume-icon" aria-hidden="true">↓</span><span><b>Download my resume</b><small>Save a concise profile as a text file</small></span><span className="contact-arrow" aria-hidden="true">↗</span></button>
                </div>
                <form className="contact-form reveal" id="contact-form" onSubmit={handleContactSubmit}>
                  <h3>Send a message</h3>
                  <p>Your message is saved to the portfolio database; messages are not emailed automatically.</p>
                  <label htmlFor="form-name">Your name</label><input id="form-name" name="name" type="text" autoComplete="name" placeholder="Jane Smith" required />
                  <label htmlFor="form-email">Email address</label><input id="form-email" name="email" type="email" autoComplete="email" placeholder="jane@example.com" required />
                  <label htmlFor="form-subject">Subject</label><input id="form-subject" name="subject" type="text" placeholder="An opportunity to connect" required />
                  <label htmlFor="form-message">Message</label><textarea id="form-message" name="message" rows="4" placeholder="Write your message here..." required></textarea>
                  <button className="button button-primary form-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving message…" : "Send message"} <span aria-hidden="true">↗</span></button>
                  <p className="form-status" id="form-status" aria-live="polite">{formStatus}</p>
                </form>
              </div>
            </div>
          </section>
        </main>
    
        <footer className="site-footer">
          <div className="container footer-inner">
            <a className="wordmark footer-wordmark" href="#home">shivani<span>.</span></a>
            <p>Made with care by Shivani Sharma <span aria-hidden="true">✳</span></p>
            <div className="footer-socials"><a href="mailto:shivanisharma25@navgurukul.org">Email</a><a href="https://www.linkedin.com/in/shivani-sharma-a50274392/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/shivanisharma-rgb" target="_blank" rel="noreferrer">GitHub</a></div>
            <a className="back-top" href="#home" aria-label="Back to top">↑</a>
          </div>
        </footer>
        </>
  );
}
