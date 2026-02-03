<script lang="ts">
	import type { GraphAnimator } from '$lib/graphics/graph/animator/graph-animator';
	import type { PrimativeDrawer } from '$lib/graphics/primative/primative';

	import { Canvas2DPrimativeDrawer } from '$lib/graphics/primative/canvas2d-primative';
	import { onDestroy, onMount } from 'svelte';
	import { SpanningTrees } from './mst/spanning-trees';
	import { connectedWally, wally } from '$lib/graphics/graph/presets';

	// @hmr:reset
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let primative: PrimativeDrawer;
	let graph: GraphAnimator<number>;
	let generator: SpanningTrees;

	let weight: number | undefined;

	onMount(() => {
		context = canvas.getContext('2d');

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		primative = new Canvas2DPrimativeDrawer(canvas);
		graph = connectedWally(primative, canvas, true);

		generator = new SpanningTrees(graph);

		generator.initialize();

		draw(0);

		canvas.addEventListener('click', (event) => {
			generator.generateNew();
			weight = generator.getWeight();
		});

		canvas.addEventListener('contextmenu', (e) => {
			e.preventDefault();
			generator.generateNewMinimum();
			weight = generator.getWeight();
		});
	});

	onDestroy(() => {
		graph?.destroy();
	});

	let lastTime = 0;

	const draw = (time: number) => {
		let delta: number;
		if (lastTime > 0) {
			delta = (time - lastTime) / 1000;
		} else {
			delta = 0;
		}
		lastTime = time;

		context.clearRect(0, 0, canvas.width, canvas.height);

		graph.update(delta);
		graph.draw();

		requestAnimationFrame(draw);
	};
</script>

<canvas bind:this={canvas} />

{#if weight !== undefined}
	<p>Spanning tree weight: {weight}</p>
{/if}

<style lang="scss">
	canvas {
		width: 75%;
		height: 500px;
		margin: auto;
		display: block;
	}
	p {
		text-align: center;
		font-size: 30px;
		color: rgb(201, 83, 112);
	}
</style>
