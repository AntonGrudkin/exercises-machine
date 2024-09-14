import {ConstantNode, MathNode, OperatorNode} from 'mathjs'
import type Prando from 'prando'
import {normalize} from "../normalize/unary_minus";
import {FractionSubComp} from "./complicator";

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

    const exp1 = new ConstantNode((k * d - C * d + a) * n);
    const exp2 = new ConstantNode(d * n);
    const exp3 = new ConstantNode((equalsTo * d - k * d + C * d - a) * m);
    const exp4 = new ConstantNode(d * m)

    const expr = new OperatorNode('+', 'add', [
        new OperatorNode('/', 'divide', [exp1, exp2]),
        new OperatorNode('/', 'divide', [exp3, exp4])])

    return normalize.fullUnaryMinus(expr)
}


export function generateSimpleFractionSub(prando: Prando, equalsTo: number): MathNode {
    let tree: MathNode = new ConstantNode(equalsTo)
    const comp = new FractionSubComp(prando)
    const transform = comp.generateTransformation(tree as ConstantNode, "$")
    tree = transform.transform(tree)

    return normalize.fullUnaryMinus(tree)
}
