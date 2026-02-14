import type { UndirectedGraph } from './undirected-graph';
import { UndirectedEdge } from './undirected-edge';
import { UndirectedEdgeMap } from './edge-map';

export class StandardUndirectedGraph<V> implements UndirectedGraph<V> {
	private vertexSet: Set<V>;
	private adjMap: Map<V, UndirectedEdge<V>[]>;
	private weightMap: UndirectedEdgeMap<V, number>;

	constructor() {
		this.vertexSet = new Set();
		this.adjMap = new Map();
		this.weightMap = new UndirectedEdgeMap();
	}

	hasEdge(edge: UndirectedEdge<V>): boolean {
		const fromList = this.adjMap.get(edge.getFrom());
		const toList = this.adjMap.get(edge.getTo());
		if (fromList.length < toList.length) {
			return fromList.some((e) => e.getFrom() === edge.getFrom() && e.getTo() == edge.getTo());
		} else {
			const reversed = edge.reversed();
			return toList.some(
				(e) => e.getFrom() === reversed.getFrom() && e.getTo() == reversed.getTo()
			);
		}
	}

	addVertex(v: V): void {
		this.vertexSet.add(v);
		this.adjMap.set(v, []);
	}

	addEdge(edge: UndirectedEdge<V>, weight: number): void {
		this.adjMap.get(edge.getFrom()).push(edge);
		this.adjMap.get(edge.getTo()).push(edge.reversed());
		this.weightMap.set(edge, weight);
		this.weightMap.set(edge.reversed(), weight);
	}

	getAdjacent(v: V): UndirectedEdge<V>[] {
		return this.adjMap.get(v);
	}

	getAllVertices(): Set<V> {
		return this.vertexSet;
	}

	getAllEdges(): UndirectedEdge<V>[] {
		return [...this.adjMap.values()].flat().filter((e) => e.getFrom() < e.getTo());
	}

	getWeight(e: UndirectedEdge<V>): number {
		return this.weightMap.get(e);
	}

	setWeight(e: UndirectedEdge<V>, weight: number): void {
		this.weightMap.set(e, weight);
		this.weightMap.set(e.reversed(), weight);
	}
}
