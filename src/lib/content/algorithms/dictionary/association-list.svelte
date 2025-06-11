<script lang="ts">
	import type { PrimativeDrawer } from '$lib/graphics/primative/primative';

	import { Canvas2DPrimativeDrawer } from '$lib/graphics/primative/canvas2d-primative';
	import { onDestroy, onMount } from 'svelte';
	import { p, Point } from '$lib/graphics/point/point';
	import { MathAlign } from '$lib/graphics/math/math-renderer';
	import type { MathRenderer } from '$lib/graphics/math/math-renderer';
	import { KaTeXMathRenderer } from '$lib/graphics/math/katex-math-renderer';
	import { AnimatedPoint } from '$lib/graphics/point/animated-point';

	// @hmr:reset
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let primative: PrimativeDrawer;
	let entryRenderer: MathRenderer<number>;

	type Entry = {
		key: string;
		value: number;
	};

	let entryList: Entry[] = [
		{
			key: 'ghost',
			value: 7
		},
		{
			key: 'apple',
			value: -2
		},
		{
			key: 'berry',
			value: 6
		},
		{
			key: 'howdy',
			value: 7
		},
		{
			key: 'joust',
			value: 0
		}
	];

	let entryDims = 150;

	let getEntryPosition = (index: number): Point => {
		let left = (canvas.width - entryDims * entryList.length) / 2;
		let top = (canvas.height - entryDims) / 2;
		return p(left + (index + 1 / 2) * entryDims, top + entryDims / 2);
	};

	onMount(() => {
		context = canvas.getContext('2d');

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		primative = new Canvas2DPrimativeDrawer(canvas);
		entryRenderer = new KaTeXMathRenderer(canvas);

		for (let i = 0; i < entryList.length; i++) {
			let entry = entryList[i];
			entryRenderer.addElement(
				i,
				`(\\text{${entry.key}}, ${entry.value})`,
				getEntryPosition(i),
				{
					color: 'black'
				},
				MathAlign.CENTER
			);
		}

		arrowPosition = new AnimatedPoint(getEntryPosition(arrowIndex).add(p(0, entryDims)));

		draw(0);

		canvas.addEventListener('click', () => {
			arrowIndex = (arrowIndex + 1) % entryList.length;
		});
	});

	onDestroy(() => {
		entryRenderer.destroy();
	});

	let lastTime = 0;

	let arrowIndex = 0;
	let arrowPosition: AnimatedPoint;

	const draw = (time: number) => {
		let delta: number;
		if (lastTime > 0) {
			delta = (time - lastTime) / 1000;
		} else {
			delta = 0;
		}
		lastTime = time;
		context.clearRect(0, 0, canvas.width, canvas.height);

		entryRenderer.update(delta);
		arrowPosition.update(delta);

		for (let i = 0; i < entryList.length; i++) {
			primative.drawRect(
				getEntryPosition(i).add(p(-entryDims / 2, -entryDims / 2)),
				getEntryPosition(i).add(p(entryDims / 2, entryDims / 2)),
				{
					fill: 'white',
					stroke: '#555',
					strokeWidth: 5
				}
			);
		}

		arrowPosition.animateTo(getEntryPosition(arrowIndex).add(p(0, entryDims)));

		console.log(arrowIndex);

		primative.drawCircle(arrowPosition.getAnimatedPoint(), 10, {
			fill: 'black',
			stroke: 'black',
			strokeWidth: 0
		});

		requestAnimationFrame(draw);
	};
</script>

<canvas bind:this={canvas} />

<style lang="scss">
	canvas {
		width: 75%;
		height: 500px;
		margin: auto;
		display: block;
	}
</style>
