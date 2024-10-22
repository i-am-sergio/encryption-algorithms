// import "./App.css";
// import VigenereCipher from "./components/VigenereCipher";
// import RouteCipher from "./components/RouteCipher";
// function App() {
//   return (
//     <div>
//       <VigenereCipher />
//       <RouteCipher />
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import './App.css'; // Para estilos (opcional)
import VigenereCipher from './components/VigenereCipher';
import RouteCipher from './components/RouteCipher';
import AMSCOForm from './components/AMSCOCipher';
import OneTimePad from './components/OneTimePad';

// Define los cuatro componentes que se mostrarán
const Home: React.FC = () => <div><VigenereCipher /></div>;
const About: React.FC = () => <div> <OneTimePad /> </div>;
const Services: React.FC = () => <div><RouteCipher /></div>;
const Contact: React.FC = () => <div><AMSCOForm /></div>;

const App: React.FC = () => {
  // Estado para manejar la opción seleccionada
  const [selectedOption, setSelectedOption] = useState<string>('home');

  // Función para renderizar el componente basado en la opción seleccionada
  const renderComponent = () => {
    switch (selectedOption) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'services':
        return <Services />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      {/* Barra de navegación horizontal */}
      <nav>
        <ul className="navbar">
          <li onClick={() => setSelectedOption('home')}>CIFRADO VIGENERE</li>
          <li onClick={() => setSelectedOption('about')}>CIFRADO ONETIMEPAD</li>
          <li onClick={() => setSelectedOption('services')}>DESCIFRADO POR RUTA</li>
          <li onClick={() => setSelectedOption('contact')}>DESCIFRADO AMSCO</li>
        </ul>
      </nav>

      {/* Renderiza el componente correspondiente */}
      <div className="content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default App;
