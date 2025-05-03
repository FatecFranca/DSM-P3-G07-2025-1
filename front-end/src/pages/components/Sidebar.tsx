import React, { JSX, useEffect, useState, useRef } from 'react';
import { FaPlus, FaSort, FaTrash, FaEdit, FaBolt, FaHistory } from 'react-icons/fa';
import { StressTestDialog } from './StressTest/StressTestDialog';
import { HistoryDialog } from './HistoryDialog/HistoryDialog';

interface SidebarProps {
  endpoints: { url: string; method: string }[];
  selectEndpoint: (index: number) => void;
  deleteEndpoint: (index: number) => void;
  renameEndpoint: (index: number, newName: string) => void;
  selectedIndex: number | null;
  createEndpoint: () => void;
}

export function Sidebar({
  endpoints,
  selectEndpoint,
  deleteEndpoint,
  renameEndpoint,
  selectedIndex,
  createEndpoint,
}: SidebarProps): JSX.Element {
  const [search, setSearch] = useState('');
  const [filteredEndpoints, setFilteredEndpoints] = useState(endpoints);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [renamingIndex, setRenamingIndex] = useState<number | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; index: number } | null>(null);
  const [stressTestEndpoint, setStressTestEndpoint] = useState<{ url: string; method: string } | null>(null);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [historyData, setHistoryData] = useState<any[]>([]);

  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  const exampleHistoryData = [
    { timestamp: '2025-03-18 12:00:00', status: 'success', responseTime: '120ms', method: 'GET', url: 'https://api.example.com/users' },
    { timestamp: '2025-03-18 13:00:00', status: 'failure', responseTime: '200ms', method: 'POST', url: 'https://api.example.com/users' },
    { timestamp: '2025-03-18 14:00:00', status: 'success', responseTime: '150ms', method: 'PUT', url: 'https://api.example.com/users' },
    { timestamp: '2025-03-18 15:00:00', status: 'success', responseTime: '150ms', method: 'DELETE', url: 'https://api.example.com/users' },
    { timestamp: '2025-03-18 16:00:00', status: 'Sucesso', responseTime: '150ms', method: 'PATCH', url: 'https://api.example.com/users' },
  ];

  const handleHistoryClick = () => {
    setShowHistoryDialog(true);
    setHistoryData(exampleHistoryData);
  };

  useEffect(() => {
    setFilteredEndpoints(
      endpoints.filter(endpoint =>
        endpoint.url.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, endpoints]);

  useEffect(() => {
    const sortedEndpoints = [...endpoints].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.url.localeCompare(b.url);
      } else {
        return b.url.localeCompare(a.url);
      }
    });
    setFilteredEndpoints(sortedEndpoints);
  }, [sortOrder]);

  const handleRightClick = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY, index });
    setRenamingIndex(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        setContextMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleRename = (index: number, newName: string) => {
    renameEndpoint(index, newName);
    setRenamingIndex(null);
    setContextMenu(null);
  };

  const handleDoubleClick = (index: number) => {
    setRenamingIndex(index);
    setContextMenu(null);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col p-6 relative shadow-xl">
      <button 
        onClick={createEndpoint} 
        className="mb-6 flex items-center gap-2 p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:bg-gray-700/30 transition-all duration-200"
      >
        <FaPlus size={18} /> <span>Adicionar Endpoint</span>
      </button>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Pesquisar..."
          className="w-full p-4 pl-4 pr-10 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button 
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-400 transition-colors duration-200"
        >
          <FaSort size={18} />
        </button>
      </div>

      <ul className="space-y-3">
        {filteredEndpoints.map((endpoint, index) => (
          <li key={index} className="flex items-center gap-2">
            {renamingIndex === index ? (
              <input
                type="text"
                autoFocus
                defaultValue={endpoint.url}
                className="flex-1 p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                onBlur={(e) => handleRename(index, e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRename(index, e.currentTarget.value)}
              />
            ) : (
              <button
                className={`flex-1 text-left p-3 rounded-lg transition whitespace-nowrap overflow-hidden overflow-ellipsis
                  ${selectedIndex === index 
                    ? 'bg-gradient-to-r from-pink-600/50 to-purple-600/50 border border-pink-500/30' 
                    : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/30'}`}
                onClick={() => selectEndpoint(index)}
                onDoubleClick={() => handleDoubleClick(index)}
                onContextMenu={(e) => handleRightClick(e, index)}
                title={`${endpoint.method} - ${endpoint.url}`}
              >
                <span className="font-medium">{endpoint.method}</span> - {endpoint.url}
              </button>
            )}

            <button
              className="p-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-all duration-200"
              onClick={() => deleteEndpoint(index)}
            >
              <FaTrash size={16} />
            </button>
          </li>
        ))}
      </ul>

      {contextMenu && (
        <div
          ref={contextMenuRef}
          className="absolute bg-gray-800 text-white p-2 rounded-lg shadow-xl border border-gray-700"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200" onClick={() => {
            setRenamingIndex(contextMenu.index);
            setContextMenu(null);
          }}>
            <FaEdit className="mr-2 text-pink-400" /> Renomear
          </button>
          <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200" onClick={() => setStressTestEndpoint(filteredEndpoints[contextMenu.index])}>
            <FaBolt className="mr-2 text-yellow-400" /> Teste de Stress
          </button>
          <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200" onClick={() => deleteEndpoint(contextMenu.index)}>
            <FaTrash className="mr-2 text-red-400" /> Excluir
          </button>
          <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200" onClick={handleHistoryClick}>
            <FaHistory className="mr-2 text-blue-400" /> Histórico
          </button>
        </div>
      )}

      {stressTestEndpoint && <StressTestDialog endpoint={stressTestEndpoint} onClose={() => setStressTestEndpoint(null)} />}

      {showHistoryDialog && (
        <HistoryDialog historyData={historyData} onClose={() => setShowHistoryDialog(false)} showHistoryDialog={showHistoryDialog} setShowHistoryDialog={setShowHistoryDialog} />
      )}
    </div>
  );
}
