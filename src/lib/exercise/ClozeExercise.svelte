<script lang="ts">
	import type { Cloze } from './exercise';
	import { pretty } from '$lib/components/article/render';

	export let cloze: Cloze;
	export let onFinish: () => void

	let input: string = '';

	const keyDownEvent = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			submit();
		}
	};

	const submit = () => {
		if (input.toLowerCase() === cloze.cloze.toLowerCase()) {
			onFinish()
		}
	};
</script>

{#await pretty(cloze.preCloze) then pre}
	{#await pretty(cloze.postCloze) then post}
		<p class="question">
			<span>{@html pre}</span><span
				><input bind:value={input} on:keydown={keyDownEvent} type="text" style="width: {(cloze.cloze.length + 1.2) * 20}px;" /></span
			><span>{@html post}</span>
		</p>
	{/await}
{/await}

<style lang="scss">
	$font-size: 30px;
	.question {
		input {
			font-size: $font-size;
			font-family: Nunito;
		}
		font-size: $font-size;
	}
</style>
