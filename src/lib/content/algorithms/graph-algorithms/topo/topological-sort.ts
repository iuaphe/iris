import { DirectedGraphAnimator } from '$lib/graphics/graph/animator/directed-graph-animator';
import type { GraphInteractor } from '$lib/graphics/graph/interactor/graph-interactor';
import { StandardGraphInteractor } from '$lib/graphics/graph/interactor/standard-graph-interactor';

export class DependencyGraph {
	interactor: GraphInteractor<number>;
	addedEdge: [number, number] | undefined;

	constructor(private animator: DirectedGraphAnimator<number>) {
		this.interactor = new StandardGraphInteractor(animator);
	}

	update(delta: number): void {
		this.animator.update(delta);
		this.interactor.update(delta);
	}

	draw(): void {
		this.animator.draw();
	}
}
