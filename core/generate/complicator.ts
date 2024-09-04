import assert from "assert";
import {ConstantNode, MathNode, OperatorNode} from "mathjs";
import Prando from "prando";


export abstract class Complicator {
    protected constructor(public branchNum: number, public complexity: number) {
        assert(branchNum > 0)
        assert(complexity > 0);
    }

    abstract generate(prando: Prando, budget: number, equalsTo: number, complicate: (budget: number) => Complicator): MathNode;
}


export class ConstComp extends Complicator {
    constructor() {
        super(0, 1);
    }

    override generate(prando: Prando, budget: number, equalsTo: number, complicate: (budget: number) => Complicator): MathNode {
        return new ConstantNode(equalsTo);
    }
}


export class FractionComp extends Complicator {
    constructor() {
        super(4, 5)
    }

    override generate(prando: Prando, budget: number, equalsTo: number, complicate: (budget: number) => Complicator): MathNode {
        const a = prando.nextInt(1, 25);
        const d = a + prando.nextInt(1, 25);
        const n = prando.nextInt(1, 9);
        const m = prando.nextInt(1, 9);
        const k = prando.nextInt(1, equalsTo - 1);
        const C = prando.nextInt(-1, 1);

        const branchBudget = budget / 4;

        const exp1 = complicate(branchBudget).generate(prando, branchBudget, (k * d + equalsTo * d + C * d + a) * n, complicate)
        const exp2 = complicate(branchBudget).generate(prando, branchBudget, d * n, complicate)
        const exp3 = complicate(branchBudget).generate(prando, branchBudget, (k * d + C * d + a) * m, complicate)
        const exp4 = complicate(branchBudget).generate(prando, branchBudget, d * m, complicate)

        const tree = new OperatorNode('-', 'subtract', [
            new OperatorNode('/', 'divide', [exp1, exp2]),
            new OperatorNode('/', 'divide', [exp3, exp4])])

        return tree
    }
}
