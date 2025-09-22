import { Paragraph } from './article';

export class Exercise {
	constructor(public name: string, public description: Paragraph[]) {}
}

export class ExerciseSet {
	constructor(public exercises: Exercise[]) {}
}
