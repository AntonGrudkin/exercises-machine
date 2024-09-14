import {ConstantNode, MathNode} from "mathjs";
import Prando from "prando";
import {myTraverse} from "../mathnode_util";
import {allComplicators, FractionSubComplicator, Transformation} from "./complicator";

export class MathExercise {
    constructor(readonly answer: number, readonly exercise: MathNode) {
    }
}


export function generateFractionExercise(prando: Prando, complexityBudget: number): MathExercise {
    const answer = prando.nextInt(1, 25);
    let tree: MathNode = new ConstantNode(answer)
    let queue: ConstantNode[] = []
    let complexity = complexityBudget

    let trans: Transformation = (new FractionSubComplicator(prando)).generateTransformation(tree as ConstantNode, "$");
    ({tree, queue, complexity} = trans.transformTriple(tree, queue, complexity))

    const complicators = allComplicators(prando)
    while (complexity > 0) {
        const complicator = prando.nextArrayItem(complicators)
        const leafs: { node: MathNode, path: string }[] = []
        myTraverse(tree, (node, path) => {
            if (node.type == "ConstantNode") leafs.push({node, path})
        })

        const {node, path} = prando.nextArrayItem(leafs)

        trans = complicator.generateTransformation(node as ConstantNode, path);
        ({tree, queue, complexity} = trans.transformTriple(tree, queue, complexity));
    }

    return new MathExercise(answer, tree)
}