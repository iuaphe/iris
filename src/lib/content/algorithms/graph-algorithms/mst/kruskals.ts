import { Color } from '$lib/graphics/graph/color/color';
import type { GraphAnimator } from '$lib/graphics/graph/animator/graph-animator';
import type { Algorithm } from '../../algorithm';
import { Edge } from '$lib/graphics/graph/edge';
import { NaiveUnionFind, type UnionFind } from '$lib/util/union-find';

const VISITED_COLOR = new Color(201, 83, 112);
const DONE_COLOR = new Color(230, 230, 230);

export class KruskalsMSTAlgorithm<T> implements Algorithm<T> {
	private graph: GraphAnimator<T>;
	public tree: Set<Edge<T>>;
	private components: UnionFind<T>;
	private remainingEdges: Edge<T>[];

	constructor(graph: GraphAnimator<T>) {
		this.graph = graph;
	}

	public initalize(): void {
		this.tree = new Set();
		this.components = new NaiveUnionFind();
		this.remainingEdges = [...this.graph.getGraph().getAllEdges()];
		this.remainingEdges.sort(
			(e1, e2) => -(this.graph.getGraph().getWeight(e1) - this.graph.getGraph().getWeight(e2))
		);

		for (const vertex of this.graph.getGraph().getAllVertices()) {
			this.components.makeSet(vertex);
			this.graph.colorVertex(vertex, VISITED_COLOR);
		}
	}

	public hasTerminated() {
		return this.remainingEdges.length === 0;
	}

	public step(): void {
		const edge = this.remainingEdges.pop();
		const [from, to] = [edge.getFrom(), edge.getTo()];
		if (this.components.find(from) === this.components.find(to)) {
			/* this will form a cycle; we ignore it. */
			this.graph.colorEdge(edge, DONE_COLOR);
		} else {
			this.components.union(from, to);
			this.graph.colorEdge(edge, VISITED_COLOR);
			this.tree.add(edge);
		}
	}
}
