import type { GraphInteractor } from '$lib/graphics/graph/interactor/graph-interactor';
import type { UndirectedGraphAnimator } from '$lib/graphics/graph/animator/undirected-graph-animator';
import type { UndirectedGraph } from '$lib/graphics/graph/undirected-graph';
import { MathAlign, type MathRenderer } from '$lib/graphics/math/math-renderer';
import type { PrimativeDrawer } from '$lib/graphics/primative/primative';

import { Color } from '$lib/graphics/graph/color/color';
import { StandardGraphInteractor } from '$lib/graphics/graph/interactor/standard-graph-interactor';
import { p } from '$lib/graphics/point/point';
import { KaTeXMathRenderer } from '$lib/graphics/math/katex-math-renderer';
import { UndirectedEdge } from '$lib/graphics/graph/undirected-edge';

import confetti from 'canvas-confetti';

const AMBIENT_COLOR = new Color(87, 87, 87);
const HOVER_COLOR = new Color(255, 100, 0);
const ACTIVE_COLOR = new Color(13, 122, 255);
const INCORRECT_COLOR = new Color(255, 0, 0);

export class QuickCheckTerms {
	graph: UndirectedGraph<number>;
	interactor: GraphInteractor<number>;
	hoverVertex: number | undefined;
	listLabels: MathRenderer<number>;

	incorrect: Set<number>;

	level = 0;
	second = 0;
	third = 0;

	constructor(
		private primative: PrimativeDrawer,
		private animator: UndirectedGraphAnimator<number>
	) {
		this.graph = animator.getGraph();
		this.interactor = new StandardGraphInteractor(animator);
		this.hoverVertex = undefined;

		this.listLabels = new KaTeXMathRenderer(animator.getCanvas());

		this.listLabels.addElement(0, '', p(1000, 100), { color: 'black' }, MathAlign.CENTER);

		this.interactor.handleClickVertex((v) => {
			if (this.level === 0) {
				if (v === 5) {
					this.switchLevel(1);
				} else {
					this.markIncorrect(v);
				}
			} else if (this.level === 1) {
				if (this.graph.hasEdge(new UndirectedEdge(5, v))) {
					this.second = v;
					this.switchLevel(2);
				} else {
					this.markIncorrect(v);
				}
			} else {
				if (
					this.graph.hasEdge(new UndirectedEdge(5, v)) &&
					this.graph.hasEdge(new UndirectedEdge(this.second, v))
				) {
					this.third = v;
					this.switchLevel(3);
					confetti();
				} else {
					this.markIncorrect(v);
				}
			}
		});

		this.incorrect = new Set();
	}

	private updateLabel(s: string) {
		this.listLabels.setElementText(0, s);
	}

	private switchLevel(n: number) {
		this.level = n;
		this.incorrect = new Set();
	}

	private markIncorrect(v: number) {
		this.incorrect.add(v);
	}

	update(delta: number): void {
		this.animator.update(delta);
		this.interactor.update(delta);
		this.listLabels.update(delta);
		this.hoverVertex = this.interactor.getHoverVertex();

		if (this.level === 0) {
			this.updateLabel('\\text{Choose } v_5 \\text{.}');
		} else if (this.level === 1) {
			this.updateLabel('\\text{Choose a neighbor of } v_5 \\text{.}');
		} else if (this.level === 2) {
			this.updateLabel(
				`\\text{Choose a vertex adjacent to both } v_5 \\text{ and } v_${this.second} \\text{.}`
			);
		} else {
			this.updateLabel(`\\text{Nice!}`);
		}
	}

	draw(): void {
		for (const vertex of this.graph.getAllVertices()) {
			this.animator.colorVertex(vertex, AMBIENT_COLOR);
		}

		for (const edge of this.graph.getAllEdges()) {
			this.animator.colorEdge(edge, AMBIENT_COLOR);
		}

		if (this.hoverVertex !== undefined) {
			this.animator.colorVertex(this.hoverVertex, HOVER_COLOR);
		}

		for (const vertex of this.graph.getAllVertices()) {
			if (this.incorrect.has(vertex)) {
				this.animator.colorVertex(vertex, INCORRECT_COLOR);
			}
		}

		if (this.level === 1) {
			this.animator.colorVertex(5, ACTIVE_COLOR);
		} else if (this.level === 2) {
			this.animator.colorVertex(5, ACTIVE_COLOR);
			this.animator.colorEdge(new UndirectedEdge(5, this.second), ACTIVE_COLOR);
			this.animator.colorVertex(this.second, ACTIVE_COLOR);
		} else if (this.level === 3) {
			this.animator.colorVertex(5, ACTIVE_COLOR);
			this.animator.colorEdge(new UndirectedEdge(5, this.second), ACTIVE_COLOR);
			this.animator.colorVertex(this.second, ACTIVE_COLOR);
			this.animator.colorEdge(new UndirectedEdge(this.second, this.third), ACTIVE_COLOR);
			this.animator.colorVertex(this.third, ACTIVE_COLOR);
			this.animator.colorEdge(new UndirectedEdge(this.third, 5), ACTIVE_COLOR);
		}

		this.animator.draw();
	}

	destroy(): void {
		this.listLabels.destroy();
	}
}
