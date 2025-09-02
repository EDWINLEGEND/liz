import React, { useState, useEffect } from 'react';
import './CodeInput.css';

interface CodeInputProps {
  correctCode: string;
  onUnlock: () => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ correctCode, onUnlock }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    // Auto-focus the input field when component mounts
    const inputElement = document.getElementById('codeInput');
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code === correctCode) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="code-input-container">
      <div className={`code-input-box ${shake ? 'shake' : ''}`}>
        <h2 className="code-input-title">Enter the Secret Code</h2>
        <form onSubmit={handleSubmit}>
          <input
            id="codeInput"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`code-input ${error ? 'error' : ''}`}
            placeholder="Type the magic words..."
            autoComplete="off"
          />
          <button type="submit" className="submit-button">
            Alohomora
          </button>
        </form>
        {error && <p className="error-message">Incorrect spell. Try again!</p>}
      </div>
    </div>
  );
};

export default CodeInput;