import math
import sys
import re

g_posR = 0
g_posC = 0
g_dirR = 0
g_dirC = 0
g_borderL = 0
g_borderT = 0
g_borderR = 0
g_borderB = 0

grid = []

def fill_table_for_encrypt(letters, total_rows, total_cols):
    for row_num in range(math.ceil(len(letters) / total_cols)):
        row = []
        for index in range(total_cols):
            if row_num * total_cols + index < len(letters):
                row.append(letters[row_num * total_cols + index])
            else:
                row.append('-')
        grid.append(row)
    return grid

def fill_table_for_decrypt(letters, total_rows, total_cols, path_type):
    global g_posR, g_posC
    new_grid = []
    for row_num in range(math.ceil(len(letters) / total_cols)):
        row = []
        for index in range(total_cols):
            if row_num * total_cols + index < len(letters):
                row.append(letters[row_num * total_cols + index])
            else:
                row.append('-')
        new_grid.append(row)

    init_path_parameters(path_type, total_rows, total_cols)
    pos = 0
    while pos < total_rows * total_cols:
        new_grid[g_posR][g_posC] = letters[pos]
        make_one_step(path_type)
        pos += 1

    return new_grid

def read_cipher_text(grid, total_rows, total_cols, path_type):
    init_path_parameters(path_type, total_rows, total_cols)
    global g_posR, g_posC
    cipher_text = ""
    while len(cipher_text) < total_rows * total_cols:
        cipher_text += grid[g_posR][g_posC]
        make_one_step(path_type)
    return cipher_text

def read_plain_text(decrypted_grid, total_rows, total_cols):
    plain_text = ""
    for index in range(total_rows):
        for element in range(total_cols):
            plain_text += str(decrypted_grid[index][element])
    return plain_text

def init_path_parameters(path_type, total_rows, total_cols):
    global g_posR, g_posC, g_borderL, g_borderT, g_borderR, g_borderB, g_dirR, g_dirC
    g_posR = 0
    g_posC = total_cols - 1
    g_borderL = 0
    g_borderT = 0
    g_borderR = total_cols - 1
    g_borderB = total_rows - 1

    if path_type == "clockwise":
        g_dirR = 1
        g_dirC = 0
    elif path_type == "anticlockwise":
        g_dirR = 0
        g_dirC = -1

def make_one_step(path_type):
    global g_posR, g_posC, g_borderL, g_borderT, g_borderR, g_borderB, g_dirR, g_dirC
    if g_posR + g_dirR >= g_borderT and g_posR + g_dirR <= g_borderB:
        g_posR += g_dirR
    else:
        if g_dirR == 1:
            if path_type == "clockwise":
                g_dirR = 0
                g_dirC = -1
                g_borderR -= 1
            elif path_type == "anticlockwise":
                g_dirR = 0
                g_dirC = 1
                g_borderL += 1
        elif g_dirR == -1:
            if path_type == "clockwise":
                g_dirR = 0
                g_dirC = 1
                g_borderL += 1
            elif path_type == "anticlockwise":
                g_dirR = 0
                g_dirC = -1
                g_borderR -= 1

    if g_posC + g_dirC >= g_borderL and g_posC + g_dirC <= g_borderR:
        g_posC += g_dirC
    else:
        if g_dirC == 1:
            if path_type == "clockwise":
                g_dirR = 1
                g_dirC = 0
                g_borderT += 1
            elif path_type == "anticlockwise":
                g_dirR = -1
                g_dirC = 0
                g_borderB -= 1
        else:
            if path_type == "clockwise":
                g_dirR = -1
                g_dirC = 0
                g_borderB -= 1
            elif path_type == "anticlockwise":
                g_dirR = 1
                g_dirC = 0
                g_borderT += 1

        g_posR += g_dirR

def menu_check(prompt):
    values = ""  # holds user input
    while True:
        user_input = input(prompt)
        user_input = user_input.replace(" ", "")  # removes spaces
        if len(user_input) == 0 or user_input == "1" or user_input == "0":  # checks for no input or incorrect route size
            print("Error! No input detected or insufficient route size. ")
        elif re.match("^[A-Za-z0-9_-]*$", user_input):
            values = user_input
            break
    return values

