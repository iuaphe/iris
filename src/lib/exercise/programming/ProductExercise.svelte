<script lang="ts">
	import { newTunnel, Tunnel } from '$lib/tunnel';
	import confetti from 'canvas-confetti';
	import { onMount } from 'svelte';

	let tunnel: Tunnel;
	let name: string;
	let x: number;
	let y: number;
	let result: number | undefined;

	type ResponseType =
		| {
				type: 'request-problem';
		  }
		| {
				type: 'answer';
				answer: number;
		  }
		| {
				type: 'confetti';
				position: { x: number; y: number };
		  };

	onMount(async () => {
		x = Math.floor(Math.random() * 100);
		y = Math.floor(Math.random() * 100);
		[tunnel, name] = await newTunnel();
		tunnel.onMessage((obj: ResponseType) => {
			if (obj.type === 'request-problem') {
				tunnel.send({
					type: 'problem',
					params: { x, y }
				});
			} else if (obj.type === 'answer') {
				result = obj.answer;
			} else if (obj.type === 'confetti') {
				confetti({
					origin: {
						x: obj.position.x,
						y: obj.position.y
					}
				});
			}
		});
	});
</script>

<p><em>Tunnel code: </em><strong class="mono">{name}</strong></p>
<p>You are given two integers, x and y. Return their product, x * y.</p>
<p>Inputs: x = {x}, y = {y}</p>
{#if result !== undefined}
	<p>Returned: {result}</p>
{/if}

<style>
	.mono {
		font-family: monospace;
	}
</style>
