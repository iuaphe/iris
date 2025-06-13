<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { courses, type Topic } from '$lib/courses';
	import type { Course } from '$lib/courses';

	export const load: Load = async ({ params, fetch, session, stuff }) => {
		const { course: courseName, topic: topicName } = params;
		const course = courses.find((it) => it.name == courseName);
		const topicIndex = course.topics.findIndex((it) => it.name == topicName);
		if (!course || topicIndex === -1) {
			return {
				status: 404
			};
		}
		return {
			status: 200,
			props: {
				course,
				topicIndex
			}
		};
	};
</script>

<script lang="ts">
	import '$lib/styles/global.scss';
	// @ts-ignore
	import Placeholder from '$lib/content/placeholder.md';
	import IrisButton from '$lib/components/IrisButton.svelte';
	import Article from '$lib/components/article/Article.svelte';

	export let course: Course;
	export let topicIndex: number;
	$: topic = course.topics[topicIndex];
	$: svelte = topic.svelte;

	function lightenColor(color: string) {
		const red = parseInt(color.substring(1, 3), 16);
		const green = parseInt(color.substring(3, 5), 16);
		const blue = parseInt(color.substring(5, 7), 16);
		const lightness = 0.2;
		const newRed = Math.floor((255 - red) * lightness) + red;
		const newGreen = Math.floor((255 - green) * lightness) + green;
		const newBlue = Math.floor((255 - blue) * lightness) + blue;
		return '#' + newRed.toString(16) + newGreen.toString(16) + newBlue.toString(16);
	}

	function lighterenColor(color: string) {
		return lightenColor(lightenColor(color)); // yeah
	}

	let findNextOpenDown = (course: Course, topicIndex: number) => {
		topicIndex--;
		while (
			topicIndex >= 0 &&
			!(
				course.topics[topicIndex].article !== undefined ||
				course.topics[topicIndex].svelte !== undefined
			)
		) {
			topicIndex--;
		}
		if (topicIndex < 0) {
			return undefined;
		} else {
			return topicIndex;
		}
	};

	$: nextOpenDown = findNextOpenDown(course, topicIndex);

	let findNextOpenUp = (course: Course, topicIndex: number) => {
		topicIndex++;
		while (
			topicIndex < course.topics.length &&
			!(
				course.topics[topicIndex].article !== undefined ||
				course.topics[topicIndex].svelte !== undefined
			)
		) {
			topicIndex++;
		}
		if (topicIndex >= course.topics.length) {
			return undefined;
		} else {
			return topicIndex;
		}
	};

	$: nextOpenUp = findNextOpenUp(course, topicIndex);

	const background = `linear-gradient(to right, ${course.color}, ${lightenColor(course.color)})`;
</script>

<svelte:head>
	<title>
		{topic.prettyName}
	</title>
</svelte:head>
<div class="header" style="background: {background}">
	<div class="header-content">
		<span class="backlinks" style="color: {lighterenColor(course.color)}">
			<a href="/">Home</a>
			<span class="slash">/</span>
			<a href="/{course.name}">{course.prettyName}</a>
		</span>
		<h1>{topic.prettyName}</h1>
	</div>
</div>
<div class="content">
	{#if svelte !== undefined}
		<svelte:component this={svelte} />
	{:else if topic.article !== undefined}
		<Article article={topic.article} />
	{:else}
		<svelte:component this={Placeholder} />
	{/if}
</div>
{#key topicIndex}
	<div class="end-buttons">
		<div class="prev">
			{#if nextOpenDown !== undefined}
				<IrisButton
					href="/{course.name}/{course.topics[nextOpenDown].name}"
					color={course.color}
					icon={course.topics[nextOpenDown].icon}
				>
					<h2>
						← &nbsp; {course.topics[nextOpenDown].prettyName}
					</h2>
				</IrisButton>
			{/if}
		</div>
		<div class="next">
			{#if nextOpenUp !== undefined}
				<IrisButton
					href="/{course.name}/{course.topics[nextOpenUp].name}"
					color={course.color}
					icon={course.topics[nextOpenUp].icon}
				>
					<h2>
						{course.topics[nextOpenUp].prettyName} &nbsp; →
					</h2>
				</IrisButton>
			{/if}
		</div>
	</div>
{/key}

<style lang="scss">
	.header {
		h1 {
			@media (max-width: 900px) {
				margin-top: 0;
			}
			margin-top: 50px;
			margin-bottom: 0px;
		}
		padding: 30px;
		padding-bottom: 50px;
		color: white;
	}

	.header-content {
		max-width: 1300px;
		margin: auto;
	}

	.backlinks {
		.slash {
			margin: 0 3px;
		}
		a {
			text-decoration: none;
			color: inherit;
			&:hover {
				text-decoration: solid underline 3px;
			}
		}
		color: white;
		font-family: 'Outfit';
		text-transform: uppercase;
		font-size: 70%;
	}

	.content {
		padding: 30px;
		max-width: 1300px;
		margin: auto;
	}

	.end-buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding: 20px;
		margin-top: 100px;
	}
</style>
