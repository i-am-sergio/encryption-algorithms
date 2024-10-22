import React, { useState } from 'react';
import './OneTimePad.css'; // Estilos opcionales

const OneTimePad: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const showError = (message: string) => {
    setError(message);
  };

  const clearError = () => {
    setError('');
  };

  // Función para eliminar espacios y convertir a mayúsculas
  const normalizeText = (text: string) => {
    return text.replace(/ /g, '').toUpperCase();
  };

  const validateInputs = (message: string, key: string) => {
    const normalizedMessage = normalizeText(message);
    const normalizedKey = normalizeText(key);
    if (!normalizedMessage || !normalizedKey) {
      showError('El mensaje y la clave no pueden estar vacíos.');
      return false;
    }
    if (normalizedMessage.length !== normalizedKey.length) {
      showError('La clave debe tener la misma longitud que el mensaje.');
      return false;
    }
    return true;
  };

  const generateRandomKey = () => {
    clearError();
    const normalizedMessage = normalizeText(message);
    if (!normalizedMessage) {
      showError('Introduce primero el mensaje para generar una clave del tamaño adecuado.');
      return;
    }
    let randomKey = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < normalizedMessage.length; i++) {
      randomKey += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    setKey(randomKey);
    showError('Clave generada correctamente.');
  };

  // Función para cifrar usando el algoritmo OTP
  const encryptMessage = () => {
    clearError();
    const normalizedMessage = normalizeText(message);
    const normalizedKey = normalizeText(key);
    if (!validateInputs(message, key)) return;

    let encryptedMessage = '';
    for (let i = 0; i < normalizedMessage.length; i++) {
      const messageChar = normalizedMessage.charCodeAt(i) - 65; // A = 0, B = 1, ..., Z = 25
      const keyChar = normalizedKey.charCodeAt(i) - 65;
      const encryptedChar = String.fromCharCode(((messageChar + keyChar) % 26) + 65); // Cifrado
      encryptedMessage += encryptedChar;
    }

    setResult('Encriptado: ' + encryptedMessage);
  };

  // Función para desencriptar usando el algoritmo OTP
  const decryptMessage = () => {
    clearError();
    const normalizedMessage = normalizeText(message);
    const normalizedKey = normalizeText(key);
    if (!validateInputs(message, key)) return;

    let decryptedMessage = '';
    for (let i = 0; i < normalizedMessage.length; i++) {
      const messageChar = normalizedMessage.charCodeAt(i) - 65;
      const keyChar = normalizedKey.charCodeAt(i) - 65;
      const decryptedChar = String.fromCharCode(((messageChar - keyChar + 26) % 26) + 65); // Desencriptado
      decryptedMessage += decryptedChar;
    }

    setResult('Desencriptado: ' + decryptedMessage);
  };

  return (
    <div className="container" style={{ padding: '20px', width: '800px', margin: '0 auto' }}>
      <h1
        style={{ textAlign: 'center', fontSize: '28px', marginBottom: '20px' }}
      >Cifrado One Time Pad</h1>
      <label htmlFor="message">Mensaje (solo letras, sin espacios):</label>
      <textarea
        id="message"
        rows={4}
        placeholder="Introduce el mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          boxSizing: "border-box",
          fontSize: '16px', height: '80px', borderRadius: '10px',
          border: '1px solid #ccc',
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
          outline: 'none'
        }}
      />

      <label htmlFor="key">Clave (debe tener la misma longitud que el mensaje):</label>
      <textarea
        id="key"
        rows={4}
        placeholder="Introduce la clave, o pulsa generar clave aleatoria"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          boxSizing: "border-box",
          fontSize: '16px', height: '80px', borderRadius: '10px',
          border: '1px solid #ccc',
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
          outline: 'none'
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={generateRandomKey}
          style={{
            cursor: 'pointer',
            padding: '10px 40px',
            margin: '10px',
            backgroundColor: '#4dbd4f',
            transition: 'transform 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >Generar clave aleatoria</button>
        <button onClick={encryptMessage}
          style={{
            cursor: 'pointer',
            padding: '10px 40px',
            margin: '10px',
            backgroundColor: '#646fe5',
            transition: 'transform 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >Encriptar</button>
        <button onClick={decryptMessage}
          style={{
            cursor: 'pointer',
            padding: '10px 40px',
            margin: '10px',
            backgroundColor: '#ba5463',
            transition: 'transform 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >Desencriptar</button>
      </div>
      {error && <div id="error" className="error">{error}</div>}
      <h2
        style={{ textAlign: 'center', fontSize: '20px', marginTop: '10px' }}
      >Resultado:</h2>
      <p id="result">{result}</p>
    </div>
  );
};

export default OneTimePad;
