import { useState } from 'react';

// Función para cifrar usando el método de Vigenère
const vigenereEncrypt = (message: string, key: string): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let encryptedMessage = '';
  let keyIndex = 0;
  const keyLength = key.length;

  // Recorre cada carácter del mensaje
  for (let char of message.toLowerCase()) {
    if (alphabet.includes(char)) {
      // Encontrar la posición del carácter en el alfabeto
      const charIndex = alphabet.indexOf(char);
      // Encontrar la posición del carácter de la clave en el alfabeto
      const keyChar = key[keyIndex % keyLength].toLowerCase();
      const keyCharIndex = alphabet.indexOf(keyChar);
      // Calcular el índice del carácter cifrado
      const encryptedIndex = (charIndex + keyCharIndex) % 26;
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

const VigenereCipher: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [encryptedText, setEncryptedText] = useState<string>('');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };

  const handleEncrypt = () => {
    const encrypted = vigenereEncrypt(text, key);
    setEncryptedText(encrypted);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Cifrado de Vigenère</h1>
      <input 
        type="text" 
        placeholder="Inserta tu texto"
        value={text}
        onChange={handleTextChange}
        style={{ padding: '10px', width: '100%', marginBottom: '10px', fontSize: '16px' }}
      />
      <input 
        type="text" 
        placeholder="Inserta la clave"
        value={key}
        onChange={handleKeyChange}
        style={{ padding: '10px', width: '100%', marginBottom: '10px', fontSize: '16px' }}
      />
      <button 
        onClick={handleEncrypt} 
        style={{ padding: '10px', width: '100%', fontSize: '16px', cursor: 'pointer' }}
      >
        Cifrar
      </button>
      <textarea
        placeholder="Texto cifrado"
        value={encryptedText}
        readOnly
        style={{ padding: '10px', width: '100%', marginTop: '10px', fontSize: '16px', height: '100px' }}
      />
    </div>
  );
}

export default VigenereCipher;
