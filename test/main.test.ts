import assert from 'assert';
import {evalExprStr} from '../core/evaluate_expr'

describe('eval_expr_str', function() {
    it('works for 1=1', function() {
        const result = evalExprStr("1=1")
        assert.equal(result, 1);
    });
});