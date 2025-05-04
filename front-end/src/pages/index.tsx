import Head from 'next/head';
import { useState } from 'react';

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Head>
        <title>Restify - Teste de APIs Simplificado</title>
        <meta name="description" content="Plataforma minimalista para teste e gerenciamento de APIs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
              <span className="text-2xl font-bold">RF</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">Restify</h1>
          <p className="text-xl text-gray-400">Teste suas APIs de forma simples e rápida</p>
        </div>

        <div className="flex justify-center gap-6 mb-16">
          <button
            onClick={() => window.location.href = '/app_simple'}
            className="bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-4 rounded-lg text-white font-medium 
            hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-pink-500/20"
          >
            Testar sem Login
          </button>

          <button
            onClick={() => window.location.href = '/login'}
            className="bg-gray-800/50 border border-gray-700 px-8 py-4 rounded-lg text-white font-medium 
            hover:bg-gray-700/30 transition-all duration-200"
          >
            Entrar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Sem Cadastro
            </h3>
            <p className="text-gray-400">
              Comece a testar suas APIs instantaneamente, sem necessidade de criar uma conta
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Interface Limpa
            </h3>
            <p className="text-gray-400">
              Design minimalista focado na experiência de teste de APIs
            </p>
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Recursos Avançados
            </h3>
            <p className="text-gray-400">
              Faça login para salvar endpoints, criar coleções e mais
            </p>
          </div>
        </div>

        <div className="mt-16 bg-gray-800/30 p-10 rounded-2xl backdrop-blur-sm border border-gray-700/30">
          <h2 className="text-2xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Teste de Stress
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                <h4 className="text-lg font-medium text-white">Análise de Performance</h4>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Configure testes de carga personalizados e obtenha métricas detalhadas de tempo de resposta, taxa de sucesso e falhas.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <h4 className="text-lg font-medium text-white">Relatórios Detalhados</h4>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Exporte resultados em TXT e identifique gargalos de performance sob diferentes condições de carga.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
