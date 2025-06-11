import { Point } from './point';

const ANIMATION_SPEED = 0.05;

export class AnimatedPoint {
	private currentPoint: Point;
	private toPoint: Point;

	constructor(initialPoint: Point) {
		this.currentPoint = initialPoint;
		this.toPoint = initialPoint;
	}

	animateTo(newPoint: Point): void {
		this.toPoint = newPoint;
	}

	getAnimatedPoint(): Point {
		return this.currentPoint;
	}

	update(_delta: number): void {
		this.currentPoint.x += (this.toPoint.x - this.currentPoint.x) * ANIMATION_SPEED;
		this.currentPoint.y += (this.toPoint.y - this.currentPoint.y) * ANIMATION_SPEED;
	}
}
