import { useState } from "react";

interface SocialMedia {
  platform: string;
  username: string;
  url: string;
}

interface Technology {
  name: string;
  experience: string;
  icon: string;
  level: string;
  projects: number;
}

interface Education {
  institution: string;
  course: string;
  period: string;
  description: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

interface Profile {
  name: string;
  role: string;
  bio: string;
  location: string;
  avatar: string;
  email: string;
  phone: string;
  socialMedia: SocialMedia[];
  technologies: Technology[];
  education: Education[];
  experience: Experience[];
  languages: string[];
  interests: string[];
}

const initialProfile: Profile = {
  name: "Gabriel Pessoni",
  role: "Desenvolvedor Full Stack",
  bio: "Apaixonado por criar soluções inovadoras e impactantes. Sempre em busca de novos desafios e aprendizados na área de desenvolvimento. Especializado em arquiteturas escaláveis e boas práticas de desenvolvimento. Mentor de desenvolvedores iniciantes e entusiasta de tecnologias open source.",
  location: "São Paulo, Brasil",
  avatar: "https://avatars.githubusercontent.com/u/67373880?v=4",
  email: "gabriel.pessoni@email.com",
  phone: "(11) 99999-9999",
  socialMedia: [
    {
      platform: "GitHub",
      username: "joaosilva",
      url: "https://github.com/joaosilva"
    },
    {
      platform: "LinkedIn",
      username: "Gabriel Pessoni",
      url: "https://linkedin.com/in/joaosilva"
    },
    {
      platform: "Twitter",
      username: "@joaosilva",
      url: "https://twitter.com/joaosilva"
    }
  ],
  technologies: [
    {
      name: "React",
      experience: "3 anos",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      level: "Avançado",
      projects: 15
    },
    {
      name: "TypeScript",
      experience: "2 anos",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/1200px-Typescript.svg.png",
      level: "Intermediário",
      projects: 10
    },
    {
      name: "Node.js",
      experience: "3 anos",
      icon: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
      level: "Avançado",
      projects: 12
    }
  ],
  education: [
    {
      institution: "Universidade de São Paulo",
      course: "Ciência da Computação",
      period: "2018 - 2022",
      description: "Bacharelado com ênfase em Engenharia de Software"
    },
    {
      institution: "Alura",
      course: "Formação Full Stack",
      period: "2021",
      description: "Especialização em desenvolvimento web full stack"
    }
  ],
  experience: [
    {
      company: "Tech Solutions",
      role: "Desenvolvedor Full Stack Senior",
      period: "2021 - Presente",
      description: "Desenvolvimento de aplicações web escaláveis, liderança técnica de equipe"
    },
    {
      company: "Startup XYZ",
      role: "Desenvolvedor Front-end",
      period: "2019 - 2021",
      description: "Desenvolvimento de interfaces responsivas e otimização de performance"
    }
  ],
  languages: ["Português (Nativo)", "Inglês (Fluente)", "Espanhol (Intermediário)"],
  interests: ["Arquitetura de Software", "UI/UX Design", "DevOps", "Inteligência Artificial"]
};

export default function Profile() {
  const [profile, setProfile] = useState<Profile>(initialProfile);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <a href="/" className="text-pink-400 hover:text-pink-300 transition-colors duration-200 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </a>
        </div>
        {/* Cabeçalho com Avatar e Info Básica */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <div className="relative group">
            <div className="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-r from-pink-500 to-purple-500 p-1">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
            <p className="text-xl text-gray-400 mb-4">{profile.role}</p>

            <div className="flex items-center justify-center md:justify-start gap-4 text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{profile.phone}</span>
              </div>
            </div>

            <div className="flex justify-center md:justify-start gap-4">
              {profile.socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
                >
                  <span className="sr-only">{social.platform}</span>
                  {social.platform === "GitHub" && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                  {social.platform === "LinkedIn" && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  )}
                  {social.platform === "Twitter" && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Sobre mim
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {profile.bio}
          </p>
        </div>

        {/* Experiência */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Experiência Profissional
          </h2>
          <div className="space-y-6">
            {profile.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-pink-500 pl-4">
                <h3 className="font-bold text-lg">{exp.role}</h3>
                <p className="text-gray-400">{exp.company} • {exp.period}</p>
                <p className="text-gray-300 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Educação */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Educação
          </h2>
          <div className="space-y-6">
            {profile.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-purple-500 pl-4">
                <h3 className="font-bold text-lg">{edu.course}</h3>
                <p className="text-gray-400">{edu.institution} • {edu.period}</p>
                <p className="text-gray-300 mt-2">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tecnologias */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Tecnologias Favoritas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profile.technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-gray-700/50 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 p-2 flex items-center justify-center">
                  <img src={tech.icon} alt={tech.name} className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-medium">{tech.name}</h3>
                  <p className="text-sm text-gray-400">{tech.experience}</p>
                  <p className="text-sm text-gray-400">Nível: {tech.level}</p>
                  <p className="text-sm text-gray-400">{tech.projects} projetos</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Idiomas e Interesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Idiomas
            </h2>
            <ul className="space-y-2">
              {profile.languages.map((language, index) => (
                <li key={index} className="text-gray-300">{language}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Interesses
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
