// Transcrypt'ed from Python, 2024-10-15 00:22:24
var math = {};
var re = {};
var sys = {};
import {
  AssertionError,
  AttributeError,
  BaseException,
  DeprecationWarning,
  Exception,
  IndexError,
  IterableError,
  KeyError,
  NotImplementedError,
  RuntimeWarning,
  StopIteration,
  UserWarning,
  ValueError,
  Warning,
  __JsIterator__,
  __PyIterator__,
  __Terminal__,
  __add__,
  __and__,
  __call__,
  __class__,
  __envir__,
  __eq__,
  __floordiv__,
  __ge__,
  __get__,
  __getcm__,
  __getitem__,
  __getslice__,
  __getsm__,
  __gt__,
  __i__,
  __iadd__,
  __iand__,
  __idiv__,
  __ijsmod__,
  __ilshift__,
  __imatmul__,
  __imod__,
  __imul__,
  __in__,
  __init__,
  __ior__,
  __ipow__,
  __irshift__,
  __isub__,
  __ixor__,
  __jsUsePyNext__,
  __jsmod__,
  __k__,
  __kwargtrans__,
  __le__,
  __lshift__,
  __lt__,
  __matmul__,
  __mergefields__,
  __mergekwargtrans__,
  __mod__,
  __mul__,
  __ne__,
  __neg__,
  __nest__,
  __or__,
  __pow__,
  __pragma__,
  __pyUseJsNext__,
  __rshift__,
  __setitem__,
  __setproperty__,
  __setslice__,
  __sort__,
  __specialattrib__,
  __sub__,
  __super__,
  __t__,
  __terminal__,
  __truediv__,
  __withblock__,
  __xor__,
  _sort,
  abs,
  all,
  any,
  assert,
  bin,
  bool,
  bytearray,
  bytes,
  callable,
  chr,
  delattr,
  dict,
  dir,
  divmod,
  enumerate,
  filter,
  float,
  getattr,
  hasattr,
  hex,
  input,
  int,
  isinstance,
  issubclass,
  len,
  list,
  map,
  max,
  min,
  object,
  oct,
  ord,
  pow,
  print,
  property,
  py_TypeError,
  py_iter,
  py_metatype,
  py_next,
  py_reversed,
  py_typeof,
  range,
  repr,
  round,
  set,
  setattr,
  sorted,
  str,
  sum,
  tuple,
  zip,
} from "./org.transcrypt.__runtime__.js";
import * as __module_re__ from "./re.js";
__nest__(re, "", __module_re__);
import * as __module_sys__ from "./sys.js";
__nest__(sys, "", __module_sys__);
import * as __module_math__ from "./math.js";
__nest__(math, "", __module_math__);
var __name__ = "__main__";
export var g_posR = 0;
export var g_posC = 0;
export var g_dirR = 0;
export var g_dirC = 0;
export var g_borderL = 0;
export var g_borderT = 0;
export var g_borderR = 0;
export var g_borderB = 0;
export var grid = [];
export var fill_table_for_encrypt = function (letters, total_rows, total_cols) {
  for (
    var row_num = 0;
    row_num < math.ceil(len(letters) / total_cols);
    row_num++
  ) {
    var row = [];
    for (var index = 0; index < total_cols; index++) {
      if (row_num * total_cols + index < len(letters)) {
        row.append(letters[row_num * total_cols + index]);
      } else {
        row.append("-");
      }
    }
    grid.append(row);
  }
  return grid;
};
export var fill_table_for_decrypt = function (
  letters,
  total_rows,
  total_cols,
  path_type
) {
  var new_grid = [];
  for (
    var row_num = 0;
    row_num < math.ceil(len(letters) / total_cols);
    row_num++
  ) {
    var row = [];
    for (var index = 0; index < total_cols; index++) {
      if (row_num * total_cols + index < len(letters)) {
        row.append(letters[row_num * total_cols + index]);
      } else {
        row.append("-");
      }
    }
    new_grid.append(row);
  }
  init_path_parameters(path_type, total_rows, total_cols);
  var pos = 0;
  while (pos < total_rows * total_cols) {
    new_grid[g_posR][g_posC] = letters[pos];
    make_one_step(path_type);
    pos++;
  }
  return new_grid;
};
export var read_cipher_text = function (
  grid,
  total_rows,
  total_cols,
  path_type
) {
  init_path_parameters(path_type, total_rows, total_cols);
  var cipher_text = "";
  while (len(cipher_text) < total_rows * total_cols) {
    cipher_text += grid[g_posR][g_posC];
    make_one_step(path_type);
  }
  return cipher_text;
};
export var read_plain_text = function (decrypted_grid, total_rows, total_cols) {
  var plain_text = "";
  for (var index = 0; index < total_rows; index++) {
    for (var element = 0; element < total_cols; element++) {
      plain_text += str(decrypted_grid[index][element]);
    }
  }
  return plain_text;
};
export var init_path_parameters = function (path_type, total_rows, total_cols) {
  g_posR = 0;
  g_posC = total_cols - 1;
  g_borderL = 0;
  g_borderT = 0;
  g_borderR = total_cols - 1;
  g_borderB = total_rows - 1;
  if (path_type == "clockwise") {
    g_dirR = 1;
    g_dirC = 0;
  } else if (path_type == "anticlockwise") {
    g_dirR = 0;
    g_dirC = -1;
  }
};
export var make_one_step = function (path_type) {
  if (g_posR + g_dirR >= g_borderT && g_posR + g_dirR <= g_borderB) {
    g_posR += g_dirR;
  } else if (g_dirR == 1) {
    if (path_type == "clockwise") {
      g_dirR = 0;
      g_dirC = -1;
      g_borderR--;
    } else if (path_type == "anticlockwise") {
      g_dirR = 0;
      g_dirC = 1;
      g_borderL++;
    }
  } else if (g_dirR == -1) {
    if (path_type == "clockwise") {
      g_dirR = 0;
      g_dirC = 1;
      g_borderL++;
    } else if (path_type == "anticlockwise") {
      g_dirR = 0;
      g_dirC = -1;
      g_borderR--;
    }
  }
  if (g_posC + g_dirC >= g_borderL && g_posC + g_dirC <= g_borderR) {
    g_posC += g_dirC;
  } else {
    if (g_dirC == 1) {
      if (path_type == "clockwise") {
        g_dirR = 1;
        g_dirC = 0;
        g_borderT++;
      } else if (path_type == "anticlockwise") {
        g_dirR = -1;
        g_dirC = 0;
        g_borderB--;
      }
    } else if (path_type == "clockwise") {
      g_dirR = -1;
      g_dirC = 0;
      g_borderB--;
    } else if (path_type == "anticlockwise") {
      g_dirR = 1;
      g_dirC = 0;
      g_borderT++;
    }
    g_posR += g_dirR;
  }
};
export var menu_check = function (prompt) {
  var py_values = "";
  while (true) {
    var user_input = input(prompt);
    var user_input = user_input.py_replace(" ", "");
    if (len(user_input) == 0 || user_input == "1" || user_input == "0") {
      print("Error! No input detected or insufficient route size. ");
    } else if (re.match("^[A-Za-z0-9_-]*$", user_input)) {
      var py_values = user_input;
      break;
    }
  }
  return py_values;
};
export var grouping = function (plain_text, total_cols) {
  return (function () {
    var __accu0__ = [];
    for (
      var rows = 0;
      rows <
      Math.floor(len(plain_text) / total_cols) +
        (__mod__(len(plain_text), total_cols) > 0);
      rows++
    ) {
      __accu0__.append(
        plain_text.__getslice__(
          rows * total_cols,
          rows * total_cols + total_cols,
          1
        )
      );
    }
    return __accu0__;
  })();
};
export var print_parallelepiped = function (grid) {
  print("Parallelepiped representation:");
  for (var row of grid) {
    print(" | ".join(row));
  }
  print("\n");
};

