import {ConstantNode, MathNode} from 'mathjs'
import type Prando from 'prando'
import {normalize} from "../normalize/unary_minus";
import {FractionAddComplicator, FractionSubComplicator} from "./complicator";


export function generateSimpleFractionSum(prando: Prando, equalsTo: number): MathNode {
    let tree: MathNode = new ConstantNode(equalsTo)
    const comp = new FractionAddComplicator(prando)
    const transform = comp.generateTransformation(tree as ConstantNode, "$")
    tree = transform.transform(tree)

    return normalize.fullUnaryMinus(tree)
}

export function generateSimpleFractionSub(prando: Prando, equalsTo: number): MathNode {
    let tree: MathNode = new ConstantNode(equalsTo)
    const comp = new FractionSubComplicator(prando)
    const transform = comp.generateTransformation(tree as ConstantNode, "$")
    tree = transform.transform(tree)

    return normalize.fullUnaryMinus(tree)
}
