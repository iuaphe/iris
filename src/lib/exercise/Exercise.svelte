<script lang="ts">
	import confetti from 'canvas-confetti';
	import ClozeExercise from './ClozeExercise.svelte';
	import type { Exercise } from './exercise';
	import MCExercise from './MCExercise.svelte';
	import ShortAnswerExercise from './ShortAnswerExercise.svelte';

	export let exercise: Exercise;
	export let onFinish: () => void;

	// const onFinish = () => {
	//     confetti()
	// }
</script>

{#if exercise.type === 'completion'}
	<ClozeExercise {onFinish} completion={exercise.cloze} />
{:else if exercise.type === 'mc'}
	<MCExercise {onFinish} mc={exercise.mc} />
{:else if exercise.type === 'short'}
	<ShortAnswerExercise {onFinish} short={exercise.short} />
{/if}
