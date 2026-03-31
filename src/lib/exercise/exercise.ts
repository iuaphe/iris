// export type ExerciseComponent = new (...args: any[]) => SvelteComponentTyped<{ onFinish: () => void }>

/*
todos:
- graph
    - bfs
    - tangents extracted
    - extract content
- exercises
    - clozes turn into mc
    - multi select
    - break up incorrect answers; 
    - exercise sequences
- tunneling
- misc
    - restart visualizations
    - numbered eq
*/

export type Cloze = {
	preCloze: string;
	cloze: string[];
	postCloze: string;
};

export type MultipleChoice = {
	question: string;
	/**
	 * A set of options; the first element is the correct answer.
	 */
	options: string[];
};

export type ShortAnswer = {
	question: string;
	possibleAnswer?: string;
};

export type Exercise =
	| {
			type: 'cloze';
			cloze: Cloze;
	  }
	| {
			type: 'mc';
			mc: MultipleChoice;
	  }
	| {
			type: 'short';
			short: ShortAnswer;
	  };

/* graph exercises! */

const clozeExercise = {
	type: 'cloze',
	cloze: {
		preCloze: 'If $(a, b) \\in E$, then $a$ and $b$ are ',
		cloze: ['adjacent', 'neighboring', 'neighbors', 'related'],
		postCloze: '.'
	}
} as Exercise;

const mcExercise = {
	type: 'mc',
	mc: {
		question: 'Suppose $e = (a, b)$ is an edge in $E$. We can say $e$ is _____ on $a$.',
		options: ['incident', 'adjacent', 'indecent', 'neighboring']
	}
} as Exercise;

const shortAnswerExercise = {
	type: 'short',
	short: {
		question:
			"Suppose we've decided to represent Tic-Tac-Toe as a graph, where nodes are game states and edges are possible moves. What does a path represent in this example?",
		possibleAnswer:
			'A path is a sequence of edges, which in this case are moves; a sequence of moves can be thought of some part of a Tic-Tac-Toe match. If this path starts at the empty state and ends at a winning state, this path represents an entire game of Tic-Tac-Toe.'
	}
} as Exercise;

export const graphExercises: Exercise[] = [clozeExercise, mcExercise, shortAnswerExercise];
