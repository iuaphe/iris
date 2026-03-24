<script lang="ts">
	import confetti from 'canvas-confetti';
	import Exercise from './Exercise.svelte';
	import { superConfetti } from '$lib/util/confetti';

	export let exercises: Exercise[];

	let currentExercise = 0;

	const onFinish = () => {
		currentExercise = currentExercise + 1;
		if (currentExercise >= exercises.length) {
			superConfetti();
		} else {
			confetti();
		}
	};
</script>

<h1>Quick Check!</h1>
<div class="exercise">
	{#if currentExercise < exercises.length}
		{#key currentExercise}
			<Exercise {onFinish} exercise={exercises[currentExercise]} />
		{/key}
	{:else}
		<p>
			You finished. Nice work! <button on:click={() => (currentExercise = 0)}>Start over</button>
		</p>
	{/if}
</div>

<style lang="scss">
	h1 {
		font-variant: small-caps;
		text-decoration: underline wavy;
		font-style: italic;
	}
	.exercise {
		min-height: 300px;
	}
</style>
