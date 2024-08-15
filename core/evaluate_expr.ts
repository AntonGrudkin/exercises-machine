
export function evalExprStr(input: string): number {
    if(input === '1=1')
        return 1
    else throw SyntaxError(`${input}`)
}