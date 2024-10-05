# Algoritmos de Cifrado (Encryption Algorithms)

## Introducción

Los algoritmos de cifrado son fundamentales en la criptografía, ya que transforman la información original (texto claro) en un formato que no puede ser comprendido sin la clave correspondiente. A continuación, se presentan dos algoritmos de cifrado ampliamente utilizados: Vigenère y One Time Pad.

## Algoritmos de Cifrado

### Cifrado Vigenère
El cifrado Vigenère es un método de cifrado por sustitución que utiliza una palabra clave para determinar cómo se cifra el texto. Cada letra de la palabra clave indica un desplazamiento en el alfabeto para cada letra del texto claro. Aunque este método es más seguro que el cifrado por sustitución simple, puede ser vulnerable a ataques de análisis de frecuencia si la palabra clave es corta.

### One Time Pad
El One Time Pad (OTP) es un método de cifrado que utiliza una clave aleatoria, de longitud igual o mayor al texto claro. Cada letra del texto se combina con la letra de la clave correspondiente mediante la operación de suma módulo 26. Este método es teóricamente inquebrantable, siempre y cuando la clave sea verdaderamente aleatoria, se utilice solo una vez y se mantenga en secreto. Sin embargo, la gestión de claves es un desafío práctico que limita su uso generalizado.

## Algoritmos de Descifrado

El descifrado es el proceso inverso al cifrado y permite recuperar el texto claro a partir del texto cifrado. Para realizar este proceso, es fundamental contar con el algoritmo de descifrado adecuado y la clave correspondiente. A continuación, se describen dos algoritmos de descifrado: Amsco y Por Ruta.

### Algoritmo de Descifrado Amsco
El algoritmo Amsco es un método utilizado para descifrar mensajes que han sido cifrados usando el cifrado por sustitución. Este algoritmo se basa en una tabla de sustitución que permite recuperar el texto original. Su eficacia depende de la correcta implementación de la tabla y del conocimiento previo de cómo se llevó a cabo el cifrado.

### Algoritmo de Descifrado Por Ruta
El algoritmo Por Ruta es un método de descifrado más avanzado que utiliza un enfoque sistemático para recuperar el texto claro. Este algoritmo implica seguir una serie de pasos predefinidos que permiten deshacer el cifrado, y es especialmente útil cuando se trabaja con algoritmos más complejos. Su estructura lógica facilita la comprensión y aplicación en distintos contextos de cifrado.
