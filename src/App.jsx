import { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Console from './components/Console';
import Header from './components/Header';

function App() {
  const [code, setCode] = useState('// Escreva seu código JS aqui...\nconsole.log("Olá, Saul Developer! 🚀")');
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isDark, setIsDark] = useState(true);

  const runCode = () => {
    setConsoleOutput([]); // Limpa console

    // Redireciona console.log para nosso console virtual
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
      // Sandbox seguro com Function
      const safeFn = new Function('console', code);
      safeFn(console);
    } catch (err) {
      setConsoleOutput(prev => [...prev, { type: 'error', content: err.message }]);
      console.error(err);
    }

    // Restaura os consoles originais
    console.log = originalLog;
    console.error = originalError;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Header isDark={isDark} setIsDark={setIsDark} />

      <main className="container mx-auto p-4 md:p-6 max-w-7xl h-screen flex flex-col md:flex-row gap-4">
        <div className="flex-1 min-h-96 md:h-full rounded-xl bg-gray-800/50 p-4 shadow-lg border border-gray-700/50">
          <Editor code={code} setCode={setCode} />
        </div>

        <div className="w-full md:w-96 h-96 md:h-full flex flex-col rounded-xl bg-gray-800/50 shadow-lg border border-gray-700/50">
          <Console output={consoleOutput} />
        </div>
      </main>

      {/* Botão Run Fixo no Bottom Right (perfeito pra vídeos!) */}
      <button
        onClick={runCode}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 px-6 py-3 bg-saul hover:bg-green-400 text-gray-900 font-bold rounded-full shadow-lg animate-pulse hover:animate-none transition-all duration-300 z-50"
      >
        ▶️ Run Code
      </button>
    </div>
  );
}

export default App;