import assert from 'assert';
import {generate_simple_fraction_sum} from '../core/generate_fractions'
import Prando from "prando";

describe('{generate_simple_fraction_sum', function() {
    let prando = new Prando("a testing seed")

    it('for a given answer generates an expression', function() {
        let answer = prando.nextInt(5, 50)
        let expr = generate_simple_fraction_sum(prando, answer)

        console.log(expr.toString())
        console.log(expr.toTex())

        assert.equal(expr.evaluate(), answer);
    });
});