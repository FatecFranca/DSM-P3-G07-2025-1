import { useState } from "react";

const initialWorkspaces = [
  {
    name: "Meu Espaço",
    createdBy: "Você",
    access: "Somente o criador",
    type: "Pessoal",
    lastUpdated: "5 meses atrás",
  },
  {
    name: "Espaço da Equipe",
    createdBy: "Usuário privado",
    access: "Todos no time Snack Prompt",
    type: "Time (3 membros)",
    lastUpdated: "10 meses atrás",
  },
];

export default function WorkspaceList() {
  const [workspaces, setWorkspaces] = useState(initialWorkspaces);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    createdBy: "",
    access: "",
    type: "",
    lastUpdated: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.createdBy || !form.access || !form.type) return;
    setWorkspaces((prev) => [...prev, { ...form, lastUpdated: "Agora mesmo" }]);
    setIsDialogOpen(false);
    setForm({
      name: "",
      createdBy: "",
      access: "",
      type: "",
      lastUpdated: "",
    });
  };

  const handleSort = (key: any) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedWorkspaces = [...workspaces].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredWorkspaces = sortedWorkspaces.filter((workspace) =>
    Object.values(workspace).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <a href="/" className="text-pink-400 hover:text-pink-300 transition-colors duration-200 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </a>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Espaços de Trabalho
            </h1>
            <p className="text-gray-400 mt-2">
              Um diretório de todos os espaços de trabalho no Snack Prompt.
            </p>
          </div>
          <button
            className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 rounded-lg text-white font-medium 
            hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-pink-500/20"
            onClick={() => setIsDialogOpen(true)}
          >
            Novo Espaço
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar espaços..."
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
                  Nome do espaço
                </th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium">Autor</th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium">Acessos</th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium cursor-pointer hover:text-pink-400 transition-colors duration-200"
                  onClick={() => handleSort("lastUpdated")}>
                  Última atualização
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkspaces.map((workspace, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors duration-200">
                  <td className="py-4 px-6 font-medium">{workspace.name}</td>
                  <td className="py-4 px-6 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                      {workspace.createdBy[0]}
                    </div>
                    {workspace.createdBy}
                  </td>
                  <td className="py-4 px-6">
                    {workspace.access}{" "}
                    <span className="text-gray-400 text-sm">
                      ({workspace.type})
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-400">{workspace.lastUpdated}</td>
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
              Criar Novo Espaço
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Nome do espaço"
              className="w-full p-3 mb-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="createdBy"
              placeholder="Autor"
              className="w-full p-3 mb-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="access"
              placeholder="Nível de acesso"
              className="w-full p-3 mb-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="type"
              placeholder="Tipo do espaço"
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
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
