// src/lib/modeloArbol.ts
// Generado automáticamente por m2cgen — NO EDITAR

export function score(input: number[]): number[] {
var var0;
    if (input[7] <= 5.5) {
        if (input[0] <= 75.5) {
            if (input[2] <= 44.5) {
                if (input[0] <= 8.5) {
                    if (input[2] <= 13.0) {
                        var0 = [0.4090909090909091, 0.5909090909090909];
                    } else {
                        var0 = [0.7307692307692307, 0.2692307692307692];
                    }
                } else {
                    if (input[2] <= 5.5) {
                        var0 = [0.7087378640776699, 0.2912621359223301];
                    } else {
                        var0 = [0.8922480620155039, 0.10775193798449613];
                    }
                }
            } else {
                if (input[7] <= 3.5) {
                    if (input[4] <= 2.5) {
                        var0 = [0.7456140350877193, 0.2543859649122807];
                    } else {
                        var0 = [0.6140350877192983, 0.38596491228070173];
                    }
                } else {
                    if (input[8] <= 5.5) {
                        var0 = [0.8366013071895425, 0.16339869281045752];
                    } else {
                        var0 = [0.6666666666666666, 0.3333333333333333];
                    }
                }
            }
        } else {
            var0 = [1.0, 0.0];
        }
    } else {
        var0 = [1.0, 0.0];
    }
    return var0;


  throw new Error("Pega el código de m2cgen aquí");
}