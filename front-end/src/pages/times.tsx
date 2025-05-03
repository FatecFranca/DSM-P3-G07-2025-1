import { useState } from "react";
import { useRouter } from "next/router";

const initialTeams = [
  {
    name: "Time Principal",
    description: "Equipe responsável pelo desenvolvimento do produto principal",
    leader: "João Silva",
    members: 8,
    projects: 3,
    status: "Ativo"
  },
  {
    name: "Time de Design",
    description: "Equipe focada na experiência do usuário e interface",
    leader: "Maria Santos", 
    members: 5,
    projects: 2,
    status: "Ativo"
  }
];

export default function TeamsList() {
  const router = useRouter();
  const [teams, setTeams] = useState(initialTeams);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    leader: "",
    members: 0,
    projects: 0,
    status: "Ativo"
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.description || !form.leader) return;
    setTeams((prev) => [...prev, form]);
    setIsDialogOpen(false);
    setForm({
      name: "",
      description: "",
      leader: "",
      members: 0,
      projects: 0,
      status: "Ativo"
    });
  };

  const handleSort = (key: any) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleRemoveTeam = (name: string) => {
    setTeams((prev) => prev.filter(team => team.name !== name));
  };

  const sortedTeams = [...teams].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredTeams = sortedTeams.filter((team) =>
    Object.values(team).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <a href="/perfil" className="text-pink-400 hover:text-pink-300 transition-colors duration-200 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </a>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Times</h1>
            <p className="text-gray-400 mt-2">Gerenciamento de times da empresa</p>
          </div>
          <button
            className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 rounded-lg text-white font-medium 
            hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-pink-500/20"
            onClick={() => setIsDialogOpen(true)}
          >
            Criar Novo Time
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar times..."
              className="w-full p-4 pl-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white 
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team, index) => (
            <div 
              key={index} 
              className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/30 cursor-pointer hover:bg-gray-800/70 transition-all duration-200"
              onClick={() => router.push('/users')}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{team.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{team.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTeam(team.name);
                  }}
                  className="text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Líder: {team.leader}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{team.members} membros</span>
                </div>

                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>{team.projects} projetos</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    team.status === "Ativo" ? "bg-green-500/20 text-green-400" : "bg-gray-700 text-gray-400"
                  }`}>
                    {team.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Criar Novo Time
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Nome do time"
              className="w-full p-3 mb-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Descrição"
              className="w-full p-3 mb-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="leader"
              placeholder="Líder do time"
              className="w-full p-3 mb-6 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              onChange={handleInputChange}
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-6 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 
                transition-all duration-200"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 rounded-lg text-white font-medium
                hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-pink-500/20"
                onClick={handleSubmit}
              >
                Criar Time
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
