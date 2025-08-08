// FileSidebar.jsx
import React from 'react';

function FileSidebar({ files, selectedFile, setSelectedFile, addFile }) {
  return (
    <div className="sidebar">
      <button onClick={addFile}>New File...</button>
      <ul>
        {Object.keys(files).map((filename) => (
          <li
            key={filename}
            className={filename === selectedFile ? 'active' : ''}
            onClick={() => setSelectedFile(filename)}
          >
            {filename}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileSidebar;
