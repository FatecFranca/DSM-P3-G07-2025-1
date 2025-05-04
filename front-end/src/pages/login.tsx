import Head from 'next/head';
import { useState } from 'react';
import { FaGoogle, FaGithub, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de login/cadastro
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center p-4">
      <Head>
        <title>{isLogin ? 'Login' : 'Cadastro'} - Restify</title>
        <meta name="description" content="Entre ou cadastre-se no Restify" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
              <span className="text-2xl font-bold">RF</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Restify</h1>
          <p className="text-gray-400">
            {isLogin ? 'Entre para continuar' : 'Crie sua conta gratuita'}
          </p>
        </div>

        <div className="bg-gray-800/50 p-8 rounded-xl shadow-2xl backdrop-blur-sm border border-gray-700/30">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
                  transition-all duration-200"
                  required
                />
              </div>
            )}

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
                transition-all duration-200"
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
                transition-all duration-200"
                required
              />
            </div>

            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm text-pink-400 hover:text-pink-300 transition-colors">
                  Esqueceu sua senha?
                </a>
              </div>
            )}

            <button
              type="submit"
              onClick={() => {
                window.location.href = '/collections';
              }}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 p-3 rounded-lg text-white font-medium
              hover:from-pink-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-pink-500/20"
            >
              {isLogin ? 'Entrar' : 'Criar conta'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
              </div>
            </div>

            
          </div>

          <p className="mt-6 text-center text-gray-400">
            {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-pink-400 hover:text-pink-300 transition-colors"
            >
              {isLogin ? 'Cadastre-se' : 'Entre'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
