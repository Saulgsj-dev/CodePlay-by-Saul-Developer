import { forwardRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = forwardRef(({ code, setCode }, ref) => {
  return (
    <div className="h-full">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={setCode}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'JetBrains Mono',
          padding: { top: 10 },
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
});

export default CodeEditor;