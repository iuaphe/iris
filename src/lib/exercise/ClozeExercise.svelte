<script lang="ts">
	import type { Cloze } from './exercise';
	import { pretty } from '$lib/components/article/render';

	export let cloze: Cloze;
	export let onFinish: () => void

	let input: string = '';
	let attempted: boolean = false

	const keyDownEvent = (event: KeyboardEvent) => {
		attempted = false;
		if (event.key === 'Enter') {
			submit();
		}
	};

	const submit = () => {
		if (cloze.cloze.map(c => c.toLowerCase()).includes(input.toLowerCase())) {
			onFinish()
		} else {
			attempted = true;
		}
	};

	const reveal = () => {
		attempted = false;
		input = cloze.cloze[0]
	}
</script>

{#await pretty(cloze.preCloze) then pre}
	{#await pretty(cloze.postCloze) then post}
		<p class="question">
			<span>{@html pre}</span><span
				><input class:incorrect={attempted} bind:value={input} on:keydown={keyDownEvent} type="text" style="width: {(cloze.cloze.reduce((acc, x) => Math.max(acc, x.length), 0) + 1.2) * 20}px;" /></span
			><span>{@html post}</span>
		</p>
	{/await}
{/await}
<button on:click={() => submit()}>Submit</button>
<button on:click={() => reveal()}>Reveal</button>

<style lang="scss">
	$font-size: 30px;
	.question {
		input {
			font-size: $font-size;
			font-family: Nunito;
		}
		font-size: $font-size;
	}
	.incorrect {
		color: red;
	}
</style>
