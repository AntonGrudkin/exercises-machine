import assert from "assert";
import * as math from "mathjs";
import {suite, test} from 'mocha'
import {myTransform, myTraverse} from "../../core/mathnode_util";
import {nodeParentId} from "../test_utils";


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

suite("MathNode.traverse", () => {
    test.skip("mathjs traverse should pass in correct JSON path", () => {
        const pathTree = new Map<string, string>()
        tree1.traverse((node, path, parent) => pathTree.set(nodeParentId(node, parent), path))
        assert.deepEqual(pathTree, correctPathTree1)
    })

    test("myTraverse should pass in correct JSON path", () => {
        const pathTree = new Map<string, string>()
        myTraverse(tree1, (node, path, parent) => pathTree.set(nodeParentId(node, parent), path))
        assert.deepEqual(pathTree, correctPathTree1)
    })
})

suite("MathNode.transform", () => {
    test.skip("mathjs transform should pass in correct JSON path", () => {
        const pathTree = new Map<string, string>()
        tree1.transform((node, path, parent) => {
            pathTree.set(nodeParentId(node, parent), path);
            return node
        })
        console.log(pathTree)
        assert.deepEqual(pathTree, correctPathTree1)
    })

    test("myTransform should pass in correct JSON path", () => {
        const pathTree = new Map<string, string>()
        myTransform(tree1, (node, path, parent) => {
            pathTree.set(nodeParentId(node, parent), path);
            return node
        })
        assert.deepEqual(pathTree, correctPathTree1)
    })
})