import React, { useState } from "react";
// Importamos la función decrypt del archivo JS
// @ts-ignore
import { decrypt } from "./js_route/code";

const RouteCipher: React.FC = () => {
  // Estados para almacenar los valores del formulario
  const [choice, setChoice] = useState<string>("1");
  const [pathType, setPathType] = useState<string>("clockwise");
  const [routeSize, setRouteSize] = useState<number>(4);
  const [plainText, setPlainText] = useState<string>("lr--dlohelow");
  const [result, setResult] = useState<string>("");
  const [parallelepiped, setParallelepiped] = useState<string>("");

  const handlePathTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPath = e.target.value;
    setPathType(selectedPath);

    // Cambia choice dependiendo de la opción seleccionada
    switch (selectedPath) {
      case "clockwise":
        setChoice("1");
        break;
      case "anticlockwise":
        setChoice("2");
        break;
      case "Spiraling inside out":
        setChoice("3");
        break;
      case "Top-to-Bottom":
        setChoice("4");
        break;
      default:
        setChoice("1");
    }
  };

  const adjustPlainText = (text: string, cols: number) => {
    const rows = Math.ceil(text.length / cols);
    const totalCells = rows * cols;

    // Si la longitud del texto es menor que el número total de celdas, rellenamos con guiones
    if (text.length < totalCells) {
      return text.padEnd(totalCells, "-");
    }
    return text;
  };

  // Función que maneja el submit del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adjustedText = adjustPlainText(plainText, routeSize);
    // Llamamos a la función decrypt y almacenamos el resultado
    const { decryptedText, parallelepipedRepresentation } = decrypt(
      choice,
      pathType,
      routeSize,
      adjustedText
    );
    setResult(decryptedText);
    setParallelepiped(parallelepipedRepresentation);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>
        Route Cipher Decryptor
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#555" }}
          >
            Path Type:
          </label>
          <select
            value={pathType}
            onChange={handlePathTypeChange}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="clockwise">Clockwise</option>
            <option value="anticlockwise">Anticlockwise</option>
            <option value="Spiraling inside out">Spiraling inside out</option>
            <option value="Top-to-Bottom">Top-to-Bottom</option>
          </select>
        </div>
        <div>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#555" }}
          >
            Route Size:
          </label>
          <input
            type="number"
            value={routeSize}
            onChange={(e) => setRouteSize(parseInt(e.target.value))}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#555" }}
          >
            Plain Text:
          </label>
          <input
            type="text"
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Decrypt
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ color: "#333" }}>Decrypted Text:</h2>
          <p
            style={{
              backgroundColor: "#e7f3fe",
              padding: "10px",
              borderRadius: "4px",
              color: "#31708f",
            }}
          >
            {result}
          </p>
        </div>
      )}
      {parallelepiped && (
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ color: "#333" }}>Parallelepiped Representation:</h2>
          <pre
            style={{
              backgroundColor: "#f1f1f1",
              padding: "10px",
              borderRadius: "4px",
              overflow: "auto",
            }}
          >
            {parallelepiped}
          </pre>
        </div>
      )}
    </div>
  );
};

export default RouteCipher;
