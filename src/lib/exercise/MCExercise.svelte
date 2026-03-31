<script lang="ts">
	import { pretty } from '$lib/components/article/render';
	import { onMount } from 'svelte';
	import type { MultipleChoice } from './exercise';
	import { randomized } from '$lib/util/random';

	export let mc: MultipleChoice;
	export let onFinish: () => void;

	const submit = () => {
		if (selectedAnswer === correctAnswer) {
			onFinish();
		} else {
			attempted = [...attempted, selectedAnswer];
			selectedAnswer = undefined;
		}
	};

	let selectedAnswer: number | undefined;
	let attempted: number[] = [];

	let correctAnswer: number;
	let randomizedOrder: string[];

	onMount(() => {
		randomizedOrder = randomized(mc.options);
		correctAnswer = randomizedOrder.indexOf(mc.options[0]);
	});

	const prettifiedQuestion = async () => ({
		question: await pretty(mc.question),
		options: await Promise.all(mc.options.map(async (option) => await pretty(option)))
	});
</script>

{#await prettifiedQuestion() then mc}
	<div class="question">
		{@html mc.question}
		<div class="options">
			{#each randomizedOrder as option, i}
				<div>
					<input
						type="radio"
						disabled={attempted.includes(i)}
						id="answer{i + 1}"
						value={i}
						name="answer"
						bind:group={selectedAnswer}
					/>
					<label class:disabled={attempted.includes(i)} for="answer{i + 1}">{option}</label>
				</div>
			{/each}
		</div>
		<button on:click={submit}>Submit</button>
	</div>
{/await}

<style lang="scss">
	$font-size: 30px;
	.question {
		.options {
			text-align: left;
		}
		input {
			width: 25px;
			aspect-ratio: 1/1;
		}
		font-size: $font-size;
	}
	.disabled {
		font-style: italic;
		color: rgb(201, 201, 201);
	}
</style>
