<script lang="ts">
	import { StructuredArticleElementType } from './article';
	import type { StructuredAlgorithm, SturcturedArticleElement } from './article';
	import { onMount } from 'svelte';

	import Dropdown from './Dropdown.svelte';
	import { pretty } from './render';
	import TextContent from './TextContent.svelte';

	import katex from 'katex';
	import Algorithm from './Algorithm.svelte';
	import Figure from './Figure.svelte';
	import { validate_component } from 'svelte/internal';

	export let elements: SturcturedArticleElement[];

	onMount(() => {});
</script>

{#each elements as element}
	{#if element.type === StructuredArticleElementType.SECTION}
		{#await pretty(element.value.sectionText) then t}
			{#if element.value.sectionType === 0}
				<h1>{@html t}</h1>
			{:else if element.value.sectionType === 1}
				<h2>{@html t}</h2>
			{:else if element.value.sectionType === 2}
				<h3>{@html t}</h3>
			{:else}
				<h4>{@html t}</h4>
			{/if}
			<svelte:self elements={element.value.children} />
		{/await}
	{:else if element.type === StructuredArticleElementType.PARAGRAPH}
		<p>
			<TextContent parts={element.value.paragraph.parts} />
		</p>
	{:else if element.type === StructuredArticleElementType.LIST}
		<ul>
			{#each element.value.list.elements as li}
				<li>
					<TextContent parts={li.parts} />
				</li>
			{/each}
		</ul>
	{:else if element.type === StructuredArticleElementType.BLOCK_MATH}
		{@html katex.renderToString(element.value.blockMath.lines.join('\\'), { displayMode: true })}
	{:else if element.type === StructuredArticleElementType.FIGURE}
		<Figure figure={element.value} />
	{:else if element.type === StructuredArticleElementType.ALGORITHM}
		<Algorithm algorithm={element.value} />
	{:else if element.type === StructuredArticleElementType.DROPDOWN_SECTION}
		{#await pretty(element.value.title) then t}
			<Dropdown title={t}>
				<svelte:self elements={element.value.elements} />
			</Dropdown>
		{/await}
	{/if}
{/each}

<style lang="scss">
	.caption {
		max-width: 800px;
		margin: auto;
		font-size: 20px;
		color: gray;
		text-align: center;
	}
</style>
