import { useState } from "react";
import Link from "next/link";
const initialUsers = [
  {
    name: "João Silva",
    email: "joao@empresa.com",
    role: "Desenvolvedor",
    team: "Time Principal",
    lastActive: "Há 5 minutos",
  },
  {
    name: "Maria Santos",
    email: "maria@empresa.com",
    role: "Designer",
    team: "Time Principal",
    lastActive: "Há 2 horas",
  },
];

export default function UsersList() {
  const [users, setUsers] = useState(initialUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    team: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.role || !form.team) return;
    setUsers((prev) => [...prev, { ...form, lastActive: "Agora mesmo" }]);
    setIsDialogOpen(false);
    setForm({
      name: "",
      email: "",
      role: "",
      team: "",
    });
  };

  const handleSort = (key: any) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleRemoveUser = (email: string) => {
    setUsers((prev) => prev.filter(user => user.email !== email));
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredUsers = sortedUsers.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/times" className="text-pink-400 hover:text-pink-300 transition-colors duration-200 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </Link>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
              <span className="text-2xl font-bold">TP</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold">Time Principal</h1>
              <p className="text-gray-400 mt-2">Gerenciamento de membros da equipe</p>
            </div>
          </div>
          <button
            className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 rounded-lg text-white font-medium 
            hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-pink-500/20"
            onClick={() => setIsDialogOpen(true)}
          >
            Adicionar Membro
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar membros..."
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

        <div className="bg-gray-800/50 rounded-xl shadow-xl backdrop-blur-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-4 px-6 text-left text-gray-400 font-medium cursor-pointer hover:text-pink-400 transition-colors duration-200"
                  onClick={() => handleSort("name")}>
                  Nome
                </th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium">Email</th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium">Cargo</th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium cursor-pointer hover:text-pink-400 transition-colors duration-200"
                  onClick={() => handleSort("lastActive")}>
                  Última atividade
                </th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors duration-200">
                  <td className="py-4 px-6 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                      {user.name[0]}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-400">{user.lastActive}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleRemoveUser(user.email)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Adicionar Novo Membro
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Nome completo"
              className="w-full p-3 mb-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 mb-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="role"
              placeholder="Cargo"
              className="w-full p-3 mb-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="team"
              placeholder="Time"
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
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
