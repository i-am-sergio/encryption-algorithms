import React, { useState, useRef } from 'react';
import './AMSCOform.css';

const AMSCOForm: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string[][]>([]);
  const [processType, setProcessType] = useState<'Cifrado' | 'Descifrado' | null>(null);
  const [originalMessage, setOriginalMessage] = useState<string>('');
  const [originalKey, setOriginalKey] = useState<string>('');
  const resultRef = useRef<HTMLDivElement>(null); // Referencia al contenedor del resultado

  const soloLetras = (s: string) => {
    return s.toLowerCase().replace(/[^a-z ]/g, '');
  };

  const obtenerClaveNumerica = (clave: string) => {
    const claveLimpia = soloLetras(clave);
    const claveOrdenada = [...claveLimpia].sort();
    return claveLimpia.split('').map((char) => claveOrdenada.indexOf(char) + 1);
  };

  const construirMapaPares = (texto: string, longitudClave: number) => {
    const mapaPares: number[][] = Array.from({ length: longitudClave }, () => []);
    let contador = 0;
    let inicioFila = 0;

    while (contador < texto.length) {
      let paridad = inicioFila;
      inicioFila ^= 1;

      for (let col = 0; col < longitudClave; col++) {
        if (contador >= texto.length) {
          mapaPares[col].push(0);
        } else if (paridad === 1) {
          mapaPares[col].push(2);
          contador += 2;
        } else {
          mapaPares[col].push(1);
          contador += 1;
        }
        paridad ^= 1;
      }
    }
    return mapaPares;
  };

const cifrarAMSCO = (mensaje: string, clave: string) => {
  const texto = soloLetras(mensaje);
  const claveNumerica = obtenerClaveNumerica(clave);
  const longitudClave = claveNumerica.length;

  const mapaPares = construirMapaPares(texto, longitudClave);
  const columnas: string[][] = Array.from({ length: longitudClave }, () => []);

  let index = 0;
  for (let i = 0; i < mapaPares[0].length; i++) {
    for (let j = 0; j < longitudClave; j++) {
      if (mapaPares[j][i] === 1) {
        columnas[j].push(texto[index++] || '');
      } else if (mapaPares[j][i] === 2) {
        columnas[j].push(texto[index++] + (texto[index++] || ''));
      }
    }
  }

  const ordenColumnas = [...claveNumerica].map((_, i) => claveNumerica.indexOf(i + 1));
  const cifrado = ordenColumnas.map((i) => columnas[i].join('')).join('');

  // Generar la representación visual del proceso en forma de tabla
  const representacionTabla: string[][] = [];
  representacionTabla.push([...clave.toUpperCase()]); // Primera fila con la clave
  representacionTabla.push(claveNumerica.map((n) => n.toString())); // Segunda fila con el orden numérico

  const maxFilas = Math.max(...columnas.map((col) => col.length));
  for (let i = 0; i < maxFilas; i++) {
    representacionTabla.push(columnas.map((col) => col[i] || ''));
  }

  setSteps(representacionTabla);
  setProcessType('Cifrado');
  return cifrado;
};

const descifrarAMSCO = (cifrado: string, clave: string) => {
  const texto = soloLetras(cifrado);
  const claveNumerica = obtenerClaveNumerica(clave);
  const longitudClave = claveNumerica.length;

  const mapaPares = construirMapaPares(texto, longitudClave);
  const columnas: string[][] = Array.from({ length: longitudClave }, () => []);
  let index = 0;

  const ordenColumnas = [...claveNumerica].map((_, i) => claveNumerica.indexOf(i + 1));
  for (let i = 0; i < longitudClave; i++) {
    const columna = ordenColumnas[i];
    for (let j = 0; j < mapaPares[columna].length; j++) {
      const longitud = mapaPares[columna][j];
      columnas[columna].push(texto.slice(index, index + longitud).padEnd(longitud, ''));
      index += longitud;
    }
  }

  let descifrado = '';
  for (let i = 0; i < mapaPares[0].length; i++) {
    for (let j = 0; j < longitudClave; j++) {
      descifrado += columnas[j][i] || '';
    }
  }

  // Generar la representación visual del proceso de descifrado en forma de tabla
  const representacionTabla: string[][] = [];
  representacionTabla.push([...clave.toUpperCase()]); // Primera fila con la clave
  representacionTabla.push(claveNumerica.map((n) => n.toString())); // Segunda fila con el orden numérico

  const maxFilas = Math.max(...columnas.map((col) => col.length));
  for (let i = 0; i < maxFilas; i++) {
    representacionTabla.push(columnas.map((col) => col[i] || ''));
  }

  setSteps(representacionTabla);
  setProcessType('Descifrado');
  return descifrado.trim();
};


  const handleEncrypt = () => {
    if (key.length > message.length) {
      setResult('Error: La clave no puede ser más larga que el mensaje.');
      setSteps([]);
      setProcessType(null);
      return;
    }
    setOriginalMessage(message);
    setOriginalKey(key);
    const encrypted = cifrarAMSCO(message, key);
    setResult(encrypted);
    setMessage('');
    setKey('');
    resultRef.current?.scrollIntoView({ behavior: 'smooth' }); // Desplazar suavemente hacia el resultado
  };

  const handleDecrypt = () => {
    if (key.length > message.length) {
      setResult('Error: La clave no puede ser más larga que el mensaje.');
      setSteps([]);
      setProcessType(null);
      return;
    }
    setOriginalMessage(message);
    setOriginalKey(key);
    const decrypted = descifrarAMSCO(message, key);
    setResult(decrypted);
    setMessage('');
    setKey('');
    resultRef.current?.scrollIntoView({ behavior: 'smooth' }); // Desplazar suavemente hacia el resultado
  };

  return (
    <div className="amsco-form">
      <h2>Cifrado AMSCO</h2>
      <div>
        <label>
          Mensaje:
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              padding: '10px', width: '95%', marginBottom: '10px', fontSize: '16px', height: '80px', borderRadius: '10px',
              border: '1px solid #ccc',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
              outline: 'none'
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Clave:
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </label>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={handleEncrypt}
          style={{
            cursor: 'pointer',
            padding: '10px 40px',
            margin: '10px',
            backgroundColor: '#646fe5',
            transition: 'transform 0.2s ease-in-out', // Animación suave
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} // Agranda un 5% al pasar el mouse
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Vuelve al tamaño normal al quitar el mouse
        >Cifrar</button>
        <button onClick={handleDecrypt}
          style={{
            cursor: 'pointer',
            padding: '10px 40px',
            margin: '10px',
            backgroundColor: '#e33d43',
            transition: 'transform 0.2s ease-in-out', // Animación suave
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} // Agranda un 5% al pasar el mouse
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Vuelve al tamaño normal al quitar el mouse
        >Descifrar</button>
      </div>
      {processType && (
        <div ref={resultRef}>
          <h3>Mensaje: {originalMessage}</h3>
          <h3>Clave: {originalKey}</h3>
          <h3>Proceso de {processType}:</h3>
          <table>
            <thead>
              <tr>
                {steps[0].map((char, index) => (
                  <th key={index}>{char}</th>
                ))}
              </tr>
              <tr>
                {steps[1].map((num, index) => (
                  <th key={index}>{num}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {steps.slice(2).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div ref={resultRef}>
        <h3>Resultado:</h3>
        <textarea>
          {result}
        </textarea>
      </div>
    </div>
  );
};

export default AMSCOForm;
