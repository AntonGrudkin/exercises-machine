import assert from 'assert'
import type {MathNode} from "mathjs";
import {suite, test} from 'mocha'
import Prando from 'prando'
import * as generateFraction from '../core/generate_fractions'
import {repeat} from './test_utils'

function assertExpressionAnswer(expr: MathNode, answer: number) {
    const epsilon = 0.001
    const result = expr.evaluate();
    if (Math.abs(result - answer) > epsilon) {
        assert.equal(result, answer, expr.toString())
    }
}

suite('generateSimpleFractionSum', () => {
    const prando = new Prando("a testing seed");

    test('print out 10 examples', () => {
        const answers = Array(10).fill(0).map(() => prando.nextInt(-20, 20))
        const examples = answers.map(answer => generateFraction.generateSimpleFractionSum(prando, answer))
        examples.forEach((ex, i) => {
            console.log(`${answers[i]} = \t ${ex.toString()} \t=\t ${ex.toTex()}`);
        })
    })

    test('for a positive answer expression is correct', () => {
        const answer = prando.nextInt(5, 50);
        const expr = generateFraction.generateSimpleFractionSum(prando, answer);
        assertExpressionAnswer(expr, answer);
    });

    test('for a negative answer expression is correct', () => {
        const answer = prando.nextInt(-50, -1);
        const expr = generateFraction.generateSimpleFractionSum(prando, answer);
        assertExpressionAnswer(expr, answer);
    });

    test('for answer=1 expression is correct', () => {
        const answer = 1;
        const expr = generateFraction.generateSimpleFractionSum(prando, answer);
        assertExpressionAnswer(expr, answer);
    });

    test('for answer=0 expression is correct', () => {
        const answer = 0;
        const expr = generateFraction.generateSimpleFractionSum(prando, answer);
        assertExpressionAnswer(expr, answer);
    });

    test('expression has form a/d + b/c, repeat x10', repeat(10, () => {
        const answer = prando.nextInt(5, 50);
        const expr = generateFraction.generateSimpleFractionSum(prando, answer);
        assert.match(expr.toString(), /(\d+) \/ (\d+) + (\d+) \/ (\d+)/)
    }));
});


suite('generateSimpleFractionSub', () => {
    const prando = new Prando("a testing seed");

    test('print out 10 examples', () => {
        const answers = Array(10).fill(0).map(() => prando.nextInt(-20, 20))
        const examples = answers.map(answer => generateFraction.generateSimpleFractionSub(prando, answer))
        examples.forEach((ex, i) => {
            console.log(`${answers[i]} = \t ${ex.toString()} \t=\t ${ex.toTex()}`);
        })
    })

    test('for a positive answer expression is correct', () => {
        const answer = prando.nextInt(5, 50);
        const expr = generateFraction.generateSimpleFractionSub(prando, answer);
        assertExpressionAnswer(expr, answer);
    });

    test('for a negative answer expression is correct', () => {
        const answer = prando.nextInt(-50, -1);
        const expr = generateFraction.generateSimpleFractionSub(prando, answer);
        assertExpressionAnswer(expr, answer);
    });

    test('for answer=1 expression is correct', () => {
        const answer = 1;
        const expr = generateFraction.generateSimpleFractionSub(prando, answer);
        assertExpressionAnswer(expr, answer);
    });

    test('for answer=0 expression is correct', () => {
        const answer = 0;
        const expr = generateFraction.generateSimpleFractionSub(prando, answer);
        assertExpressionAnswer(expr, answer);
    });

    test('expression has form a/d - b/c, repeat x10', repeat(10, () => {
        const answer = prando.nextInt(5, 50);
        const expr = generateFraction.generateSimpleFractionSub(prando, answer);
        assert.match(expr.toString(), /(\d+) \/ (\d+) - (\d+) \/ (\d+)/)
    }));
});

