import assert from 'assert';
import {generateSimpleFractionSum} from '../core/generate_fractions'
import Prando from "prando";

describe('{generate_simple_fraction_sum', function() {
    const prando = new Prando("a testing seed");

    it('for a given answer generates an expression', function() {
        const answer = prando.nextInt(5, 50);
        const expr = generateSimpleFractionSum(prando, answer);

        console.log(expr.toString())
        console.log(expr.toTex())

        assert.equal(expr.evaluate(), answer);
    });
});