<script lang="ts">
	import Psuedocode from '../Psuedocode.svelte';
	import { StructuredAlgorithm } from './article';
	import { pretty } from './render';
	import Ornament from './Ornament.svelte';

	export let algorithm: StructuredAlgorithm;
</script>

<Psuedocode fn={algorithm.alg} />
<div class="caption">
	{#await pretty(algorithm.caption) then t}
		<div class="algorithm-name-outer">
			<span class="algorithm-name-inner">
				<span class="title">
					Algorithm {algorithm.id}: {algorithm.name}
				</span>
				{#each algorithm.extras.ornaments as ornament}
					<Ornament {ornament} />
				{/each}
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
