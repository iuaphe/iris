import type { Algorithm } from '../../algorithm';

import { Color } from '$lib/graphics/graph/color/color';
import type { DirectedGraphAnimator } from '$lib/graphics/graph/animator/directed-graph-animator';
import { DirectedEdge } from '$lib/graphics/graph/directed-edge';

const FRINGE_COLOR = new Color(255, 150, 100);
const VISITED_COLOR = new Color(13, 122, 255);
const DONE_COLOR = new Color(240, 240, 240);

export class DirectedFringeSearch<T> implements Algorithm<T> {
	private fringe: Bag<[T, T]>;
	private visited: Set<T>;

	constructor(private graph: DirectedGraphAnimator<T>, private bagConstructor: () => Bag<[T, T]>) {}

	public initalize(start: T): void {
		this.fringe = this.bagConstructor();
		this.fringe.insert([undefined, start]);
		this.visited = new Set();
		this.graph.colorVertex(start, FRINGE_COLOR);
	}

	public hasTerminated() {
		return this.fringe.empty();
	}

	public step(): void {
		const [prev, next] = this.fringe.remove();
		if (this.visited.has(next)) {
			if (prev !== undefined) {
				this.graph.colorEdge(new DirectedEdge(prev, next), DONE_COLOR);
			}
		} else {
			this.visited.add(next);
			this.graph.colorVertex(next, VISITED_COLOR);
			if (prev !== undefined) {
				this.graph.colorEdge(new DirectedEdge(prev, next), VISITED_COLOR);
			}
			this.graph.colorVertex(next, VISITED_COLOR);
			for (const e of this.graph.getGraph().getAdjacent(next)) {
				if (!this.visited.has(e.getTo())) {
					this.fringe.insert([e.getFrom(), e.getTo()]);
					this.graph.colorVertex(e.getTo(), FRINGE_COLOR);
					this.graph.colorEdge(e, FRINGE_COLOR);
				}
			}
		}
	}
}

interface Bag<T> {
	insert(t: T): void;
	remove(): T;
	empty(): boolean;
}

export class Queue<T> implements Bag<T> {
	list: T[];

	constructor() {
		this.list = [];
	}

	insert(t: T): void {
		this.list.push(t);
	}

	remove(): T {
		return this.list.shift();
	}

	empty(): boolean {
		return this.list.length === 0;
	}
}

export class Stack<T> implements Bag<T> {
	list: T[];

	constructor() {
		this.list = [];
	}

	insert(t: T): void {
		this.list.push(t);
	}

	remove(): T {
		return this.list.pop();
	}

	empty(): boolean {
		return this.list.length === 0;
	}
}
