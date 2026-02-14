import type { PrimativeDrawer } from '../primative/primative';

import { UndirectedEdge } from './undirected-edge';
import { p, Point } from '../point/point';
import { StandardUndirectedGraphAnimator } from './animator/standard-undirected-graph-animator';
import { StandardUndirectedGraph } from './standard-undirected-graph';
import { StandardDirectedGraph } from './standard-directed-graph';
import { DirectedEdge } from './directed-edge';
import { StandardDirectedGraphAnimator } from './animator/standard-directed-graph-animator';

const randomUndirectedWeightedFrom = (
	vertexLocations: Point[],
	edges: UndirectedEdge<number>[]
) => {
	return (primative: PrimativeDrawer, canvas: HTMLCanvasElement, weightsDisplayed: boolean) => {
		const graph = new StandardUndirectedGraph<number>();

		for (let i = 0; i < vertexLocations.length; i++) {
			graph.addVertex(i);
		}

		for (const edge of edges) {
			graph.addEdge(edge, Math.floor(Math.random() * 10) + 1);
		}

		const animator = new StandardUndirectedGraphAnimator(
			primative,
			canvas,
			graph,
			weightsDisplayed
		);

		for (let i = 0; i < vertexLocations.length; i++) {
			animator.setVertexLocation(i, vertexLocations[i]);
		}

		return animator;
	};
};

const randomDirectedWeightedFrom = (vertexLocations: Point[], edges: DirectedEdge<number>[]) => {
	return (primative: PrimativeDrawer, canvas: HTMLCanvasElement, weightsDisplayed: boolean) => {
		const graph = new StandardDirectedGraph<number>();

		for (let i = 0; i < vertexLocations.length; i++) {
			graph.addVertex(i);
		}

		for (const edge of edges) {
			const oriented = Math.random() > 0.5 ? edge : edge.reversed();
			graph.addEdge(oriented, Math.floor(Math.random() * 10) + 1);
			if (Math.random() < 0.2) {
				graph.addEdge(oriented.reversed(), Math.floor(Math.random() * 10) + 1);
			}
		}

		const animator = new StandardDirectedGraphAnimator(primative, canvas, graph, weightsDisplayed);

		for (let i = 0; i < vertexLocations.length; i++) {
			animator.setVertexLocation(i, vertexLocations[i]);
		}

		return animator;
	};
};

export const wally = randomUndirectedWeightedFrom(
	[
		p(121, 263),
		p(239, 68),
		p(275, 207),
		p(347, 358),
		p(417, 102),
		p(491, 241),
		p(528, 56),
		p(600, 200),
		p(636, 337),
		p(711, 60),
		p(773, 235)
	],
	[
		new UndirectedEdge(0, 1),
		new UndirectedEdge(0, 2),
		new UndirectedEdge(0, 3),
		new UndirectedEdge(1, 4),
		new UndirectedEdge(2, 4),
		new UndirectedEdge(3, 5),
		new UndirectedEdge(3, 8),
		new UndirectedEdge(4, 5),
		new UndirectedEdge(4, 6),
		new UndirectedEdge(5, 6),
		new UndirectedEdge(5, 8),
		new UndirectedEdge(6, 9),
		new UndirectedEdge(6, 10)
	]
);

export const connectedWally = randomUndirectedWeightedFrom(
	[
		p(121, 263),
		p(239, 68),
		p(275, 207),
		p(347, 358),
		p(417, 102),
		p(491, 241),
		p(528, 56),
		p(636, 337),
		p(711, 60),
		p(773, 235)
	],
	[
		new UndirectedEdge(0, 1),
		new UndirectedEdge(0, 2),
		new UndirectedEdge(0, 3),
		new UndirectedEdge(1, 4),
		new UndirectedEdge(2, 4),
		new UndirectedEdge(3, 5),
		new UndirectedEdge(3, 7),
		new UndirectedEdge(4, 5),
		new UndirectedEdge(4, 6),
		new UndirectedEdge(5, 6),
		new UndirectedEdge(5, 7),
		new UndirectedEdge(6, 8),
		new UndirectedEdge(6, 9)
	]
);

export const directedWally = randomDirectedWeightedFrom(
	[
		p(121, 263),
		p(239, 68),
		p(275, 207),
		p(347, 358),
		p(417, 102),
		p(491, 241),
		p(528, 56),
		p(600, 200),
		p(636, 337),
		p(711, 60),
		p(773, 235)
	],
	[
		new DirectedEdge(0, 1),
		new DirectedEdge(0, 2),
		new DirectedEdge(0, 3),
		new DirectedEdge(1, 4),
		new DirectedEdge(2, 4),
		new DirectedEdge(3, 5),
		new DirectedEdge(3, 8),
		new DirectedEdge(4, 5),
		new DirectedEdge(4, 6),
		new DirectedEdge(5, 6),
		new DirectedEdge(5, 8),
		new DirectedEdge(6, 9),
		new DirectedEdge(6, 10)
	]
);
