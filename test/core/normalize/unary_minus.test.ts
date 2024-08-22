import assert from "assert";
import * as math from "mathjs";
import {suite, test} from 'mocha'
import {normalize} from "../../../core/normalize/unary_minus";


suite("fullUnaryMinus", () => {
    test("normalize (78 - 10)/-45 + -123/56 + 4 * 5 / -33", () => {
        const expr = math.parse("(78 - 10)/-45 + -123/56 + 4 * 5 / -33")
        const normExpr = normalize.fullUnaryMinus(expr)
        assert.equal(normExpr.evaluate(), expr.evaluate())
        assert.equal(normExpr.toString(), "-((78 - 10) / 45) - 123 / 56 - 4 * 5 / 33")
    })

    test("normalize -(78 - 10)/-45 - -123/56 + 4 * 5 / -33", () => {
        const expr = math.parse("-(78 - 10)/-45 - -123/56 + 4 * 5 / -33")
        const normExpr = normalize.fullUnaryMinus(expr)
        assert.equal(normExpr.evaluate(), expr.evaluate())
        assert.equal(normExpr.toString(), "(78 - 10) / 45 + 123 / 56 - 4 * 5 / 33")
    })
})

suite("unaryMinusOnFraction", () => {
    test("minus in the top", () => {
        const expr = math.parse("239 + -123/56")
        const normExpr = normalize.unaryMinusOnFraction(expr)
        assert.equal(normExpr.evaluate(), expr.evaluate())
        assert.equal(normExpr.toString(), "239 + -(123 / 56)")
    })

    test("minus at the bottom", () => {
        const expr = math.parse("239 - 123/-56")
        const normExpr = normalize.unaryMinusOnFraction(expr)
        assert.equal(normExpr.evaluate(), expr.evaluate())
        assert.equal(normExpr.toString(), "239 - -(123 / 56)")
    })

    test("minus in both", () => {
        const expr = math.parse("239 * (-123/-56)")
        const normExpr = normalize.unaryMinusOnFraction(expr)
        assert.equal(normExpr.evaluate(), expr.evaluate())
        assert.equal(normExpr.toString(), "239 * (123 / 56)")
    })
})

suite("unaryMinusInSum", () => {
    test("sum with  minus in the second arg", () => {
        const expr = math.parse("239 + -100")
        const normExpr = normalize.unaryMinusInSums(expr)
        assert.equal(normExpr.evaluate(), expr.evaluate())
        assert.equal(normExpr.toString(), "239 - 100")
    })

    test("sum with minus in the first arg", () => {
        const expr = math.parse("-239 + 100")
        const normExpr = normalize.unaryMinusInSums(expr)
        assert.equal(normExpr.evaluate(), expr.evaluate())
        assert.equal(normExpr.toString(), "100 - 239")
    })

    test("sum with minus in both arg", () => {
        const expr = math.parse("-239 + -100")
        const normExpr = normalize.unaryMinusInSums(expr)
        assert.equal(normExpr.evaluate(), expr.evaluate())
        assert.equal(normExpr.toString(), "-239 - 100")
    })

    test("substr with  minus in the second arg", () => {
        const expr = math.parse("239 - -100")
        const normExpr = normalize.unaryMinusInSums(expr)
        assert.equal(normExpr.evaluate(), expr.evaluate())
        assert.equal(normExpr.toString(), "239 + 100")
    })

    test("substr with minus in the first arg", () => {
        const expr = math.parse("-239 - 100")
        const normExpr = normalize.unaryMinusInSums(expr)
        assert.equal(normExpr.evaluate(), expr.evaluate())
        assert.equal(normExpr.toString(), "-239 - 100")
    })

    test("substr with minus in both arg", () => {
        const expr = math.parse("-239 - -100")
        const normExpr = normalize.unaryMinusInSums(expr)
        assert.equal(normExpr.evaluate(), expr.evaluate())
        assert.equal(normExpr.toString(), "100 - 239")
    })

    test("when 3 arg, minus in 2nd", () => {
        const expr = math.parse("239 + -100 - 50")
        const normExpr = normalize.unaryMinusInSums(expr)
        assert.equal(normExpr.evaluate(), expr.evaluate())
        assert.equal(normExpr.toString(), "239 - 100 - 50")
    })

    test("when 3 arg, minus in 3rd", () => {
        const expr = math.parse("239 + 100 - -50")
        const normExpr = normalize.unaryMinusInSums(expr)
        assert.equal(normExpr.evaluate(), expr.evaluate())
        assert.equal(normExpr.toString(), "239 + 100 + 50")
    })
})