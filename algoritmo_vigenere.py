import os

def vigenere_encrypt(message, key):
    alphabet = 'abcdefghijklmnopqrstuvwxyz' # Se define el alfabeto
    encrypted_message = '' # Se inicializa la variable que almacenará el mensaje cifrado
    key_index = 0 # Se inicializa el índice de la clave
    key_length = len(key) # Se obtiene la longitud de la clave

    for char in message.lower(): # Se recorre cada carácter del mensaje
        if char in alphabet: # Si el carácter está en el alfabeto
            # Encontrar la posición del carácter en el alfabeto
            char_index = alphabet.index(char) 
            # Encontrar la posición del carácter de la clave en el alfabeto
            key_char = key[key_index % key_length]
            key_char_index = alphabet.index(key_char)
            # Calcular el índice del carácter cifrado
            encrypted_index = (char_index + key_char_index) % 26
            # Agregar el carácter cifrado al resultado
            encrypted_message += alphabet[encrypted_index]
            # Mover al siguiente carácter de la clave
            key_index += 1
        else:
            # Los caracteres que no están en el alfabeto se agregan sin cambios
            # (ejemplos: espacios, signos de puntuación, letras con tilde, etc.)
            encrypted_message += char

        print(f"Carácter actual: '{char}', Posición en el alfabeto: '{char_index}', Mensaje cifrado parcial: '{encrypted_message}'")

    return encrypted_message


def vigenere_decrypt(ciphertext, key):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    decrypted_message = ''
    key_index = 0 # Se inicializa el índice de la clave
    key_length = len(key) # Se obtiene la longitud de la clave

    for char in ciphertext.lower(): # Se recorre cada carácter del mensaje cifrado
        if char in alphabet: # Si el carácter está en el alfabeto
            # Encontrar la posición del carácter en el alfabeto
            char_index = alphabet.index(char)
            # Encontrar la posición del carácter de la clave en el alfabeto
            key_char = key[key_index % key_length]
            key_char_index = alphabet.index(key_char)
            # Calcular el índice del carácter descifrado
            decrypted_index = (char_index - key_char_index) % 26
            # Agregar el carácter descifrado al resultado
            decrypted_message += alphabet[decrypted_index]
            # Mover al siguiente carácter de la clave
            key_index += 1
        else:
            # Los caracteres que no están en el alfabeto se agregan sin cambios
            decrypted_message += char

        print(f"Carácter actual: '{char}', Posición en el alfabeto: '{char_index}', Mensaje descifrado parcial: '{decrypted_message}'")

    return decrypted_message


def main():
    while True:
        print("\n" + "="*25)
        print("       VIGENERE CIPHER")
        print("="*25)
        print("|  1. Cifrar           |")
        print("|  2. Descifrar        |")
        print("|  3. Salir            |")
        print("="*25)
        
        option = input("Ingrese opción (1-3): ")

        if option == '1':  # Cifrar
            print("\nSeleccione método de entrada:")
            print("="*30)
            print("|  1. Ingreso por consola  |")
            print("|  2. Ingreso por archivo   |")
            print("="*30)
            input_method = input("Ingrese opción (1-2): ")

            if input_method == '1':  # Consola
                message = input("Texto a cifrar: ")
                key = input("Clave: ")
                ciphertext = vigenere_encrypt(message, key)
                print(f"Mensaje cifrado: '{ciphertext}'")
                # Guardar en archivo
                with open('cifrado.txt', 'w') as f:
                    f.write(ciphertext)
                print("Texto cifrado guardado en 'cifrado.txt'.")

            elif input_method == '2':  # Archivo
                file_path = input("Ingrese la ruta del archivo a cifrar: ")
                if os.path.exists(file_path):
                    with open(file_path, 'r') as f:
                        message = f.read()
                    key = input("Clave: ")
                    ciphertext = vigenere_encrypt(message, key)
                    print(f"Mensaje cifrado: '{ciphertext}'")
                    # Guardar en archivo
                    with open('cifrado.txt', 'w') as f:
                        f.write(ciphertext)
                    print("Texto cifrado guardado en 'cifrado.txt'.")
                else:
                    print("El archivo no existe.")

        elif option == '2':  # Descifrar
            print("\nSeleccione método de entrada:")
            print("="*30)
            print("|  1. Ingreso por consola  |")
            print("|  2. Ingreso por archivo   |")
            print("="*30)
            input_method = input("Ingrese opción (1-2): ")

            if input_method == '1':  # Consola
                ciphertext = input("Texto a descifrar: ")
                key = input("Clave: ")
                decrypted_message = vigenere_decrypt(ciphertext, key)
                print(f"Mensaje descifrado: '{decrypted_message}'")

            elif input_method == '2':  # Archivo
                file_path = input("Ingrese la ruta del archivo a descifrar: ")
                if os.path.exists(file_path):
                    with open(file_path, 'r') as f:
                        ciphertext = f.read()
                    key = input("Clave: ")
                    decrypted_message = vigenere_decrypt(ciphertext, key)
                    print(f"Mensaje descifrado: '{decrypted_message}'")
                else:
                    print("El archivo no existe.")

        elif option == '3':  # Salir
            print("Saliendo del programa...")
            break
        else:
            print("Opción no válida. Inténtelo de nuevo.")

if __name__ == '__main__':
    main()
