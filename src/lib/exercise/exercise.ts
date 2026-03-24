// export type ExerciseComponent = new (...args: any[]) => SvelteComponentTyped<{ onFinish: () => void }>

export type Cloze = {
    preCloze: string;
    cloze: string;
    postCloze: string;
};

export type MultipleChoice = {
    question: string;
    /**
     * A set of options, such that the first element is the correct answer.
     */
    options: string[]
}

export type ShortAnswer = {
    question: string;
    recommendedAnswer?: string;
}

export type Exercise = {
    type: 'cloze',
    cloze: Cloze
} | {
    type: 'mc',
    mc: MultipleChoice
} | {
    type: 'short',
    short: ShortAnswer
}

/* graph exercises! */

const clozeExercise = {
    type: 'cloze',
    cloze: {
        preCloze: 'If $(a, b) \\in E$, then $a$ and $b$ are ',
        cloze: 'adjacent',
        postCloze: '.'
    }
} as Exercise

const mcExercise = {
    type: 'mc',
    mc: {
        question: 'Suppose $e = (a, b)$ is an edge in $E$. We can say $e$ is _____ on $a$.',
        options: ['incident', 'adjacent', 'indecent', 'neighboring'],
    }
} as Exercise

const shortAnswerExercise = {
    type: 'short',
    short: {
        question: 'Come up with a structure in real life not mentioned yet that might be able to be represented as a graph. What would a path in this graph represent?'
    }
} as Exercise

export const graphExercises: Exercise[] = [clozeExercise, mcExercise, shortAnswerExercise]