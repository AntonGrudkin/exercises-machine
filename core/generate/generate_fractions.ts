import type {MathNode} from 'mathjs'
import * as math from 'mathjs'
import type Prando from 'prando'
import {normalize} from "../normalize/unary_minus";

/*
equalsTo = a/b + c/d

Algorithm:
where d < a and d, a > 0
C in [-1, 0, 1]

equalsTo = (k - C + a/d * n/n) + ((equalsTo - k) + (C - a/d) * m/m)
equalsTo = (k * d - C * d + a) * n / d * n + (equalsTo * d - k * d + C * d - a) * m / d * m
(k * d - C * d + a) * n / d / n + (equalsTo * d - k * d + C * d - a) * m / d / m
 */
export function generateSimpleFractionSum(prando: Prando, equalsTo: number): MathNode {
    const a = prando.nextInt(1, 25);
    const d = a + prando.nextInt(1, 25);
    const n = prando.nextInt(1, 9);
    const m = prando.nextInt(1, 9);
    const k = prando.nextInt(1, equalsTo - 1);
    const C = prando.nextInt(-1, 1);

    const expr = math.parse(`${(k * d - C * d + a) * n} / ${d * n} + ${(equalsTo * d - k * d + C * d - a) * m} / ${d * m}`);
    return normalize.fullUnaryMinus(expr)
}

/*
equalsTo = a/b - c/d

Algorithm:
where d < a and d, a > 0
C in [-1, 0, 1]

equalsTo = (k + equalsTo + C + a/d * n/n) - (k  + (C + a/d) * m/m)
equalsTo = ((k * d + equalsTo * d + C * d + a) * n / d * n  - (k * d  + C * d + a) * m / d * m
((k * d + X * d + C * d + a) * n / d / n  - (k * d  + C * d + a) * m / d / m
 */
export function generateSimpleFractionSub(prando: Prando, equalsTo: number): MathNode {
    const a = prando.nextInt(1, 25);
    const d = a + prando.nextInt(1, 25);
    const n = prando.nextInt(1, 9);
    const m = prando.nextInt(1, 9);
    const k = prando.nextInt(1, equalsTo - 1);
    const C = prando.nextInt(-1, 1);

    const expr = math.parse(`${(k * d + equalsTo * d + C * d + a) * n} / ${d * n} - ${(k * d + C * d + a) * m} / ${d * m}`);
    return normalize.fullUnaryMinus(expr)
}
