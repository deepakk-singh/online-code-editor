import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import Footer from "./Footer";
import logo from "./assets/logo.png"; // adjust path if needed

import './App.css';

const DEFAULT_CODES = {
  javascript: '// Write your JavaScript code here',
  python: '# Write your Python code here',
  cpp: '// Write your C++ code here',
  c: '// Write your C code here',
  java: '// Write your Java code here',
  mysql: '-- Write your MySQL query here',
};

function App() {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(DEFAULT_CODES);
  const [userInput, setUserInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear output and error when language changes
  useEffect(() => {
    setOutput('');
    setError('');
  }, [language]);

  // Handle code editor changes
  const handleCodeChange = useCallback(
    (value) => {
      setCode((prev) => ({ ...prev, [language]: value || '' }));
    },
    [language]
  );

  // Run code and show detailed backend error if available
  const handleRun = async () => {
    if (!code[language].trim()) {
      setError('Please enter some code to run.');
      setOutput('');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('');

    try {
      const { data } = await axios.post('http://localhost:5000/run', {
        code: code[language],
        language, // Send the language name directly
        stdin: userInput,
      });

      if (data.output) {
        setOutput(data.output);
      } else if (data.error) {
        // Show backend error directly
        setError(data.error);
      } else {
        setOutput('No output from program.');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(`Server error: ${err.response.data.error}`);
      } else {
        setError(`Network error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Clear input and output
  const handleClear = () => {
    setUserInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="app-container">
      <header className="top-bar">
        <img src={logo} alt="Logo" className="header-logo" />
        <h2>Online Code Editor</h2>
        <div className="controls">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Select programming language"
          >
            {Object.keys(DEFAULT_CODES).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>

          <button
            onClick={handleRun}
            disabled={loading || !code[language].trim()}
            aria-label="Run code"
          >
            {loading ? 'Running...' : 'Run Code'}
          </button>

          <button
            onClick={handleClear}
            disabled={loading || (!userInput && !output && !error)}
            aria-label="Clear input and output"
          >
            Clear
          </button>
        </div>
      </header>

      <main className="editor-output-container">
        <section className="editor-container">
          <Editor
            height="60vh"
            theme="vs-dark"
            language={language === 'mysql' ? 'sql' : language}
            value={code[language]}
            onChange={handleCodeChange}
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              wordWrap: 'on',
              tabSize: 2,
            }}
          />
        </section>

        <section className="input-container">
          <h3>Input (stdin)</h3>
          <textarea
            rows={5}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter input values here (stdin), one per line"
            aria-label="Standard input"
          />
        </section>

        <section className="output-container">
          <h3>Output</h3>
          {error ? (
            <pre className="error" aria-live="assertive" role="alert">
              {error}
            </pre>
          ) : (
            <pre style={{ whiteSpace: 'pre-wrap' }} aria-live="polite">
              {output}
            </pre>
          )}
        </section>
      </main>
            <Footer />

    </div>
  );
}

export default App;
