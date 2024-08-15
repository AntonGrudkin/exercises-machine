import Prando from 'prando'
import {MathNode, parse, OperatorNode, ConstantNode} from 'mathjs'

/*
equals_to = a/b + c/d
equals_to = a/b - c/d
 */
export function generate_simple_fraction_sum(prando: Prando, equals_to: number): MathNode {
    let a = prando.nextInt(-25, 25)
    let b = prando.nextInt(-25, 25)
    let c = prando.nextInt(-25, 25)
    let d = prando.nextInt(-25, 25)

    let expr = parse(`${a} / ${b} + ${c} / ${d}`)
    let result = expr.evaluate()

    let correction = equals_to - result
    let corrected_expr = new OperatorNode('+', 'add', [expr, new ConstantNode(correction)])
    return corrected_expr
}
