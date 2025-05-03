import { useState } from 'react';

export function useStressTest() {
  const [results, setResults] = useState<{ avgTime: number; totalTime: number; success: number; failures: number } | null>(null);
  const [requestCount, setRequestCount] = useState(0);
  const [requestLog, setRequestLog] = useState<string[]>([]); 

  async function runTest(endpoint: { url: string; method: string }, totalRequests: number, concurrency: number) {
    const startTime = Date.now();
    let success = 0;
    let failures = 0;

    const executeRequest = async (index: number) => {
      const requestStart = Date.now();
      try {
        await fetch(endpoint.url, { method: endpoint.method });
        success++;
        setRequestLog((prevLog) => [
          ...prevLog,
            `Requisição ${index + 1} - Início: ${new Date(requestStart).toLocaleString()}, Sucesso, Final: ${new Date().toLocaleString()}, Tempo: ${Date.now() - requestStart}ms`,
        ]);
      } catch {
        failures++;
        setRequestLog((prevLog) => [
          ...prevLog,
          `Requisição ${index + 1} - Início: ${new Date(requestStart).toLocaleString()}, Falha, Final: ${new Date().toLocaleString()}, Tempo: ${Date.now() - requestStart}ms`,
        ]);
      }
      setRequestCount((prevCount) => prevCount + 1); 
    };

    const promises = [];
    for (let i = 0; i < totalRequests; i++) {
      if (i % concurrency === 0) await Promise.all(promises);
      promises.push(executeRequest(i));
    }
    await Promise.all(promises);

    setResults({
      totalTime: Date.now() - startTime,
      avgTime: (Date.now() - startTime) / totalRequests,
      success,
      failures,
    });
  }

  const resetResults = () => {
    setResults(null);
    setRequestCount(0);
    setRequestLog([]);
  };

  const generateTXTFile = () => {
    const resultText = `Resultados do Teste de Estresse:
    Tempo médio: ${results?.avgTime} ms
    Sucessos: ${results?.success}
    Falhas: ${results?.failures}
    
    Logs das requisições:
    ${requestLog.join('\n')}`;

    const blob = new Blob([resultText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'stress-test-results.txt';
    link.click();
  };

  return { runTest, results, requestCount, generateTXTFile, resetResults }; 
}
