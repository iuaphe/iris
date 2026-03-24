<script lang="ts">
	import type { ShortAnswer } from './exercise';

	export let short: ShortAnswer;
	export let onFinish: () => void;
</script>

<div class="question">
	{short.question}
</div>
<textarea name="answer" id="answer" />
<br />
<button on:click={() => onFinish()}>done</button>

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
