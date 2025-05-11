import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Topbar } from "./components/Topbar";

interface Collection {
  id: string;
  name: string;
  description?: string;
  type: 'development' | 'production' | 'staging';
  createdAt: string;
  updatedAt: string;
}

interface Team {
  id: string;
  name: string;
}

export default function CollectionList() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "development" as 'development' | 'production' | 'staging',
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    fetchCollections();
    fetchTeams();
  }, []);

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
      }
    } catch (error) {
      toast.error('Erro ao carregar times');
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCollections(data);
      }
    } catch (error) {
      toast.error('Erro ao carregar coleções');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        toast.success('Coleção criada com sucesso');
        setIsDialogOpen(false);
        fetchCollections();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Erro ao criar coleção');
      }
    } catch (error) {
      toast.error('Erro ao criar coleção');
    }
  };

  const handleEdit = async () => {
    if (!selectedCollection) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${selectedCollection.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        toast.success('Coleção atualizada com sucesso');
        setIsEditDialogOpen(false);
        fetchCollections();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Erro ao atualizar coleção');
      }
    } catch (error) {
      toast.error('Erro ao atualizar coleção');
    }
  };

  const handleDelete = async (id: string) => {
    setSelectedCollection({ id } as Collection);
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCollection) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${selectedCollection.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        toast.success('Coleção excluída com sucesso');
        fetchCollections();
      } else {
        toast.error('Erro ao excluir coleção');
      }
    } catch (error) {
      toast.error('Erro ao excluir coleção');
    }
    setIsConfirmDialogOpen(false);
  };

  const handleTransfer = async (teamId: string) => {
    if (!selectedCollection) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          collectionId: selectedCollection.id,
          teamId
        })
      });

      if (response.ok) {
        toast.success('Coleção transferida com sucesso');
        setIsTransferDialogOpen(false);
        fetchCollections();
      } else {
        toast.error('Erro ao transferir coleção');
      }
    } catch (error) {
      toast.error('Erro ao transferir coleção');
    }
  };

  const handleSort = (key: any) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedCollections = [...collections].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredCollections = sortedCollections.filter((collection) =>
    Object.values(collection).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getTypeInPortuguese = (type: string) => {
    switch(type) {
      case 'development':
        return 'Desenvolvimento';
      case 'production':
        return 'Produção';
      case 'staging':
        return 'Homologação';
      default:
        return type;
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
            <h1 className="text-4xl font-bold">Coleções</h1>
            <p className="text-gray-400 mt-2">
              Gerencie suas coleções de APIs
            </p>
          </div>
          <button
            className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 rounded-lg text-white font-medium 
            hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-pink-500/20"
            onClick={() => setIsDialogOpen(true)}
          >
            Nova Coleção
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar coleções..."
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
                <th className="py-4 px-6 text-left text-gray-400 font-medium">Tipo</th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium">Descrição</th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium cursor-pointer hover:text-pink-400 transition-colors duration-200"
                  onClick={() => handleSort("createdAt")}>
                  Data de Criação
                </th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium cursor-pointer hover:text-pink-400 transition-colors duration-200"
                  onClick={() => handleSort("updatedAt")}>
                  Última atualização
                </th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCollections.map((collection) => (
                <tr key={collection.id} className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors duration-200">
                  <td className="py-4 px-6 font-medium">{collection.name}</td>
                  <td className="py-4 px-6">{getTypeInPortuguese(collection.type)}</td>
                  <td className="py-4 px-6">{collection.description}</td>
                  <td className="py-4 px-6 text-gray-400">{new Date(collection.createdAt).toLocaleDateString('pt-BR')}</td>
                  <td className="py-4 px-6 text-gray-400">{new Date(collection.updatedAt).toLocaleDateString('pt-BR')}</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedCollection(collection);
                          setForm({
                            name: collection.name,
                            description: collection.description || '',
                            type: collection.type
                          });
                          setIsEditDialogOpen(true);
                        }}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCollection(collection);
                          setIsTransferDialogOpen(true);
                        }}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(collection.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Nova Coleção */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Nova Coleção
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Nome da coleção"
              className="w-full p-3 mb-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Descrição (opcional)"
              className="w-full p-3 mb-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              onChange={handleInputChange}
            />
            <select
              name="type"
              className="w-full p-3 mb-6 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              onChange={handleInputChange}
            >
              <option value="development">Desenvolvimento</option>
              <option value="production">Produção</option>
              <option value="staging">Homologação</option>
            </select>
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
                Criar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      {isEditDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Editar Coleção
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Nome da coleção"
              value={form.name}
              className="w-full p-3 mb-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Descrição (opcional)"
              value={form.description}
              className="w-full p-3 mb-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              onChange={handleInputChange}
            />
            <select
              name="type"
              value={form.type}
              className="w-full p-3 mb-6 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              onChange={handleInputChange}
            >
              <option value="development">Desenvolvimento</option>
              <option value="production">Produção</option>
              <option value="staging">Homologação</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                className="px-6 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 
                transition-all duration-200"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 rounded-lg text-white font-medium
                hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-pink-500/20"
                onClick={handleEdit}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Transferência */}
      {isTransferDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Transferir Coleção
            </h2>
            <select
              className="w-full p-3 mb-6 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              onChange={(e) => handleTransfer(e.target.value)}
            >
              <option value="">Selecione um time</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
            <div className="flex justify-end gap-3">
              <button
                className="px-6 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 
                transition-all duration-200"
                onClick={() => setIsTransferDialogOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {isConfirmDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Confirmar Exclusão
            </h2>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja excluir esta coleção?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-6 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 
                transition-all duration-200"
                onClick={() => setIsConfirmDialogOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-600 px-6 py-3 rounded-lg text-white font-medium
                hover:bg-red-500 transition-all duration-200"
                onClick={confirmDelete}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
