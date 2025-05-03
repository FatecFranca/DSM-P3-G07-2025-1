import React, { JSX } from 'react';
import { FaPlus } from 'react-icons/fa';

interface SidebarProps {
  endpoints: { url: string; method: string }[];
  selectEndpoint: (index: number) => void;
  deleteEndpoint: (index: number) => void;
  selectedIndex: number | null;
  createEndpoint: () => void;
}

export function Sidebar({
  endpoints,
  selectEndpoint,
  deleteEndpoint,
  selectedIndex,
  createEndpoint,
}: SidebarProps): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <button
        onClick={createEndpoint}
        className="bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-2 rounded-lg text-white font-medium
        hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-pink-500/20 mb-6"
        title="Criar Endpoint"
      >
        <FaPlus size={20} />
      </button>

      <ul>
        {endpoints.map((endpoint, index) => (
          <li key={index} className="mb-4">
            <div className="bg-gray-800/50 rounded-xl shadow-xl backdrop-blur-sm flex items-center justify-between p-4">
              <button
                className={`flex-1 text-left transition ${
                  selectedIndex === index 
                    ? 'text-pink-400'
                    : 'text-white hover:text-pink-300'
                }`}
                onClick={() => selectEndpoint(index)}
                title={`${endpoint.method} - ${endpoint.url}`}
              >
                <span className="font-medium">{endpoint.method}</span>
                <span className="ml-2 text-gray-400">{endpoint.url}</span>
              </button>
              <button
                className="ml-4 text-gray-400 hover:text-red-400 transition-colors duration-200"
                onClick={() => deleteEndpoint(index)}
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
