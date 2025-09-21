import { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Console from './components/Console';
import Header from './components/Header';

function App() {
  const [code, setCode] = useState('// Escreva seu código JS aqui...\nconsole.log("Olá, Saul Developer! 🚀")');
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isDark, setIsDark] = useState(true);
  const [isConsoleOpen, setIsConsoleOpen] = useState(true); // Controle para mobile

  const runCode = () => {
    setConsoleOutput([]); // Limpa console

    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      setConsoleOutput(prev => [...prev, { type: 'log', content: args.map(String).join(' ') }]);
      originalLog(...args);
    };

    console.error = (...args) => {
      setConsoleOutput(prev => [...prev, { type: 'error', content: args.map(String).join(' ') }]);
      originalError(...args);
    };

    try {
      const safeFn = new Function('console', code);
      safeFn(console);
    } catch (err) {
      setConsoleOutput(prev => [...prev, { type: 'error', content: err.message }]);
      console.error(err);
    }

    console.log = originalLog;
    console.error = originalError;
  };

  // Detecta mobile para fechar console por padrão
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setIsConsoleOpen(!isMobile);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Header isDark={isDark} setIsDark={setIsDark} />

      <main className="container mx-auto p-2 sm:p-4 md:p-6 max-w-7xl h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-3 sm:gap-4">
        {/* Editor — ocupa todo espaço disponível */}
        <div className="flex-1 min-h-64 md:min-h-96 rounded-xl bg-gray-800/50 p-3 sm:p-4 shadow-lg border border-gray-700/50 flex flex-col">
          <Editor code={code} setCode={setCode} />
        </div>

        {/* Console — colapsável em mobile */}
        <div className={`transition-all duration-300 ease-in-out md:w-96 md:h-auto w-full ${
          isConsoleOpen ? 'h-64 md:h-full' : 'h-12'
        } rounded-xl bg-gray-800/50 shadow-lg border border-gray-700/50 flex flex-col overflow-hidden`}>
          {/* Botão toggle console em mobile */}
          <button
            onClick={() => setIsConsoleOpen(!isConsoleOpen)}
            className="md:hidden p-2 text-sm font-semibold bg-gray-700 hover:bg-gray-600 transition-colors rounded-t-xl flex justify-between items-center"
            aria-label={isConsoleOpen ? "Fechar console" : "Abrir console"}
          >
            <span>Console</span>
            <span>{isConsoleOpen ? '▲' : '▼'}</span>
          </button>

          {/* Conteúdo do console (só mostra se estiver aberto) */}
          {isConsoleOpen && (
            <div className="flex-1 overflow-y-auto p-2 sm:p-4">
              <Console output={consoleOutput} />
            </div>
          )}
        </div>
      </main>

      {/* Botão Run Code — responsivo e fixo */}
      <button
        onClick={runCode}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 px-4 sm:px-6 py-2 sm:py-3 bg-saul hover:bg-green-400 text-gray-900 font-bold rounded-full shadow-lg animate-pulse hover:animate-none transition-all duration-300 z-50 text-sm sm:text-base"
        aria-label="Executar código"
      >
        ▶️ Run Code
      </button>
    </div>
  );
}

export default App;