import { Color } from '$lib/graphics/graph/color/color';
import type { UndirectedGraphAnimator } from '$lib/graphics/graph/animator/undirected-graph-animator';
import type { Algorithm } from '../../algorithm';
import { UndirectedEdge } from '$lib/graphics/graph/undirected-edge';
import { NaiveUnionFind, type SetId, type UnionFind } from '$lib/util/union-find';

const VISITED_COLOR = new Color(201, 83, 112);
const DONE_COLOR = new Color(230, 230, 230);

export class KruskalsMSTAlgorithm<T> implements Algorithm<T> {
	private graph: UndirectedGraphAnimator<T>;
	public tree: Set<UndirectedEdge<T>>;
	private components: UnionFind<T>;
	private colorMap: Map<SetId, Color>;
	private remainingEdges: UndirectedEdge<T>[];

	constructor(graph: UndirectedGraphAnimator<T>, private componentColors: boolean) {
		this.graph = graph;
	}

	public initalize(): void {
		this.tree = new Set();
		this.components = new NaiveUnionFind();
		this.remainingEdges = [...this.graph.getGraph().getAllEdges()];
		this.remainingEdges.sort(
			(e1, e2) => -(this.graph.getGraph().getWeight(e1) - this.graph.getGraph().getWeight(e2))
		);

		this.colorMap = new Map();
		for (const vertex of this.graph.getGraph().getAllVertices()) {
			this.components.makeSet(vertex);
			const color = new Color(
				Math.floor(Math.random() * 256),
				Math.floor(Math.random() * 256),
				Math.floor(Math.random() * 256)
			);
			this.colorMap.set(this.components.find(vertex), color);
			this.graph.colorVertex(vertex, VISITED_COLOR);
		}
		if (this.componentColors) {
			this.updateColors();
		}
	}

	public hasTerminated() {
		return this.remainingEdges.length === 0;
	}

	private updateColors() {
		for (const vertex of this.graph.getGraph().getAllVertices()) {
			this.graph.colorVertex(vertex, this.colorMap.get(this.components.find(vertex)));
		}
		for (const edge of this.tree) {
			this.graph.colorEdge(edge, this.colorMap.get(this.components.find(edge.getFrom())));
		}
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
		if (this.componentColors) {
			this.updateColors();
		}
	}
}
