import assert from "assert";
import * as math from "mathjs";
import {suite, test} from 'mocha'
import {isOperator} from "../../core/mathnode_util";


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