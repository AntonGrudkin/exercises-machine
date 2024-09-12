import {ConstantNode, MathNode, OperatorNode} from "mathjs";
import Prando from "prando";
import {myTransform} from "../mathnode_util";
import {normalize} from "../normalize/unary_minus";


export class Transformation {
    constructor(readonly targetPath: string,
                readonly replaceWith: MathNode,
                readonly complexity: number,
                readonly children: ConstantNode[]) {
    }

    transform(tree: MathNode): MathNode {
        const result = myTransform(tree, (node, path) => {
            if (path === this.targetPath) {
                return this.replaceWith;
            } else {
                return node;
            }
        })
        return result
    }

    transformTriple(tree: MathNode, queue: ConstantNode[], complexity: number)
        : { tree: MathNode, queue: ConstantNode[], complexity: number } {

        return {
            tree: this.transform(tree),
            queue: queue.concat(this.children),
            complexity: complexity - this.complexity
        }
    }
}


export abstract class Complicator {

    abstract readonly childNum: number // number of children that this complicator creates
    abstract readonly complexity: number // must be positive

    constructor(protected readonly prando: Prando) {
    }

    abstract generateTransformation(node: ConstantNode, path: string): Transformation;
}


export function allComplicators(prando: Prando): Complicator[] {
    return [
        new AdditionComp(prando),
        new SubtractComp(prando),
        new DivisionComp(prando),
        new FractionSubComp(prando),
    ]
}


export class ConstComp extends Complicator {
    override childNum = 0;
    override complexity = 1;

    override generateTransformation(node: ConstantNode, path: string): Transformation {
        return new Transformation(path, node, this.complexity, []);
    }
}


export class AdditionComp extends Complicator {
    override childNum = 2;
    override complexity = 2;

    override generateTransformation(node: ConstantNode, path: string): Transformation {
        const equalsTo = node.value
        const leaf1 = new ConstantNode(this.prando.nextInt(1, equalsTo - 1))
        const leaf2 = new ConstantNode(equalsTo - leaf1.value)
        const tree = new OperatorNode('+', 'add', [leaf1, leaf2]);

        return new Transformation(path, tree, this.complexity, [leaf1, leaf2]);
    }
}


export class SubtractComp extends Complicator {
    override childNum = 2;
    override complexity = 2;

    override generateTransformation(node: ConstantNode, path: string): Transformation {
        const equalsTo = node.value
        const leaf1 = new ConstantNode(this.prando.nextInt(equalsTo + 1, equalsTo * 2))
        const leaf2 = new ConstantNode(leaf1.value - equalsTo)
        let tree: MathNode = new OperatorNode('-', 'subtract', [leaf1, leaf2]);
        tree = normalize.unaryMinusInSums(tree)

        return new Transformation(path, tree, this.complexity, [leaf1, leaf2]);
    }
}


export class DivisionComp extends Complicator {
    override childNum = 2;
    override complexity = 2;

    override generateTransformation(node: ConstantNode, path: string): Transformation {
        const equalsTo = node.value
        const d = this.prando.nextInt(2, 9);

        const leaf1 = new ConstantNode(equalsTo * d)
        const leaf2 = new ConstantNode(d)
        const tree = new OperatorNode('/', 'divide', [leaf1, leaf2]);

        return new Transformation(path, tree, this.complexity, [leaf1, leaf2]);
    }
}


export class FractionSubComp extends Complicator {
    override childNum = 4;
    override complexity = 6;

    override generateTransformation(node: ConstantNode, path: string): Transformation {
        const equalsTo = node.value
        const a = this.prando.nextInt(1, 25);
        const d = a + this.prando.nextInt(1, 25);
        const n = this.prando.nextInt(1, 9);
        const m = this.prando.nextInt(1, 9);
        const k = this.prando.nextInt(1, equalsTo - 1);
        const C = this.prando.nextInt(-1, 1);

        const leaf1 = new ConstantNode((k * d + equalsTo * d + C * d + a) * n);
        const leaf2 = new ConstantNode(d * n);
        const leaf3 = new ConstantNode((k * d + C * d + a) * m);
        const leaf4 = new ConstantNode(d * m);

        const tree = new OperatorNode('-', 'subtract', [
            new OperatorNode('/', 'divide', [leaf1, leaf2]),
            new OperatorNode('/', 'divide', [leaf3, leaf4]),
        ])

        return new Transformation(path, tree, this.complexity, [leaf1, leaf2, leaf3, leaf4]);
    }
}
