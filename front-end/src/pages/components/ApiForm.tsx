import React, { JSX } from 'react';
import { FaSave, FaPaperPlane } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

interface ApiFormProps {
  url: string;
  setUrl: (url: string) => void;
  method: string;
  setMethod: (method: string) => void;
  body: string;
  setBody: (body: string) => void;
  sendRequest: () => Promise<void>;
  saveEndpoint: () => void;
  loading: boolean;
}

export function ApiForm({
  url,
  setUrl,
  method,
  setMethod,
  body,
  setBody,
  sendRequest,
  saveEndpoint,
  loading,
}: ApiFormProps): JSX.Element {
  return (
    <>
      <div className="bg-gray-800/50 p-8 rounded-xl shadow-xl backdrop-blur-sm">
        <div className="flex items-center mb-6 gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-2 text-gray-400">Endpoint URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com"
              className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white 
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
            />
          </div>

          <div className="w-1/4">
            <label className="block font-semibold mb-2 text-gray-400">Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          <button
            onClick={() => {
              saveEndpoint();
              toast.success('Endpoint salvo com sucesso!');
            }}
            className="bg-gradient-to-r from-pink-600 to-purple-600 mt-7 text-white p-4 rounded-lg
            hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-pink-500/20"
          >
            <FaSave size={20} />
          </button>

          <button
            onClick={sendRequest}
            disabled={loading}
            className="bg-gradient-to-r from-pink-600 to-purple-600 mt-7 text-white p-4 rounded-lg
            hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-pink-500/20
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPaperPlane size={20} />
          </button>
        </div>

        {method !== 'GET' && (
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-400">Request Body (JSON)</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{ "key": "value" }'
              className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              transition-all duration-200"
              rows={4}
            />
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
