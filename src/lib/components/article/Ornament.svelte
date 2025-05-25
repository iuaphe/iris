<script lang="ts">
	import { onMount } from 'svelte';
	import { ornamentData } from './article';
	import type { AlgorithmOrnament } from './article';

	export let ornament: AlgorithmOrnament;
	let element: HTMLSpanElement;

	let hovering = false;
	let infoBox: HTMLDivElement;

	onMount(() => {
		element.addEventListener('mouseenter', () => {
			hovering = true;
		});

		element.addEventListener('mouseleave', () => {
			hovering = false;
		});

		// infoBox.parentElement.removeChild(infoBox);
		// document.body.appendChild(infoBox);

		window.addEventListener('mousemove', (e) => {
			if (hovering) {
				infoBox.style.transform = `translate(${e.clientX + 10}px, ${
					e.clientY + 10 + window.scrollY
				}px)`;
			}
		});
	});
</script>

<span>
	<!-- todo: attribute turtle to https://www.flaticon.com/free-icon/turtle_3077421?term=turtle&page=1&position=4&origin=search&related_id=3077421, or replace it. -->
	<img
		bind:this={element}
		src="/icons/{ornament.type}.svg"
		height="20px"
		alt={ornamentData[ornament.type].iconAltText}
	/>
</span>

{#if hovering}
	<div bind:this={infoBox} class="info">
		<div class="short-desc">{ornamentData[ornament.type].shortDescription}</div>
		<!-- <div class="more-info">(click for more info)</div> -->
	</div>
{/if}

<style>
	img {
		display: inline;
		vertical-align: middle;
	}

	.info {
		position: absolute;
		left: 0px;
		top: 0px;
		background-color: black;
		color: white;
		border-radius: 10px;
		padding: 10px;
		text-align: center;
		z-index: 100;
	}

	.more-info {
		color: gray;
	}
</style>
