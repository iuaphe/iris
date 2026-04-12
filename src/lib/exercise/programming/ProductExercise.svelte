<script lang="ts">
	import { newTunnel, Tunnel } from '$lib/zephyr/tunnel';
	import { ZephyrChallenger } from '$lib/zephyr/zephyr';
	import { onMount } from 'svelte';

	let tunnel: Tunnel;
	let name: string;
	let cases: {
		x: number;
		y: number;
		expected: number;
		actual: number;
	}[] = [];

	type ProductFunction = {
		params: { x: number; y: number };
		return: number;
	};

	onMount(async () => {
		[tunnel, name] = await newTunnel();
		let zephyr = new ZephyrChallenger(tunnel);

		while (true) {
			let product = await zephyr.waitForFunction<ProductFunction>('product');

			cases = [];

			for (let i = 0; i < 10; i++) {
				let x = Math.floor(Math.random() * 100);
				let y = Math.floor(Math.random() * 100);

				let expected = x * y;
				let actual = await product({ x, y });

				const c = {
					x,
					y,
					expected,
					actual
				};

				cases = [...cases, c];

				console.debug(x, y, expected, actual);
			}
		}
	});
</script>

<p><em>Tunnel code: </em><strong class="mono">{name}</strong></p>
<p>You are given two integers, x and y. Return their product, x * y.</p>
{#each cases as c}
	{#if c.actual === c.expected}
		<p>
			{c.x} * {c.y} = {c.actual}
		</p>
	{:else}
		<p>
			{c.x} * {c.y} != {c.actual}
		</p>
	{/if}
{/each}

<style>
	.mono {
		font-family: monospace;
	}
</style>
