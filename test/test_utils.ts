import * as math from "mathjs";
import {MathNode} from "mathjs";
import type {Context, Done, Func, Test} from "mocha";
import {test} from "mocha";

export function testRepeat(title: string, times: number, fn: Func): Test {
    return test(`${title} x ${times}`, function (this: Context, done: Done) {
        for (let i = 0; i < times; i++) {
            fn.call(this, done)
        }
        done()
    })
}

export function repeat(times: number, fn: Func): Func {
    return function (this: Context, done: Done) {
        for (let i = 0; i < times; i++) {
            fn.call(this, done)
        }
        done()
    }
}

export function nodeParentId(node: MathNode, parent: MathNode | null): string {
    function nodeStr(node: MathNode | null): string {
        switch (true) {
            case node === null:
                return "?"
            case node instanceof math.ConstantNode:
                return node.value;
            case node instanceof math.OperatorNode:
                return node.op;
            case node instanceof math.ParenthesisNode:
                return "()"
            default:
                return node.type;
        }
    }

    return `${nodeStr(parent)} -> ${nodeStr(node)}`
}

