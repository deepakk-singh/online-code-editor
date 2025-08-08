// EditorTabs.jsx
import React from 'react';
import Editor from '@monaco-editor/react';

function EditorTabs({ files, selectedFile, updateCode }) {
  const language = files[selectedFile]?.language;

  return (
    <Editor
      height="400px"
      theme="vs-dark"
      language={language}
      value={files[selectedFile]?.code}
      onChange={(val) => updateCode(selectedFile, val)}
    />
  );
}

export default EditorTabs;
