import {MathNode} from "mathjs";
import Prando from "prando";
import {generateFractionExercise} from "../generate/generate_math_exercise";

const mathsteps = require('mathsteps');

export function measureExpressionComplexity(tree: MathNode): number {
    const steps = mathsteps.simplifyExpression(tree.toString())

    let sum = 0
    // @ts-ignore
    steps.forEach(step => {
        sum += stepComplexity(step.changeType)
    })

    return sum
}

function stepComplexity(changeType: string): number {
    switch (changeType) {
        case 'SIMPLIFY_DIVISION':
            return 3;
        case 'MULTIPLY_BY_INVERSE':
            return 1;
        case 'ADD_FRACTIONS':
            return 5;
        case 'CANCEL_TERMS':
            return 2;
        case 'SIMPLIFY_FRACTION':
            return 3;
        case 'MULTIPLY_FRACTIONS':
            return 2;
        case 'REMOVE_MULTIPLYING_BY_ONE':
            return 1;
        case 'COLLECT_AND_COMBINE_LIKE_TERMS':
            return 2;
        case 'SIMPLIFY_ARITHMETIC':
            return 2;
        default: {
            console.log(`unknown change type: ${changeType}`)
            return 1
        }
    }
}

const prando = new Prando("seed")
const complexityBudget = 15;
const ex = generateFractionExercise(prando, complexityBudget)
const actualComplexity = measureExpressionComplexity(ex.exercise);
console.log(`with complexity budget ${complexityBudget} got complexity ${actualComplexity} from ${ex.exercise.toString()}`)
