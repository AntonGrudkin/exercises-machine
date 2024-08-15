import type Prando from 'prando'
import type {MathNode} from 'mathjs'
import * as math from 'mathjs'

/*
equals_to = a/b + c/d
equals_to = a/b - c/d
 */
export function generateSimpleFractionSum(prando: Prando, equalsTo: number): MathNode {
    const a = prando.nextInt(-25, 25);
    const b = prando.nextInt(-25, 25);
    const c = prando.nextInt(-25, 25);
    const d = prando.nextInt(-25, 25);

    const expr = math.parse(`${a} / ${b} + ${c} / ${d}`);
    const result = expr.evaluate();

    const correction = equalsTo - result;
    const correctedExpr = new math.OperatorNode('+', 'add', [expr, new math.ConstantNode(correction)]);
    return correctedExpr
}
