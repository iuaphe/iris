import type { Point } from '../../point/point';
import type { Color } from '../color/color';
import type { UndirectedGraph } from '../undirected-graph';
import { UndirectedEdge } from '../undirected-edge';

/**
 * This class represents a graph drawing. Each vertex
 * is associated with a physical location in the canvas
 * and vertices and edges are associated with colors. These
 * colors are slowly animated after each change.
 */
export interface UndirectedGraphAnimator<V> {
	/**
	 * Set the color of a vertex in the drawing.
	 */
	colorVertex(v: V, color: Color): void;

	/**
	 * Set the color of an edge in the drawing.
	 */
	colorEdge(e: UndirectedEdge<V>, color: Color): void;

	/**
	 * Get the canvas location of a vertex.
	 */
	getVertexLocation(v: V): Point;

	/**
	 * Update the canvas location of a vertex.
	 */
	setVertexLocation(v: V, location: Point): void;

	/**
	 * Get the canvas that this graph is being drawn onto.
	 */
	getCanvas(): HTMLCanvasElement;

	getGraph(): UndirectedGraph<V>;

	update(delta: number): void;
	draw(): void;
	destroy(): void;
}
