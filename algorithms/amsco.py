
import re

alfabeto = 'abcdefghijklmnopqrstuvwxyz '

def recortar(s):
    return s.strip()

def condensar_espacios(s):
    return re.sub(r'\s+', ' ', s)

def solo_letras(s):
    # Mantener letras y espacios en blanco
    return re.sub(r'[^a-z ]', '', s.lower())

def obtener_clave_numerica(clave):
    clave = solo_letras(clave)
    clave_ordenada = sorted(clave)
    return [clave_ordenada.index(char) + 1 for char in clave]

def construir_mapa_pares(texto_plano, longitud_clave):
    inicio_fila = 0  # inicio con letra única
    mapa_pares = [[] for _ in range(longitud_clave)]
    contador = 0
    num_filas = 0

    while contador < len(texto_plano):
        paridad = inicio_fila
        inicio_fila ^= 1
        for col in range(longitud_clave):
            if contador >= len(texto_plano):
                mapa_pares[col].append(0)
            elif paridad == 1:
                mapa_pares[col].append(2)
                contador += 2
            else:
                mapa_pares[col].append(1)
                contador += 1
            paridad ^= 1
        num_filas += 1

    if contador > len(texto_plano):
        for col in range(longitud_clave - 1, -1, -1):
            if mapa_pares[col][-1] == 2:
                mapa_pares[col][-1] = 1
                break

    return mapa_pares, num_filas

def cifrar(texto_plano, clave):
    texto_plano = solo_letras(texto_plano)
    clave_numerica = obtener_clave_numerica(clave)
    periodo = len(clave_numerica)

    # Crear el mapa de pares y llenarlo con el texto plano
    mapa_pares, num_filas = construir_mapa_pares(texto_plano, periodo)
    arreglo_c = [['' for _ in range(periodo)] for _ in range(num_filas)]
    indice = 0

    for i in range(num_filas):
        for j in range(periodo):
            if mapa_pares[j][i] == 2 and indice + 1 < len(texto_plano):
                arreglo_c[i][j] = texto_plano[indice:indice+2]
                indice += 2
            elif mapa_pares[j][i] == 1:
                arreglo_c[i][j] = texto_plano[indice]
                indice += 1

    # Obtener el orden de desplazamiento para leer las columnas basado en la clave numérica
    desplazamiento = [clave_numerica.index(i + 1) for i in range(periodo)]

    # Construir el texto cifrado
    texto_cifrado = ''
    for i in range(periodo):
        for j in range(num_filas):
            if arreglo_c[j][desplazamiento[i]]:
                texto_cifrado += arreglo_c[j][desplazamiento[i]]

    return texto_cifrado

def descifrar(texto_cifrado, clave):
    clave_numerica = obtener_clave_numerica(clave)
    periodo = len(clave_numerica)

    # Crear el mapa de pares para la longitud del texto cifrado
    mapa_pares, num_filas = construir_mapa_pares(texto_cifrado, periodo)
    arreglo_c = [['' for _ in range(periodo)] for _ in range(num_filas)]

    # Llenar el arreglo usando el orden de desplazamiento
    indice = 0
    desplazamiento = [clave_numerica.index(i + 1) for i in range(periodo)]

    for i in range(periodo):
        col = desplazamiento[i]
        for fila in range(num_filas):
            if mapa_pares[col][fila] == 2 and indice + 1 < len(texto_cifrado):
                arreglo_c[fila][col] = texto_cifrado[indice:indice+2]
                indice += 2
            elif mapa_pares[col][fila] == 1:
                arreglo_c[fila][col] = texto_cifrado[indice]
                indice += 1

    # Reconstruir el texto plano a partir del arreglo
    texto_plano = ''
    for fila in range(num_filas):
        for col in range(periodo):
            texto_plano += arreglo_c[fila][col]

    return texto_plano

def menu():
    while True:
        print("\nMenú:")
        print("1. Cifrar un mensaje")
        print("2. Descifrar un mensaje")
        print("0. Salir")
        opcion = input("Selecciona una opción: ")

        if opcion == "1":
            texto_plano = input("Introduce el mensaje a cifrar: ")
            clave = input("Introduce la clave: ")

            # Verificar que la clave no sea más larga que el mensaje
            if len(clave) > len(texto_plano):
                print("Error: La clave no puede ser más larga que el mensaje.")
            else:
                cifrado = cifrar(texto_plano, clave)
                print(f"Cifrado: {cifrado}")

        elif opcion == "2":
            texto_cifrado = input("Introduce el mensaje a descifrar: ")
            clave = input("Introduce la clave: ")

            # Verificar que la clave no sea más larga que el mensaje
            if len(clave) > len(texto_cifrado):
                print("Error: La clave no puede ser más larga que el mensaje.")
            else:
                descifrado = descifrar(texto_cifrado, clave)
                print(f"Descifrado: {descifrado}")

        elif opcion == "0":
            print("Saliendo del programa...")
            break

        else:
            print("Opción no válida. Por favor, selecciona 1, 2 o 0.")

# Llamar al menú
menu()