def grouping(plain_text, total_cols):
    return [plain_text[rows * total_cols:rows * total_cols + total_cols] for rows in range(len(plain_text) // total_cols + (len(plain_text) % total_cols > 0))]

def print_parallelepiped(grid):
    print("Parallelepiped representation:")
    for row in grid:
        print(" | ".join(row))
    print("\n")

def top_to_bottom(plaintext, route_size, decrypt=False):
    while len(plaintext) % route_size != 0:
        plaintext += "-"

    grid = grouping(plaintext, route_size)
    if not decrypt:
        encrypted_text = ""
        for pos in range(route_size):
            rows = [grid[index][pos] for index in range(len(grid))]
            if pos % 2 == 1:
                rows.reverse()
            encrypted_text += "".join(rows)
        return encrypted_text

    size = len(plaintext) // route_size
    decrypted_text = ""
    for passthru in range(size):
        for pos, letters in enumerate(grid):
            char = letters[0] if pos % 2 == 0 else letters[-1]
            grid[pos] = letters[1:] if pos % 2 == 0 else letters[:-1]
            decrypted_text += char

    return decrypted_text

def main():
    action_options = """Please select an action:\n[1]. Encrypt\n[2]. Decrypt\n\n>>> """
    path_options = """Please select the desired route path.\n[1]. clockwise\n[2]. anticlockwise\n[3]. Spiraling inside out\n[4]. Top-to-Bottom\n\n>>> """
    route_size_choice = "\nPlease enter a route size above 1: "
    get_plaintext = "Please enter the desired text for encryption/decryption: "

    action_choice = input(action_options)
    if action_choice not in ["1", "2"]:
        print("Invalid choice. Please select either 1 or 2.")
        return

    if action_choice == "1":
        # Encrypt
        while True:
            choice = input(path_options)
            if choice == "1":
                path_type = "clockwise"
                break
            elif choice == "2":
                path_type = "anticlockwise"
                break
            elif choice == "3":
                path_type = "clockwise"
                break
            elif choice == "4":
                path_type = "Top-to-Bottom"
                break
            else:
                print('Invalid input: Please enter one of the choices listed above.\n')

        try:
            route_size = menu_check(route_size_choice)
            totalCols = int(route_size)
        except Exception as e:
            print("An error has occurred: ", e)
            print("Rerunning program.........")
            route_size = menu_check(route_size_choice)

        plain_text = menu_check(get_plaintext)
        totalRows = len(plain_text) / totalCols
        if totalRows != math.floor(totalRows):
            totalRows = math.floor(totalRows) + 1
        elif type(totalRows) is float:
            totalRows = len(plain_text) // totalCols
        new_grid = []
        if choice == "1" or choice == "2" or choice == "3":
            grid = fill_table_for_encrypt(plain_text, totalRows, totalCols)
            print_parallelepiped(grid)
            encryptedText = read_cipher_text(grid, totalRows, totalCols, path_type)
        elif choice == "4":
            print_parallelepiped(plain_text)
            encryptedText = top_to_bottom(plain_text, totalCols)
        if choice == "1" or choice == "2" or choice == "4":
            print("Encrypted Text: ", encryptedText)
        else:
            print("Encrypted Text: ", encryptedText[::-1])

    elif action_choice == "2":
        # Decrypt
        while True:
            choice = input(path_options)
            if choice == "1":
                path_type = "clockwise"
                break
            elif choice == "2":
                path_type = "anticlockwise"
                break
            elif choice == "3":
                path_type = "clockwise"
                break
            elif choice == "4":
                path_type = "Top-to-Bottom"
                break
            else:
                print('Invalid input: Please enter one of the choices listed above.\n')

        try:
            route_size = menu_check(route_size_choice)
            totalCols = int(route_size)
        except Exception as e:
            print("An error has occurred: ", e)
            print("Rerunning program.........")
            route_size = menu_check(route_size_choice)

        plain_text = menu_check(get_plaintext)
        totalRows = len(plain_text) / totalCols
        if totalRows != math.floor(totalRows):
            totalRows = math.floor(totalRows) + 1
        elif type(totalRows) is float:
            totalRows = len(plain_text) // totalCols
        new_grid = []
        if choice == "1" or choice == "2" or choice == "3":
            new_grid = fill_table_for_decrypt(plain_text, totalRows, totalCols, path_type)
            print_parallelepiped(new_grid)
            decryptedText = read_plain_text(new_grid, totalRows, totalCols)
        elif choice == "4":
            print_parallelepiped(plain_text)
            decryptedText = top_to_bottom(plain_text, totalCols, decrypt=True)
        if choice == "1" or choice == "2" or choice == "4":
            print("Decrypted Text: ", decryptedText)
        else:
            print("Decrypted Text: ", decryptedText[::1])

if __name__ == "__main__":
    main()
