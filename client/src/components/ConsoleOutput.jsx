// ConsoleOutput.jsx
function ConsoleOutput({ output }) {
  return (
    <div className="console">
      <h3>Console</h3>
      <pre>{output || 'Console output will appear here...'}</pre>
    </div>
  );
}

export default ConsoleOutput;
