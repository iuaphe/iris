import { DirectedEdge } from './directed-edge';
import type { DirectedGraph } from './directed-graph';

export class StandardDirectedGraph<V> implements DirectedGraph<V> {
	private vertexSet: Set<V>;
	/**
	 * adj : V -> E, where adj(u) is the set of directed edges with u as a head.
	 */
	private adjMap: Map<V, DirectedEdge<V>[]>;
	/**
	 * weight : E -> Real, representing the weight of each edge.
	 */
	private weightMap: Map<string, number>;

	constructor() {
		this.vertexSet = new Set();
		this.adjMap = new Map();
		this.weightMap = new Map();
	}

	hasEdge(edge: DirectedEdge<V>): boolean {
		const head = edge.getFrom();
		return this.adjMap.get(head).some((e) => edge.identical(e));
	}

	addVertex(v: V): void {
		this.vertexSet.add(v);
		this.adjMap.set(v, []);
	}

	addEdge(edge: DirectedEdge<V>, weight: number): void {
		this.adjMap.get(edge.getFrom()).push(edge);
		this.weightMap.set(edge.toString(), weight);
	}

	getAdjacent(v: V): DirectedEdge<V>[] {
		return this.adjMap.get(v);
	}

	getAllVertices(): Set<V> {
		return this.vertexSet;
	}

	getAllEdges(): DirectedEdge<V>[] {
		return [...this.adjMap.values()].flat();
	}

	getWeight(e: DirectedEdge<V>): number {
		return this.weightMap.get(e.toString());
	}

	setWeight(e: DirectedEdge<V>, weight: number): void {
		this.weightMap.set(e.toString(), weight);
	}
}
