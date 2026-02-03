import type { GraphAnimator } from '$lib/graphics/graph/animator/graph-animator';
import { Color } from '$lib/graphics/graph/color/color';
import { Edge } from '$lib/graphics/graph/edge';
import { randomChoice, randomIndex } from '$lib/util/random';
import { PrimsMSTAlgorithm } from './prims';

const BASE_COLOR = new Color(210, 210, 210);
const ACTIVE_COLOR = new Color(201, 83, 112);

export class SpanningTrees {
	weight = 0;

	constructor(private graph: GraphAnimator<number>) {}

	initialize() {
		this.reset();
	}

	private reset() {
		for (const edge of this.graph.getGraph().getAllEdges()) {
			this.graph.colorEdge(edge, BASE_COLOR);
		}
		for (const vertex of this.graph.getGraph().getAllVertices()) {
			this.graph.colorVertex(vertex, BASE_COLOR);
		}
		this.weight = 0;
	}

	generateNew() {
		this.reset();

		const start = randomChoice([...this.graph.getGraph().getAllVertices()]);

		const added = new Set<number>();
		const fringe: [number | undefined, number][] = [[undefined, start]];

		while (fringe.length > 0) {
			const xIndex = randomIndex(fringe);
			const [previous, v] = fringe[xIndex];
			fringe.splice(xIndex, 1);

			if (!added.has(v)) {
				added.add(v);
				for (const edge of this.graph.getGraph().getAdjacent(v)) {
					fringe.push([v, edge.getTo()]);
				}

				this.graph.colorVertex(v, ACTIVE_COLOR);
				if (previous != undefined) {
					this.graph.colorEdge(new Edge(previous, v), ACTIVE_COLOR);
					this.weight += this.graph.getGraph().getWeight(new Edge(previous, v));
				}
			}
		}
	}

	generateNewMinimum() {
		const prims = new PrimsMSTAlgorithm(this.graph);
		prims.initalize(0);
		while (!prims.hasTerminated()) {
			prims.step();
		}
		this.weight = 0;
		for (const [from, to] of prims.tree.entries()) {
			if (to !== undefined) {
				this.weight += this.graph.getGraph().getWeight(new Edge(from, to));
			}
		}
	}

	getWeight() {
		return this.weight;
	}
}
