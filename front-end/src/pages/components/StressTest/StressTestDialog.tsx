import React, { useState } from 'react';
import { useStressTest } from './useStressTest';

interface StressTestDialogProps {
  endpoint: { url: string; method: string };
  onClose: () => void;
}

export function StressTestDialog({ endpoint, onClose }: StressTestDialogProps) {
  const [requests, setRequests] = useState(10);
  const [concurrency, setConcurrency] = useState(5);
  const { runTest, results, requestCount, generateTXTFile, resetResults } = useStressTest();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    await generateTXTFile();
    setIsDownloading(false);
  };

  const handleStartTest = async () => {
    if (requests <= 0 || concurrency <= 0) {
      setError("Por favor, preencha os campos com valores válidos!");
      return;
    }
    setError(null);
    setIsLoading(true);
    resetResults();
    await runTest(endpoint, requests, concurrency);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className='text-xl font-bold mb-6'>
          Teste de Stress - {endpoint.url}
        </h1>

        {error && (
          <div className="text-red-400 text-sm mb-4">{error}</div>
        )}

        <div className="mb-4">
          <label className="text-gray-400 text-sm mb-2 block">Número de requisições:</label>
          <input
            type="number"
            value={requests}
            onChange={(e) => setRequests(parseInt(e.target.value))}
            className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
            transition-all duration-200"
            disabled={isLoading}
          />
        </div>

        <div className="mb-6">
          <label className="text-gray-400 text-sm mb-2 block">Concorrência:</label>
          <input
            type="number"
            value={concurrency}
            onChange={(e) => setConcurrency(parseInt(e.target.value))}
            className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
            transition-all duration-200"
            disabled={isLoading}
          />
        </div>

        <button
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 rounded-lg text-white font-medium
          hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-pink-500/20"
          onClick={handleStartTest}
          disabled={isLoading}
        >
          {isLoading ? 'Executando Teste...' : 'Iniciar Teste'}
        </button>

        {results && (
          <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-white">Resultados</h3>
            <div className="space-y-2 text-gray-300">
              <p>Tempo Total: <span className="text-white">{results.totalTime} ms</span></p>
              <p>Tempo médio: <span className="text-white">{results.avgTime} ms</span></p>
              <p>Requisições bem-sucedidas: <span className="text-green-400">{results.success}</span></p>
              <p>Falhas: <span className="text-red-400">{results.failures}</span></p>
              <p className="text-sm text-gray-400">Requisições feitas: {requestCount}</p>
            </div>
          </div>
        )}

        {results && (
          <button
            className="w-full mt-4 bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 rounded-lg text-white font-medium
            hover:from-green-500 hover:to-green-400 transition-all duration-200 shadow-lg hover:shadow-green-500/20"
            onClick={handleDownload}
            disabled={isDownloading || isLoading}
          >
            {isDownloading ? 'Baixando...' : 'Baixar Resultados (TXT)'}
          </button>
        )}

        <button
          className="w-full mt-4 px-6 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 
          transition-all duration-200"
          onClick={onClose}
          disabled={isDownloading || isLoading}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
