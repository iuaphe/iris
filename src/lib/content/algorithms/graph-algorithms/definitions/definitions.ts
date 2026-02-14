import type { GraphInteractor } from '$lib/graphics/graph/interactor/graph-interactor';
import type { UndirectedGraphAnimator } from '$lib/graphics/graph/animator/undirected-graph-animator';
import type { UndirectedGraph } from '$lib/graphics/graph/undirected-graph';
import type { PrimativeDrawer } from '$lib/graphics/primative/primative';

import { Color } from '$lib/graphics/graph/color/color';
import { StandardGraphInteractor } from '$lib/graphics/graph/interactor/standard-graph-interactor';
import { UndirectedEdge } from '$lib/graphics/graph/undirected-edge';

const AMBIENT_COLOR = new Color(87, 87, 87);
const ADJACENT_COLOR = new Color(255, 100, 0);
const INCIDENT_COLOR = new Color(162, 70, 212);

export class Definitions {
	graph: UndirectedGraph<number>;
	interactor: GraphInteractor<number>;
	hoverVertex: number | undefined;
	hoverEdge: [number, number] | undefined;

	constructor(
		private primative: PrimativeDrawer,
		private animator: UndirectedGraphAnimator<number>
	) {
		this.graph = animator.getGraph();
		this.interactor = new StandardGraphInteractor(animator);
		this.hoverVertex = undefined;
	}

	update(delta: number): void {
		this.animator.update(delta);
		this.interactor.update(delta);
		this.hoverVertex = this.interactor.getHoverVertex();
		this.hoverEdge = this.interactor.getHoverEdge();
	}

	draw(): void {
		for (const vertex of this.graph.getAllVertices()) {
			this.animator.colorVertex(vertex, AMBIENT_COLOR);
		}

		for (const edge of this.graph.getAllEdges()) {
			this.animator.colorEdge(edge, AMBIENT_COLOR);
		}

		if (this.hoverVertex !== undefined) {
			this.animator.colorVertex(this.hoverVertex, ADJACENT_COLOR);
			for (const edge of this.graph.getAdjacent(this.hoverVertex)) {
				this.animator.colorEdge(edge, ADJACENT_COLOR);
				this.animator.colorVertex(edge.getTo(), ADJACENT_COLOR);
			}
		} else if (this.hoverEdge !== undefined) {
			this.animator.colorVertex(this.hoverEdge[0], INCIDENT_COLOR);
			this.animator.colorVertex(this.hoverEdge[1], INCIDENT_COLOR);
			this.animator.colorEdge(new UndirectedEdge(...this.hoverEdge), INCIDENT_COLOR);
		}

		this.animator.draw();
	}

	destroy(): void {
		//
	}
}
