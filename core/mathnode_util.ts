import type {MathNode, OperatorNodeFn} from "mathjs";
import {OperatorNode} from "mathjs";

export function isOperator(node: MathNode, fn: OperatorNodeFn): node is OperatorNode {
    return node instanceof OperatorNode && node.fn === fn
}