export var print_parallelepiped2 = function (grid) {
  let result = "";
  for (var row of grid) {
    result += row.join(" | ") + "\n";
  }
  return result;
};
export var top_to_bottom = function (plaintext, route_size, decrypt) {
  if (
    typeof decrypt == "undefined" ||
    (decrypt != null && decrypt.hasOwnProperty("__kwargtrans__"))
  ) {
    var decrypt = false;
  }
  while (__mod__(len(plaintext), route_size) != 0) {
    plaintext += "-";
  }
  var grid = grouping(plaintext, route_size);
  if (!decrypt) {
    var encrypted_text = "";
    for (var pos = 0; pos < route_size; pos++) {
      var rows = (function () {
        var __accu0__ = [];
        for (var index = 0; index < len(grid); index++) {
          __accu0__.append(grid[index][pos]);
        }
        return __accu0__;
      })();
      if (__mod__(pos, 2) == 1) {
        rows.reverse();
      }
      encrypted_text += "".join(rows);
    }
    return encrypted_text;
  }
  var size = Math.floor(len(plaintext) / route_size);
  var decrypted_text = "";
  for (var passthru = 0; passthru < size; passthru++) {
    for (var [pos, letters] of enumerate(grid)) {
      var char = __mod__(pos, 2) == 0 ? letters[0] : letters[-1];
      grid[pos] =
        __mod__(pos, 2) == 0
          ? letters.__getslice__(1, null, 1)
          : letters.__getslice__(0, -1, 1);
      decrypted_text += char;
    }
  }
  return decrypted_text;
};
export var decrypt = function (choice, path_type, totalCols, plain_text) {
  var totalRows = len(plain_text) / totalCols;
  if (totalRows != math.floor(totalRows)) {
    var totalRows = math.floor(totalRows) + 1;
  } else if (py_typeof(totalRows) === float) {
    var totalRows = Math.floor(len(plain_text) / totalCols);
  }
  var new_grid = [];
  let parallelepipedRepresentation = "";
  var decryptedText = "";
  if (choice == "1" || choice == "2" || choice == "3") {
    var new_grid = fill_table_for_decrypt(
      plain_text,
      totalRows,
      totalCols,
      path_type
    );
    parallelepipedRepresentation = print_parallelepiped2(new_grid);
    decryptedText = read_plain_text(new_grid, totalRows, totalCols);
  } else if (choice == "4") {
    parallelepipedRepresentation = print_parallelepiped(plain_text);
    decryptedText = top_to_bottom(
      plain_text,
      totalCols,
      __kwargtrans__({ decrypt: true })
    );
  }
  if (choice == "3") {
    decryptedText = decryptedText.__getslice__(0, null, 1);
  }
  return {
    decryptedText: decryptedText,
    parallelepipedRepresentation: parallelepipedRepresentation,
  };
};

//# sourceMappingURL=code.map
