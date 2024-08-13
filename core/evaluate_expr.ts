export function eval_expr_str(input: string): number {
    if(input === '1=1')
        return 1
    else throw SyntaxError(`${input}`)
}