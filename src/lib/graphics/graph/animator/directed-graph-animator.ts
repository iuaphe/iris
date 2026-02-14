import type { Point } from '../../point/point';
import type { Color } from '../color/color';
import { DirectedEdge } from '../directed-edge';
import type { DirectedGraph } from '../directed-graph';

/**
 * This class represents a graph drawing. Each vertex
 * is associated with a physical location in the canvas
 * and vertices and edges are associated with colors. These
 * colors are slowly animated after each change.
 */
export interface DirectedGraphAnimator<V> {
	/**
	 * Set the color of a vertex in the drawing.
	 */
	colorVertex(v: V, color: Color): void;

	/**
	 * Set the color of an edge in the drawing.
	 */
	colorEdge(e: DirectedEdge<V>, color: Color): void;

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

	getGraph(): DirectedGraph<V>;

	update(delta: number): void;
	draw(): void;
	destroy(): void;
}
