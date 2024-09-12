import {MathNode, OperatorNode, OperatorNodeFn} from "mathjs";

export function isOperator(node: MathNode, fn: OperatorNodeFn): node is OperatorNode {
    return node instanceof OperatorNode && node.fn === fn
}

export function myTraverse(tree: MathNode, callback: (node: MathNode, path: string, parent: MathNode | null) => void) {
    callback(tree, "$", null);

    // recursively traverse over all children of a node
    // @ts-ignore
    function _traverse(node: MathNode, path: string, callback) {
        node.forEach(function (child, childPath, parent) {
            callback(child, `${path}.${childPath}`, parent);
            _traverse(child, `${path}.${childPath}`, callback);
        });
    }

    _traverse(tree, "$", callback);
}

export function myTransform(tree: MathNode, callback: (node: MathNode, path: string, parent: MathNode | null) => MathNode) {

    function _transform(child: MathNode, path: string, parent: MathNode | null): MathNode {
        const replacement = callback(child, path, parent);
        if (replacement !== child) {
            // stop iterating when the node is replaced
            return replacement;
        }

        return child.map((child, childPath, parent) => _transform(child, `${path}.${childPath}`, parent));
    }

    return _transform(tree, "$", null);
}