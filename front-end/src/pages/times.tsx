import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Topbar } from "./components/Topbar";
import { toast } from "react-toastify";

interface Team {
  id: string;
  name: string;
  description: string;
  users: User[];
  collections: Collection[];
  status: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Collection {
  id: string;
  name: string;
  description: string;
}

export default function TeamsList() {
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    members: 0,
    projects: 0,
    status: "Ativo"
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);


  const fetchTeams = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/user`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTeams(data);
      } else {
        toast.error('Erro ao carregar times');
      }
    } catch (error) {
      toast.error('Erro ao carregar times');
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.description) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description
        })
      });

      if (response.ok) {
        toast.success('Time criado com sucesso');
        setIsDialogOpen(false);
        setForm({
          name: "",
          description: "",
          members: 0,
          projects: 0,
          status: "Ativo"
        });
        fetchTeams();
      } else {
        toast.error('Erro ao criar time');
      }
    } catch (error) {
      toast.error('Erro ao criar time');
    }
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


  const confirmRemoveTeam = async () => {
    if (!teamToDelete) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        toast.success('Time removido com sucesso');
        setTeamToDelete(null);
        fetchTeams();
      } else {
        toast.error('Erro ao remover time');
      }
    } catch (error) {
      toast.error('Erro ao remover time');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Topbar />
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
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/30 cursor-pointer hover:bg-gray-800/70 transition-all duration-200"
              onClick={() => router.push(`/users/${team.id}`)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{team.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{team.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTeamToDelete(team);
                    setIsDeleteDialogOpen(true);
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{team.users.length} membros</span>
                </div>

                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>{team.collections.length} projetos</span>
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

      {teamToDelete && isDeleteDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-xl shadow-lg p-6 max-w-sm w-full border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Confirmar exclusão</h2>
            <p className="text-gray-400 mb-6">
              Tem certeza que deseja excluir o time <span className="text-red-400 font-medium">{teamToDelete.name}</span>?
              Esta ação não poderá ser desfeita.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setTeamToDelete(null)}
                className="px-4 py-2 rounded-md text-white bg-gray-700 hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmRemoveTeam}
                className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-500 transition"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>


  );
}
