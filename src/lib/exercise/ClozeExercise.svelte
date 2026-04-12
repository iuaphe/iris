<script lang="ts">
	import type { Completion, Exercise, MultipleChoice } from './exercise';
	import { pretty } from '$lib/components/article/render';
	import MCExercise from './MCExercise.svelte';
	import { randomChoice, randomized } from '$lib/util/random';

	export let completion: Completion;
	export let onFinish: () => void;

	let input: string = '';
	let attempted: boolean = false;

	const keyDownEvent = (event: KeyboardEvent) => {
		attempted = false;
		if (event.key === 'Enter') {
			submit();
		}
	};

	const submit = () => {
		if (completion.correctPool.map((c) => c.toLowerCase()).includes(input.toLowerCase())) {
			onFinish();
		} else {
			attempted = true;
		}
	};

	const reveal = () => {
		attempted = false;
		input = completion.correctPool[0];
	};

	const convertToMC = (completion: Completion): MultipleChoice => {
		let options = [
			randomChoice(completion.correctPool),
			...randomized(completion.incorrectPool).slice(0, 3)
		];
		return {
			question: `${completion.preCloze} _____ ${completion.postCloze}`,
			options
		};
	};
</script>

{#if !attempted}
	{#await pretty(completion.preCloze) then pre}
		{#await pretty(completion.postCloze) then post}
			<p class="question">
				<span>{@html pre}</span><span
					><input
						class:incorrect={attempted}
						bind:value={input}
						on:keydown={keyDownEvent}
						type="text"
						style="width: {(completion.correctPool.reduce((acc, x) => Math.max(acc, x.length), 0) +
							1.2) *
							20}px;"
					/></span
				><span>{@html post}</span>
			</p>
		{/await}
	{/await}
	<button on:click={() => submit()}>Submit</button>
	<button on:click={() => reveal()}>Reveal</button>
{:else}
	<MCExercise mc={convertToMC(completion)} {onFinish} />
{/if}

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
