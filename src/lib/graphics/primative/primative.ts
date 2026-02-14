import type { Point } from '../point/point';

export interface PrimativeDrawer {
	getCanvasDimensions(): Point;

	drawLine(
		from: Point,
		to: Point,
		style: {
			stroke: string;
			strokeWidth: number;
		}
	): void;

	drawRect(
		topLeft: Point,
		bottomRight: Point,
		style: {
			fill: string;
			stroke: string;
			strokeWidth: number;
		}
	): void;

	drawCircle(
		at: Point,
		radius: number,
		style: {
			fill: string;
			stroke: string;
			strokeWidth: number;
		}
	): void;

	drawText(
		text: string,
		center: Point,
		style: {
			fill: string;
			stroke: string;
			strokeWidth: number;
		}
	): void;

	/* ideally, this would be replaced with more specialized
	 * functions in case the implemenator is not using the 2d context. */
	getContext(): CanvasRenderingContext2D;
}
