import type { PrimativeDrawer } from '../primative/primative';

import { Edge } from './edge';
import { p, Point } from '../point/point';
import { StandardGraphAnimator } from './animator/standard-graph-animator';
import { StandardGraph } from './standard-graph';

const randomWeightedFrom = (vertexLocations: Point[], edges: Edge<number>[]) => {
	return (primative: PrimativeDrawer, canvas: HTMLCanvasElement, weightsDisplayed: boolean) => {
		const graph = new StandardGraph<number>();

		for (let i = 0; i < vertexLocations.length; i++) {
			graph.addVertex(i);
		}

		for (const edge of edges) {
			graph.addEdge(edge, Math.floor(Math.random() * 10) + 1);
		}

		const animator = new StandardGraphAnimator(primative, canvas, graph, weightsDisplayed);

		for (let i = 0; i < vertexLocations.length; i++) {
			animator.setVertexLocation(i, vertexLocations[i]);
		}

		return animator;
	};
};

export const wally = randomWeightedFrom(
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
		new Edge(0, 1),
		new Edge(0, 2),
		new Edge(0, 3),
		new Edge(1, 4),
		new Edge(2, 4),
		new Edge(3, 5),
		new Edge(3, 8),
		new Edge(4, 5),
		new Edge(4, 6),
		new Edge(5, 6),
		new Edge(5, 8),
		new Edge(6, 9),
		new Edge(6, 10)
	]
);

export const connectedWally = randomWeightedFrom(
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
		new Edge(0, 1),
		new Edge(0, 2),
		new Edge(0, 3),
		new Edge(1, 4),
		new Edge(2, 4),
		new Edge(3, 5),
		new Edge(3, 7),
		new Edge(4, 5),
		new Edge(4, 6),
		new Edge(5, 6),
		new Edge(5, 7),
		new Edge(6, 8),
		new Edge(6, 9)
	]
);
