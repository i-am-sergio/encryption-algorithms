import React, { useState } from 'react';
import './OneTimePad.css'; // Estilos opcionales

const OneTimePad: React.FC = () => {
  // Estado para los mensajes, clave y resultado
  const [message, setMessage] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Función para mostrar mensajes de error
  const showError = (message: string) => {
    setError(message);
  };

  // Función para limpiar errores
  const clearError = () => {
    setError('');
  };

  // Verificación de longitud de mensaje y clave
  const validateInputs = (message: string, key: string) => {
    if (!message || !key) {
      showError('El mensaje y la clave no pueden estar vacíos.');
      return false;
    }
    if (message.length > key.length) {
      showError('La clave es más corta que el mensaje. Esto es vulnerable y no se recomienda.');
      return false;
    }
    return true;
  };

  // Función para generar una clave aleatoria segura del tamaño del mensaje
  const generateRandomKey = () => {
    clearError();
    if (!message) {
      showError('Introduce primero el mensaje para generar una clave del tamaño adecuado.');
      return;
    }
    let randomKey = '';
    for (let i = 0; i < message.length; i++) {
      randomKey += String.fromCharCode(Math.floor(Math.random() * 256)); // Caracteres aleatorios
    }
    setKey(randomKey);
    showError('Clave generada correctamente.');
  };

  // Función para encriptar usando One Time Pad
  const encryptMessage = () => {
    clearError();
    if (!validateInputs(message, key)) return;

    let encryptedMessage = '';
    for (let i = 0; i < message.length; i++) {
      // Aplicamos XOR entre los caracteres del mensaje y la clave
      encryptedMessage += String.fromCharCode(message.charCodeAt(i) ^ key.charCodeAt(i));
    }

    // Mostramos directamente el resultado encriptado
    setResult('Encriptado: ' + btoa(encryptedMessage)); // Usamos Base64 para mostrar caracteres especiales
  };

  // Función para desencriptar usando One Time Pad
  const decryptMessage = () => {
    clearError();
    const decodedMessage = atob(message); // Decodificamos desde Base64
    if (!validateInputs(decodedMessage, key)) return;

    let decryptedMessage = '';
    for (let i = 0; i < decodedMessage.length; i++) {
      // Aplicamos XOR entre los caracteres del mensaje y la clave
      decryptedMessage += String.fromCharCode(decodedMessage.charCodeAt(i) ^ key.charCodeAt(i));
    }

    // Mostramos el mensaje desencriptado
    setResult('Desencriptado: ' + decryptedMessage);
  };

  return (
    <div className="container" style={{ padding: '20px', width: '800px', margin: '0 auto' }}>
      <h1
        style={{ textAlign: 'center', fontSize: '28px', marginBottom: '20px' }}
      >Cifrado One Time Pad</h1>
      <label htmlFor="message">Mensaje (texto claro):</label>
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

      <label htmlFor="key">Clave (longitud mayor igual al mensaje):</label>
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
      {/*  Centrar un div horizontalmente    con style   */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={generateRandomKey}
        style={{
          cursor: 'pointer',
          padding: '10px 40px',
          margin: '10px',
          backgroundColor: '#4dbd4f',
          transition: 'transform 0.2s ease-in-out', // Animación suave
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} // Agranda un 5% al pasar el mouse
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Vuelve al tamaño normal al quitar el mouse
        >Generar clave aleatoria</button>
        <button onClick={encryptMessage}
          style={{
            cursor: 'pointer',
            padding: '10px 40px',
            margin: '10px',
            backgroundColor: '#646fe5',
            transition: 'transform 0.2s ease-in-out', // Animación suave
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} // Agranda un 5% al pasar el mouse
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Vuelve al tamaño normal al quitar el mouse
        >Encriptar</button>
        <button onClick={decryptMessage}
        style={{
          cursor: 'pointer',
          padding: '10px 40px',
          margin: '10px',
          backgroundColor: '#ba5463',
          transition: 'transform 0.2s ease-in-out', // Animación suave
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} // Agranda un 5% al pasar el mouse
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Vuelve al tamaño normal al quitar el mouse
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
