import { MathAlign, type MathRenderer } from '../../math/math-renderer';
import type { PrimativeDrawer } from '../../primative/primative';

import { KaTeXMathRenderer } from '../../math/katex-math-renderer';
import { p, Point } from '../../point/point';
import { AnimatedColor } from '../color/animated-color';
import { Color, lighten } from '../color/color';
import type { DirectedGraphAnimator } from './directed-graph-animator';
import { DirectedEdge } from '../directed-edge';
import type { DirectedGraph } from '../directed-graph';

export const NODE_RADIUS = 30;

export class StandardDirectedGraphAnimator<V> implements DirectedGraphAnimator<V> {
	private locationMap: Map<V, Point>;
	private edgeColorMap: Map<string, AnimatedColor>;
	private vertexColorMap: Map<V, AnimatedColor>;
	private vertexLabelRenderer: MathRenderer<V>;

	constructor(
		private primative: PrimativeDrawer,
		private canvas: HTMLCanvasElement,
		private graph: DirectedGraph<V>,
		private showWeights: boolean = true
	) {
		this.locationMap = new Map();
		this.edgeColorMap = new Map();
		this.vertexColorMap = new Map();
		this.vertexLabelRenderer = new KaTeXMathRenderer(canvas);
		for (const v of graph.getAllVertices()) {
			this.vertexColorMap.set(v, new AnimatedColor(new Color(0, 0, 0)));
			this.vertexLabelRenderer.addElement(
				v,
				`v_{${v}}`,
				p(0, 0),
				{ color: 'white' },
				MathAlign.CENTER
			);
		}
		for (const e of graph.getAllEdges()) {
			this.edgeColorMap.set(e.toString(), new AnimatedColor(new Color(0, 0, 0)));
		}
	}

	colorVertex(v: V, color: Color): void {
		this.vertexColorMap.get(v).animateTo(color);
	}

	colorEdge(e: DirectedEdge<V>, color: Color): void {
		this.edgeColorMap.get(e.toString()).animateTo(color);
	}

	getVertexLocation(v: V): Point {
		return this.locationMap.get(v);
	}

	setVertexLocation(v: V, p: Point): void {
		this.locationMap.set(v, p);
		this.vertexLabelRenderer.moveElement(v, p);
	}

	update(delta: number): void {
		for (const edge of this.graph.getAllEdges()) {
			this.edgeColorMap.get(edge.toString()).update(delta);
		}

		for (const v of this.graph.getAllVertices()) {
			this.vertexColorMap.get(v).update(delta);
		}

		this.vertexLabelRenderer.update(delta);
	}

	draw(): void {
		for (const edge of this.graph.getAllEdges()) {
			const u = edge.getFrom();
			const v = edge.getTo();

			const edgeColor = this.edgeColorMap.get(edge.toString());
			const edgeWeight = this.graph.getWeight(edge);

			const uLocation = this.locationMap.get(u);
			const vLocation = this.locationMap.get(v);

			if (this.graph.hasEdge(edge.reversed())) {
				const ctx = this.primative.getContext();

				ctx.save();

				const length = vLocation.add(uLocation.multiply(-1)).length();
				const angle = Math.atan2(vLocation.y - uLocation.y, vLocation.x - uLocation.x);

				ctx.translate(uLocation.x, uLocation.y);
				ctx.rotate(angle);

				const strokeOptions = {
					stroke: lighten(edgeColor.getAnimatedColor()).toString(),
					strokeWidth: 10
				};

				const arrowLength = 20;

				ctx.strokeStyle = strokeOptions.stroke;
				ctx.lineWidth = strokeOptions.strokeWidth;

				ctx.beginPath();
				ctx.moveTo(0, 0);
				ctx.quadraticCurveTo(length / 2, length / 2, length, 0);
				ctx.stroke();

				// this.primative.drawLine(p(0, 0), p(length, 0), strokeOptions);

				ctx.translate(length, 0);
				ctx.rotate(-0.7);

				this.primative.drawLine(p(-35, 0), p(-35 - arrowLength, 0 - arrowLength), strokeOptions);
				this.primative.drawLine(p(-35, 0), p(-35 - arrowLength, 0 + arrowLength), strokeOptions);

				ctx.restore();
			} else {
				const ctx = this.primative.getContext();

				ctx.save();

				const length = vLocation.add(uLocation.multiply(-1)).length();
				const angle = Math.atan2(vLocation.y - uLocation.y, vLocation.x - uLocation.x);

				ctx.translate(uLocation.x, uLocation.y);
				ctx.rotate(angle);

				const strokeOptions = {
					stroke: lighten(edgeColor.getAnimatedColor()).toString(),
					strokeWidth: 10
				};

				const arrowLength = 20;

				this.primative.drawLine(p(0, 0), p(length, 0), strokeOptions);
				this.primative.drawLine(
					p(length - 35, 0),
					p(length - 35 - arrowLength, 0 - arrowLength),
					strokeOptions
				);
				this.primative.drawLine(
					p(length - 35, 0),
					p(length - 35 - arrowLength, 0 + arrowLength),
					strokeOptions
				);

				ctx.restore();
			}

			if (this.showWeights) {
				const center = uLocation.add(vLocation).multiply(1 / 2);

				const diff = vLocation.add(uLocation.multiply(-1));

				let offset = p(diff.y, -diff.x);
				offset = offset.multiply((1 / offset.length()) * 20);

				if (offset.y > 0) {
					offset = offset.multiply(-1);
				}

				this.primative.drawText(edgeWeight.toString(), center.add(offset), {
					fill: edgeColor.getAnimatedColor().toString(),
					stroke: edgeColor.getAnimatedColor().toString(),
					strokeWidth: 0.001
				});
			}
		}

		for (const v of this.graph.getAllVertices()) {
			this.primative.drawCircle(this.locationMap.get(v), NODE_RADIUS, {
				fill: this.vertexColorMap.get(v).getAnimatedColor().toString(),
				stroke: lighten(this.vertexColorMap.get(v).getAnimatedColor()).toString(),
				strokeWidth: 5
			});
		}
	}

	getGraph(): DirectedGraph<V> {
		return this.graph;
	}

	getCanvas(): HTMLCanvasElement {
		return this.canvas;
	}

	destroy(): void {
		this.vertexLabelRenderer.destroy();
	}
}
