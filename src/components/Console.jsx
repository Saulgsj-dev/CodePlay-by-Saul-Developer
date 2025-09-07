export default function Console({ output }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-3 border-b border-gray-700/50 bg-gray-900/30 text-saul font-mono text-sm">
        🖥️ Console Output
      </div>
      <div className="flex-1 p-3 overflow-y-auto console-output font-mono text-sm space-y-1">
        {output.length === 0 && (
          <div className="text-gray-500 italic">Nenhuma saída ainda. Clique em "Run Code"!</div>
        )}
        {output.map((line, idx) => (
          <div
            key={idx}
            className={`${
              line.type === 'error' ? 'text-red-400' : 'text-saul'
            }`}
          >
            {line.content}
          </div>
        ))}
      </div>
    </div>
  );
}