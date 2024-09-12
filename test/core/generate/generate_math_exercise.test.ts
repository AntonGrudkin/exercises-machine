import {suite, test} from 'mocha'
import Prando from "prando";
import {generateFractionExercise} from "../../../core/generate/generate_math_exercise";

suite("generateFractionExercise", () => {
    const prando = new Prando("test seed")

    test("fraction exercise for complexity budget 5", () => {
        const mathExercise = generateFractionExercise(prando, 5)
        console.log(mathExercise.exercise.toString())
    })

    test("fraction exercise for complexity budget 10", () => {
        const mathExercise = generateFractionExercise(prando, 10)
        console.log(mathExercise.exercise.toString())
    })

    test("fraction exercise for complexity budget 20", () => {
        const mathExercise = generateFractionExercise(prando, 20)
        console.log(mathExercise.exercise.toString())
    })

    test("fraction exercise for complexity budget 30", () => {
        const mathExercise = generateFractionExercise(prando, 30)
        console.log(mathExercise.exercise.toString())
    })

    test("fraction exercise for complexity budget 40", () => {
        const mathExercise = generateFractionExercise(prando, 40)
        console.log(mathExercise.exercise.toString())
    })

})