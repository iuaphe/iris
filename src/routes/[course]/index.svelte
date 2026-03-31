<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { courses } from '$lib/courses';
	import type { Course } from '$lib/courses';

	export const load: Load = async ({ params }) => {
		const { course: courseName } = params;
		const course = courses.find((it) => it.name == courseName);
		if (!course) {
			return {
				status: 404
			};
		}
		return {
			status: 200,
			props: {
				course
			}
		};
	};
</script>

<script lang="ts">
	import IrisButton from '$lib/components/IrisButton.svelte';
	import '$lib/styles/global.scss';
	import { lightenColor, lighterenColor } from '$lib/util/color';
	import { onMount } from 'svelte';
	import { current_component } from 'svelte/internal';
	import Arrow from '$lib/components/Arrow.svelte';
	import { p } from '$lib/graphics/point/point';

	export let course: Course;
	const topics = course.topics ?? [];

	const background = `linear-gradient(to right, ${course.color}, ${lightenColor(course.color)})`;

	let clicked: HTMLDivElement | undefined = undefined

	// onMount(() => {
	// 	document.addEventListener('mousemove', e => {
	// 		if (clicked !== undefined) {
	// 			clicked.style.left = (parseFloat(clicked.style.left.slice(0, -2)) + e.movementX) + "px"
	// 			clicked.style.top = (parseFloat(clicked.style.top.slice(0, -2)) + e.movementY) + "px"
	// 			console.log(clicked.style.left, clicked.style.top)
	// 		}
	// 	})
	// 	document.addEventListener('keydown', (e) => clicked = undefined)
	// })
	

	const getFromName = (name: string) => {
		return topics.find(t => t.name === name)
	}
</script>

<svelte:head>
	<title>
		{course.prettyName}
	</title>
</svelte:head>
<div class="header" style="background: {background}">
	<div class="header-content">
		<span class="backlinks" style="color: {lighterenColor(course.color)}">
			<a href="/">Home</a>
		</span>
		<h1>{course.prettyName}</h1>
	</div>
</div>
<div class="content">
	<h1>Articles</h1>
	<div class="topics">
		{#each topics as topic}
			<IrisButton
				href="/{course.name}/{topic.name}"
				color={course.color}
				icon={topic.icon}
				enabled={topic.svelte !== undefined || topic.article !== undefined}
				style="position: absolute; left: {topic.position.x}px; top: {topic.position.y}px; width: 450px;"
				onclick={(e) => { clicked = e.currentTarget }}
			>
				<h2>{topic.prettyName}</h2>
			</IrisButton>
		{:else}
			There aren't any articles in this subject yet.
		{/each}
	</div>
	{#each course.edges as edge}
	<Arrow p1={getFromName(edge[0]).position.add(p(225, 150))} p2={getFromName(edge[1]).position.add(p(225, 0))}/>
	{/each}
</div>

<style lang="scss">
	.header {
		h1 {
			@media (max-width: 900px) {
				margin-top: 0;
			}
			max-width: 1300px;
			margin: auto;
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

	.topics {
		a {
			text-decoration: none;
		}
	}
</style>
