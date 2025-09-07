export default function Header({ isDark, setIsDark }) {
  return (
    <header className="p-4 md:p-6 flex justify-between items-center bg-gray-800/30 backdrop-blur-sm border-b border-gray-700/50">
      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-saul to-cyan-400 bg-clip-text text-transparent">
        CodePlay <span className="text-sm font-normal">by Saul Developer</span>
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
          title={isDark ? "Modo Claro" : "Modo Escuro"}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}