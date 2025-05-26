<script lang="ts">
	import { StructuredFigure } from './article';
	import { pretty } from './render';

	export let figure: StructuredFigure;
</script>

<svelte:component this={figure.svelteComponent.svelte} />
<div class="caption">
	{#await pretty(figure.caption) then t}
		<div class="algorithm-name-outer">
			<span class="algorithm-name-inner">
				<span class="title">
					Figure {figure.id}: {figure.name}
				</span>
			</span>
		</div>
		{@html t}
	{/await}
</div>

<style>
	.caption {
		max-width: 800px;
		margin: auto;
		font-size: 20px;
		color: gray;
		text-align: center;
	}

	.algorithm-name-inner {
		padding: 0 20px;
		border-bottom: solid gray 1px;
	}

	.title {
		font-variant: small-caps;
	}
</style>
