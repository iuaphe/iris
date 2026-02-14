import { UndirectedEdge } from './undirected-edge';

/**
 * This represents a mathematical graph that is
 * weighted and undirected.
 *
 * More precisely, this represents a graph G = (V, E)
 * equipped with a function w: E -> Real.
 */
export interface UndirectedGraph<V> {
	addVertex(v: V): void;
	addEdge(edge: UndirectedEdge<V>, weight: number): void;
	getAdjacent(v: V): UndirectedEdge<V>[];
	hasEdge(edge: UndirectedEdge<V>): boolean;

	getAllVertices(): Set<V>;
	getAllEdges(): UndirectedEdge<V>[];

	getWeight(e: UndirectedEdge<V>): number;
	setWeight(e: UndirectedEdge<V>, weight: number): void;
}
