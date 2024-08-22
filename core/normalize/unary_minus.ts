import type {MathNode} from "mathjs"
import {ConstantNode, OperatorNode} from "mathjs";
import {isOperator} from '../mathnode_util'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace normalize {
    export function fullUnaryMinus(node: MathNode): MathNode {
        node = unaryMinusOnFraction(node)
        node = unaryMinusInSums(node)
        return node
    }

    export function unaryMinusOnFraction(node: MathNode): MathNode {
        node = node.map((child) => {
            return unaryMinusOnFraction(child)
        })

        if (isOperator(node, 'divide')) {
            let totalSign = 1
            const newArgs = []

            for (const maybeUnaryMinus of node.args) {
                if (isOperator(maybeUnaryMinus, 'unaryMinus')) {
                    totalSign *= -1
                    newArgs.push(maybeUnaryMinus.args[0])
                } else if (maybeUnaryMinus instanceof ConstantNode && maybeUnaryMinus.value < 0) {
                    totalSign *= -1
                    newArgs.push(new ConstantNode(-1 * maybeUnaryMinus.value))
                } else {
                    newArgs.push(maybeUnaryMinus)
                }
            }

            const newNode = new OperatorNode('/', 'divide', newArgs)

            if (1 === totalSign) {
                return newNode
            } else {
                return new OperatorNode('-', 'unaryMinus', [newNode])
            }
        }

        return node
    }

    export function unaryMinusInSums(node: MathNode): MathNode {
        node = node.map((child) => {
            return unaryMinusInSums(child)
        })

        if (isOperator(node, 'add')) {
            const [a, b] = node.args
            if (isOperator(b, 'unaryMinus')) {
                node = new OperatorNode('-', 'subtract', [a, b.args[0]])
            }
        }

        if (isOperator(node, 'subtract')) {
            const [a, b] = node.args
            if (isOperator(b, 'unaryMinus')) {
                node = new OperatorNode('+', 'add', [a, b.args[0]])
            }
        }

        if (isOperator(node, 'add')) {
            const [a, b] = node.args
            if (isOperator(a, 'unaryMinus')) {
                return new OperatorNode('-', 'subtract', [b, a.args[0]])
            }
        }

        return node
    }
}