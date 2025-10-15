export default function Home() {
  // Load data from environment variables
  const name = process.env.NEXT_PUBLIC_NAME || 'Your Name';
  const title = process.env.NEXT_PUBLIC_TITLE || 'Developer';
  const bio1 = process.env.NEXT_PUBLIC_BIO_1 || '';
  const bio2 = process.env.NEXT_PUBLIC_BIO_2 || '';
  const email = process.env.NEXT_PUBLIC_EMAIL || '';
  const github = process.env.NEXT_PUBLIC_GITHUB || '';
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN || '';
  const twitter = process.env.NEXT_PUBLIC_TWITTER || '';
  
  // Load skills
  const skillsStr = process.env.NEXT_PUBLIC_SKILLS || '';
  const skills = skillsStr.split(',').map(s => s.trim()).filter(Boolean);
  
  // Load projects dynamically
  const projects = [];
  let i = 1;
  while (process.env[`NEXT_PUBLIC_PROJECT_${i}_TITLE`]) {
    projects.push({
      title: process.env[`NEXT_PUBLIC_PROJECT_${i}_TITLE`],
      desc: process.env[`NEXT_PUBLIC_PROJECT_${i}_DESC`] || '',
      demo: process.env[`NEXT_PUBLIC_PROJECT_${i}_DEMO`] || '',
      repo: process.env[`NEXT_PUBLIC_PROJECT_${i}_REPO`] || '',
    });
    i++;
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center">
        <div className="text-xl font-mono">
          <span className="text-[#D2B450]">&lt;</span>
          <span className="text-[#FFFFF0]">dev</span>
          <span className="text-[#D2B450]">/&gt;</span>
        </div>
        <ul className="flex gap-8 font-mono text-sm">
          <li><a href="#about" className="hover:text-[#D2B450] transition-colors">About</a></li>
          <li><a href="#projects" className="hover:text-[#D2B450] transition-colors">Projects</a></li>
          <li><a href="#contact" className="hover:text-[#D2B450] transition-colors">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl">
          <h1 className="lato-black text-6xl md:text-8xl mb-6 text-[#D2B450]">
            Hello, I&apos;m <span className="text-[#FFFFF0]">{name}</span>
          </h1>
          <p className="font-mono text-xl md:text-2xl text-[#FFFFF0] mb-8">
            {title}
          </p>
          <div className="flex gap-4">
            <a 
              href="#projects" 
              className="px-8 py-3 bg-[#7D4930] text-[#FFFFF0] font-mono rounded hover:bg-[#D2B450] hover:text-[#3b3c36] transition-all"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 border-2 border-[#7D4930] text-[#FFFFF0] font-mono rounded hover:border-[#D2B450] hover:text-[#D2B450] transition-all"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-8 py-20">
        <div className="max-w-4xl">
          <h2 className="lato-bold text-5xl md:text-6xl mb-8 text-[#D2B450]">About Me</h2>
          <div className="space-y-6 font-mono text-lg text-[#FFFFF0]">
            {bio1 && <p>{bio1}</p>}
            {bio2 && <p>{bio2}</p>}
            <div className="pt-8">
              <h3 className="lato-bold text-2xl mb-4 text-[#D2B450]">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-[rgb(125,73,48)] text-[#FFFFF0] rounded font-mono text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-8 py-20">
        <div className="max-w-6xl w-full">
          <h2 className="lato-bold text-5xl md:text-6xl mb-12 text-[#D2B450]">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div key={idx} className="border-2 border-[#7D4930] rounded-lg p-6 hover:border-[#D2B450] transition-colors">
                <h3 className="lato-bold text-2xl mb-3 text-[#D2B450]">{project.title}</h3>
                <p className="font-mono text-[#FFFFF0] mb-4">
                  {project.desc}
                </p>
                <div className="flex gap-4 font-mono text-sm">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-[#FFFFF0] hover:text-[#D2B450] transition-colors">
                      View Demo →
                    </a>
                  )}
                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-[#FFFFF0] hover:text-[#D2B450] transition-colors">
                      Source Code →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-8 py-20">
        <div className="max-w-4xl w-full text-center">
          <h2 className="lato-bold text-5xl md:text-6xl mb-8 text-[#D2B450]">Let&apos;s Connect</h2>
          <p className="font-mono text-xl text-[#FFFFF0] mb-12">
            I&apos;m always interested in hearing about new projects and opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            {email && (
              <a 
                href={`mailto:${email}`}
                className="px-8 py-3 bg-[#7D4930] text-[#FFFFF0] font-mono rounded hover:bg-[#D2B450] hover:text-[#3b3c36] transition-all"
              >
                Send Email
              </a>
            )}
            {github && (
              <a 
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-[#7D4930] text-[#FFFFF0] font-mono rounded hover:border-[#D2B450] hover:text-[#D2B450] transition-all"
              >
                GitHub
              </a>
            )}
            {linkedin && (
              <a 
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-[#7D4930] text-[#FFFFF0] font-mono rounded hover:border-[#D2B450] hover:text-[#D2B450] transition-all"
              >
                LinkedIn
              </a>
            )}
          </div>
          {twitter && (
            <div className="font-mono text-sm text-[#7D4930]">
              <p>You can also find me on:</p>
              <div className="flex gap-4 justify-center mt-4">
                <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-[#FFFFF0] hover:text-[#D2B450] transition-colors">Twitter</a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t-2 border-[#7D4930]">
        <div className="max-w-6xl mx-auto text-center font-mono text-sm text-[#FFFFF0]">
          <p>© 2025 {name}. Built with Next.js & Tailwind CSS</p>
          <p className="mt-2 text-[#7D4930]">Designed & Developed with passion</p>
        </div>
      </footer>
    </div>
  );
}
        