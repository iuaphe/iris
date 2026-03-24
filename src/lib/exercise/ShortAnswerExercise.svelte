<script lang="ts">
	import type { ShortAnswer } from './exercise';

	export let short: ShortAnswer;
	export let onFinish: () => void;

	let revealed = false;
</script>

<div class="question">
	{short.question}
</div>
<textarea name="answer" id="answer" />
<br />
{#if revealed}
    <div class="question">
        <em>One possible response:</em> {short.possibleAnswer}
    </div>
	<button on:click={() => onFinish()}>Continue</button>
{:else}
	<button on:click={() => (revealed = true)}>Done</button>
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
	textarea {
		width: 700px;
		height: 100px;
		font-size: $font-size;
		font-family: Nunito;
	}
</style>
