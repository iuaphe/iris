import { DirectedEdge } from './directed-edge';

/**
 * This represents a mathematical graph that is
 * weighted and directed.
 *
 * More precisely, this represents a graph G = (V, E)
 * equipped with a function w: E -> Real.
 */
export interface DirectedGraph<V> {
	addVertex(v: V): void;
	addEdge(edge: DirectedEdge<V>, weight: number): void;
	getAdjacent(v: V): DirectedEdge<V>[];
	hasEdge(edge: DirectedEdge<V>): boolean;

	getAllVertices(): Set<V>;
	getAllEdges(): DirectedEdge<V>[];

	getWeight(e: DirectedEdge<V>): number;
	setWeight(e: DirectedEdge<V>, weight: number): void;
}
