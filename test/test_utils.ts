import type {Context, Done, Func, Test} from "mocha";
import {test} from "mocha";

export function testRepeat(title: string, times: number, fn: Func): Test {
    return test(`${title} x ${times}`, function (this: Context, done: Done) {
        for (let i = 0; i < times; i++) {
            fn.call(this, done)
        }
        done()
    })
}

export function repeat(times: number, fn: Func): Func {
    return function (this: Context, done: Done) {
        for (let i = 0; i < times; i++) {
            fn.call(this, done)
        }
        done()
    }
}

