import assert from "assert";
import * as math from "mathjs";
import {suite, test} from 'mocha'
import {isOperator, myTransform, myTraverse} from "../../core/mathnode_util";
import {nodeParentId} from "../test_utils";


suite("isOperator", () => {

    test("when it is a matching operator", () => {
        const node = math.parse("10 - 5")
        assert.equal(isOperator(node, 'subtract'), true)
    })

    test("when it is NOT a matching operator", () => {
        const node = math.parse("10 - 5")
        assert.equal(isOperator(node, 'multiply'), false)
    })

    test("when it is NOT an operator at all", () => {
        const node = math.parse("10005")
        assert.equal(isOperator(node, 'multiply'), false)
    })

    test("narrows down the type if true", () => {
        const node = math.parse("10 - 5")
        if (isOperator(node, 'subtract')) {
            assert(node.isBinary())
        }
    })
})


suite("my MathNode traverse and transform", () => {
    const tree1 = math.parse("56 / 104 + (38 + 22) / 47")
    const correctPathTree1 = new Map<string, string>([
        ['? -> +', '$'],
        ['+ -> /', '$.args[1]'],
        ['/ -> 56', '$.args[0].args[0]'],
        ['/ -> 104', '$.args[0].args[1]'],
        ['/ -> ()', '$.args[1].args[0]'],
        ['() -> +', '$.args[1].args[0].content'],
        ['+ -> 38', '$.args[1].args[0].content.args[0]'],
        ['+ -> 22', '$.args[1].args[0].content.args[1]'],
        ['/ -> 47', '$.args[1].args[1]']
    ]);

    suite("myTraverse", () => {
        test("passes in the correct JSON paths", () => {
            const pathTree = new Map<string, string>()
            myTraverse(tree1, (node, path, parent) => pathTree.set(nodeParentId(node, parent), path))
            assert.deepEqual(pathTree, correctPathTree1)
        })
    })

    suite("myTransform", () => {
        test("passes in the correct JSON paths", () => {
            const pathTree = new Map<string, string>()
            myTransform(tree1, (node, path, parent) => {
                pathTree.set(nodeParentId(node, parent), path);
                return node
            })
            assert.deepEqual(pathTree, correctPathTree1)
        })
    })
})