import assert from 'assert';
import {eval_expr_str} from '../core/evaluate_expr'

describe('eval_expr_str', function() {
    it('works for 1=1', function() {
        let result = eval_expr_str("1=1")
        assert.equal(result, 1);
    });
});