import {MathNode} from "mathjs";
import Prando from "prando";
import {Complicator, ConstComp, FractionComp} from "./complicator";

export class MathExercise {
    constructor(public answer: number, public exercise: MathNode, public complexity: number) {
    }
}

export function generateMathExercise(prando: Prando,
                                     complexityBudget: number,
                                     topLevelComp: Complicator,
                                     additionalComps: [Complicator]): MathExercise {

    const chooseRandComp = function (budget: number): Complicator {
        const chooseFrom = additionalComps.filter((comp) => comp.complexity <= budget)
        if (chooseFrom.length == 0) {
            chooseFrom.push(new ConstComp());
        }
        return prando.nextArrayItem(chooseFrom);
    }

    const answer = prando.nextInt(1, 25);

    const tree = topLevelComp.generate(prando, complexityBudget, answer, chooseRandComp);

    return new MathExercise(answer, tree, complexityBudget)
}

export function generateFractionExercise(prando: Prando, complexityBudget: number): MathExercise {
    return generateMathExercise(prando, complexityBudget, new FractionComp(), [new ConstComp()])
}