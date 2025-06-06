import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ApiForm } from './components/ApiForm';
import { ApiResponse } from './components/ApiResponse';

interface Endpoint {
  url: string;
  method: string;
  body?: string;
}

export default function ApiSimpleTester() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [executionTime, setExecutionTime] = useState<string>("");

  useEffect(() => {
    const storedEndpoints = JSON.parse(localStorage.getItem('endpoints') || '[]');
    setEndpoints(storedEndpoints);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      const endpoint = endpoints[selectedIndex];
      if (endpoint) {
        setUrl(endpoint.url);
        setMethod(endpoint.method);
        setBody(endpoint.body || '');
      }
    }
  }, [selectedIndex]);

  const saveEndpoint = () => {
    const newEndpoints = [...endpoints];
    if (selectedIndex !== null) {
      newEndpoints[selectedIndex] = { url, method, body };
    }
    setEndpoints(newEndpoints);
    localStorage.setItem('endpoints', JSON.stringify(newEndpoints));
  };

  const deleteEndpoint = (index: number) => {
    const newEndpoints = endpoints.filter((_, i) => i !== index);
    setEndpoints(newEndpoints);
    localStorage.setItem('endpoints', JSON.stringify(newEndpoints));
    setSelectedIndex(null);
    setUrl('');
    setMethod('GET');
    setBody('');
  };

  const sendRequest = async () => {
    setLoading(true);
    setResponse(null);
    setExecutionTime("");

    try {
      const startTime = performance.now();

      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: method !== 'GET' ? body : undefined,
      };

      const res = await fetch(url, options);
      const json = await res.json();

      const endTime = performance.now();
      const elapsedTime = endTime - startTime;

      setResponse(json);
      setExecutionTime(elapsedTime.toFixed(2));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renameEndpoint = (index: number, newName: string) => {
    const newEndpoints = [...endpoints];
    newEndpoints[index].url = newName;
    setEndpoints(newEndpoints);
    localStorage.setItem('endpoints', JSON.stringify(newEndpoints));
  };

  const handleCreateApi = () => {
    setSelectedIndex(null);
    setUrl('');
    setMethod('GET');
    setBody('');
    setIsFirstLoad(false);
    saveEndpoint();
    setSelectedIndex(endpoints.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="flex flex-1">
        <Sidebar
          endpoints={endpoints}
          selectEndpoint={(index: number) => {
            setIsFirstLoad(false);
            saveEndpoint();
            setSelectedIndex(index);
          }}
          deleteEndpoint={deleteEndpoint}
          selectedIndex={selectedIndex}
          createEndpoint={handleCreateApi}
          renameEndpoint={renameEndpoint}
        />
        <div className="flex-grow p-6">
          {selectedIndex === null ? (
            <>
              <button
                onClick={handleCreateApi}
                className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 rounded-lg text-white font-medium"
              >
                Criar nova API
              </button>
              <p className="text-gray-300 mt-10">
                Para testar uma API, clique em "Criar nova API". Você poderá fornecer a URL, selecionar o método HTTP (GET, POST, etc.), e enviar o corpo da requisição, se necessário. Uma vez criada a API, você pode selecioná-la para testar a resposta.
              </p>
            </>
          ) : null}

          {!isFirstLoad && (
            <ApiForm
              url={url}
              setUrl={setUrl}
              method={method}
              setMethod={setMethod}
              body={body}
              setBody={setBody}
              sendRequest={sendRequest}
              loading={loading}
              saveEndpoint={saveEndpoint}
            />
          )}

          <ApiResponse response={response} executionTime={executionTime} />
        </div>
      </div>
    </div>
  );
}
