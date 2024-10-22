import { useState } from 'react';

// Función para limpiar la clave eliminando espacios y convirtiéndola a minúsculas
const cleanKey = (key: string): string => {
  return key.replace(/\s+/g, '').toLowerCase(); // Elimina espacios y convierte a minúsculas
};

// Función para cifrar usando el método de Vigenère
const vigenereEncrypt = (message: string, key: string): string => {
  const alphabet = 'abcdefghijklmnñopqrstuvwxyz'; // Añadir la letra "ñ"
  let encryptedMessage = '';
  let keyIndex = 0;
  const cleanedKey = cleanKey(key); // Limpiar la clave
  const keyLength = cleanedKey.length;

  // Recorre cada carácter del mensaje
  for (let char of message.toLowerCase()) {
    if (alphabet.includes(char)) {
      // Encontrar la posición del carácter en el alfabeto
      const charIndex = alphabet.indexOf(char);
      // Encontrar la posición del carácter de la clave en el alfabeto
      const keyChar = cleanedKey[keyIndex % keyLength]; // Usar la clave limpia
      const keyCharIndex = alphabet.indexOf(keyChar);

      // Calcular el índice del carácter cifrado
      const encryptedIndex = (charIndex + keyCharIndex) % alphabet.length; 
      // Agregar el carácter cifrado al resultado
      encryptedMessage += alphabet[encryptedIndex];
      // Mover al siguiente carácter de la clave
      keyIndex++;
    } else {
      // Los caracteres que no están en el alfabeto se agregan sin cambios
      encryptedMessage += char;
    }
  }

  return encryptedMessage;
};

// Función para desencriptar usando el método de Vigenère
const vigenereDecrypt = (encryptedMessage: string, key: string): string => {
  const alphabet = 'abcdefghijklmnñopqrstuvwxyz'; // Ampliar el alfabeto para incluir la "ñ"
  let decryptedMessage = '';
  let keyIndex = 0;
  const cleanedKey = cleanKey(key); // Limpiar la clave
  const keyLength = cleanedKey.length;

  // Recorre cada carácter del mensaje cifrado
  for (let char of encryptedMessage.toLowerCase()) {
    if (alphabet.includes(char)) {
      // Encontrar la posición del carácter cifrado en el alfabeto
      const charIndex = alphabet.indexOf(char);
      // Encontrar la posición del carácter de la clave en el alfabeto
      const keyChar = cleanedKey[keyIndex % keyLength]; // Usar la clave limpia
      const keyCharIndex = alphabet.indexOf(keyChar);
      // Calcular el índice del carácter desencriptado
      const decryptedIndex = (charIndex - keyCharIndex + alphabet.length) % alphabet.length;
      // Agregar el carácter desencriptado al resultado
      decryptedMessage += alphabet[decryptedIndex];
      // Mover al siguiente carácter de la clave
      keyIndex++;
    } else {
      // Los caracteres que no están en el alfabeto se agregan sin cambios
      decryptedMessage += char;
    }
  }

  return decryptedMessage;
};


const VigenereCipher: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [encryptedText, setEncryptedText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setErrorMessage(''); // Limpiar mensaje de error al cambiar
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setKey(e.target.value);
    setErrorMessage(''); // Limpiar mensaje de error al cambiar
  };

  const handleEncrypt = () => {
    if (text === '' || key === '') {
      setErrorMessage('Ambos campos deben estar completos.');
      return;
    }
    const encrypted = vigenereEncrypt(text, key);
    setEncryptedText(encrypted);
  };

  const handleDecrypt = () => {
    if (text === '' || key === '') {
      setErrorMessage('Ambos campos deben estar completos.');
      return;
    }
    const decrypted = vigenereDecrypt(text, key);
    setEncryptedText(decrypted);
  }

  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#fff',
      // box-shadow: 0 0 20px rgba(0, 0, 0, 0.1),
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '20px',
    }}>
      <h1
        style={{ textAlign: 'center', fontSize: '28px', marginBottom: '20px', color: '#000' }}
      >Cifrado de Vigenère</h1>
      <textarea
        placeholder="Inserta tu texto"
        value={text}
        onChange={handleTextChange}
        rows={5}
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
      <textarea
        placeholder="Inserta la clave"
        value={key}
        onChange={handleKeyChange}
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
      {errorMessage && (
        <p style={{ color: '#f0676c', textAlign: 'center', fontSize: "16px", fontFamily: "cursive"}}>{errorMessage}</p>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          onClick={handleEncrypt}
          style={{
            cursor: 'pointer',
            padding: '10px 40px',
            margin: '10px',
            backgroundColor: '#646fe5',
            transition: 'transform 0.2s ease-in-out', // Animación suave
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} // Agranda un 5% al pasar el mouse
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Vuelve al tamaño normal al quitar el mouse
        >
          Cifrar
        </button>

        <button
          onClick={handleDecrypt}
          style={{
            cursor: 'pointer',
            padding: '10px 40px',
            margin: '10px',
            backgroundColor: '#e33d43',
            transition: 'transform 0.2s ease-in-out', // Animación suave
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} // Agranda un 5% al pasar el mouse
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Vuelve al tamaño normal al quitar el mouse
        >
          Descifrar
        </button>
      </div>
      <h2
        style={{ color: "#000", textAlign: 'center', fontSize: '20px', marginTop: '10px' }}
      >Resultado:</h2>
      <textarea
        placeholder="Texto cifrado"
        value={encryptedText}
        readOnly
        style={{
          padding: '10px', width: '95%', marginBottom: '10px', fontSize: '16px', height: '80px', borderRadius: '10px',
          border: '1px solid #ccc',
          boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
          outline: 'none'
        }}
      />
    </div>
  );
}

export default VigenereCipher;
