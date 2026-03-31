// import AngularMomentum from '$lib/content/physics/angular-momentum/angular-momentum.md';
import Momentum from '$lib/content/physics/momentum/momentum.md';
import Smh from '$lib/content/physics/shm/simple-harmonic-motion.md';
// import DynamicLists from '$lib/content/algorithms/lists/dynamic-lists.md';
import PriorityQueues from '$lib/content/algorithms/priority-queues/priority-queues.md';
// import Dictionaries from '$lib/content/algorithms/dictionary/dictionary-outline.md';
// import OrderedDictionaries from '$lib/content/algorithms/ordered-dictionary/ordered-dictionary-outline.md';
// import GraphAlgorithms from '$lib/content/algorithms/graph-algorithms/graph-algorithms.md';
import Sandbox from '$lib/content/algorithms/sandbox/sand.md';
// import GreedyGraphAlgorithms from '$lib/content/algorithms/greedy-graph-algorithms/greedy-graph-algorithms.md';
import SweepLine from '$lib/content/interactive-systems/sweep-line.md';
import SetTheory from '$lib/content/discrete-math/set-theory/set-theory.md';
import GraphTheory from '$lib/content/discrete-math/graph-theory/graph-theory.md';
import { StructuredArticle } from './components/article/article';
import graphAlgorithms from './content/algorithms/graph-algorithms/graph-algorithms';
import orderedDictionary from './content/algorithms/ordered-dictionary/ordered-dictionary';
import dictionary from './content/algorithms/dictionary/dictionary';
import processes from './content/op-systems/processes/processes';
import singleComponentTest from './content/algorithms/graph-algorithms/single-component-test';
import { p, Point } from './graphics/point/point';

export type Course = {
	prettyName: string;
	name: string;
	color: string;
	topics?: Topic[];
	edges?: [string, string][]
};

export type Topic = {
	prettyName: string;
	name: string;
	svelte?: typeof import('*.md').default;
	article?: StructuredArticle;
	feature?: number;
	icon?: string;
	position?: Point
};

export const courses: Course[] = [
	{
		prettyName: 'Algorithms',
		name: 'algorithms',
		color: '#f94144',
		topics: [
			// {
			// 	prettyName: 'Dynamic Lists',
			// 	name: 'dynamic-lists',
			// 	// svelte: DynamicLists,
			// 	// article: testArticle,
			// 	icon: 'lists'
			// },
			// {
			// 	prettyName: 'Priority Queues',
			// 	name: 'priority-queues',
			// 	// svelte: PriorityQueues,
			// 	icon: 'priority-queues'
			// },
			// {
			// 	prettyName: 'Sets and Dictionaries',
			// 	name: 'sets-dictionaries',
			// 	article: dictionary,
			// 	// svelte: Dictionaries,
			// 	icon: 'dictionary'
			// },
			// {
			// 	prettyName: 'Ordered Dictionaries',
			// 	name: 'ordered-dictionaries',
			// 	// article: orderedDictionary,
			// 	// svelte: OrderedDictionaries,
			// 	icon: 'ordered-dictionary'
			// },
			{
				prettyName: 'Graphs',
				name: 'graphs',
				article: graphAlgorithms,
				// svelte: GraphAlgorithms,
				feature: 0,
				icon: 'graph-algorithms',
				position: p(792, 350)
			},
			{
				prettyName: 'Depth-First Search',
				name: 'depth-first-search',
				icon: 'graph-algorithms',
				position: p(305, 614)
			},
			{
				prettyName: 'Breadth-First Search',
				name: 'breadth-first-search',
				icon: 'graph-algorithms',
				position: p(837, 650)
			},
			{
				prettyName: 'Shortest Path',
				name: 'shortest-path',
				icon: 'graph-algorithms',
				position: p(1372, 973)
			},
			{
				prettyName: 'Minimum Spanning Tree',
				name: 'minimum-spanning-tree',
				icon: 'graph-algorithms',
				position: p(1364, 594)
			},
			{
				prettyName: 'Topological Sort',
				name: 'topological-sort',
				icon: 'graph-algorithms',
				position: p(246, 1015)
			},
			{
				prettyName: 'Graph Applications',
				name: 'graph-applications',
				icon: 'graph-algorithms',
				position: p(790, 1233)
			},
			{
				prettyName: 'Designing Graph Algorithms',
				name: 'designing-graph-algorithms',
				icon: 'graph-algorithms',
				position: p(785, 1557)
			},
			// {
			// 	prettyName: 'Test',
			// 	name: 'test',
			// 	article: singleComponentTest,
			// 	icon: 'test',
			// 	position: p(0, 0),
			// },
			{
				prettyName: 'Sandbox',
				name: 'sandbox',
				svelte: Sandbox,
				icon: 'sandbox',
				position: p(1683, 1923)
			}
			// {
			// 	prettyName: 'Greedy Graph Algorithms',
			// 	name: 'greedy-graph-algorithms',
			// svelte: GreedyGraphAlgorithms
			// }
		].map(t => ({...t, position: p(t.position.x, t.position.y * 1.3)})),
		edges: [
			['graphs', 'depth-first-search'],
			['graphs', 'breadth-first-search'],
			['graphs', 'minimum-spanning-tree'],
			['depth-first-search', 'topological-sort'],
			['breadth-first-search', 'graph-applications'],
			['minimum-spanning-tree', 'shortest-path'],
			['shortest-path', 'graph-applications'],
			['topological-sort', 'graph-applications'],
			['graph-applications', 'designing-graph-algorithms'],
		],
	},
	{
		prettyName: 'Physics',
		name: 'physics',
		color: '#f3722c',
		topics: [
			{
				prettyName: 'Simple Harmonic Motion',
				name: 'simple-harmonic-motion',
				svelte: Smh,
				feature: 1,
				icon: 'simple-harmonic-motion'
			},
			{
				prettyName: 'Momentum',
				name: 'momentum',
				svelte: Momentum,
				feature: 3.5,
				icon: 'momentum'
			},
			{
				prettyName: 'Angular Momentum',
				name: 'angular-momentum',
				// svelte: AngularMomentum,
				icon: 'angular-momentum'
			},
			{ prettyName: 'Electrostatics', name: 'electrostatics' },
			{ prettyName: 'Capacitors', name: 'capacitors' }
		]
	}
	// {
	// 	prettyName: 'Engineering',
	// 	name: 'engineering',
	// 	color: '#f9c74f',
	// 	topics: []
	// },
	// {
	// 	prettyName: 'Chemistry',
	// 	name: 'chemistry',
	// 	color: '#90be6d',
	// 	topics: []
	// },
	// {
	// 	prettyName: 'Mathematics',
	// 	name: 'mathematics',
	// 	color: '#43aa8b',
	// 	topics: [
	// 		{
	// 			prettyName: 'Set Theory',
	// 			name: 'set-theory',
	// 			// svelte: SetTheory,
	// 			icon: 'set-theory'
	// 		},
	// 		{
	// 			prettyName: 'Graph Theory',
	// 			name: 'graph-theory',
	// 			svelte: GraphTheory,
	// 			icon: 'graphs',
	// 			feature: 4
	// 		},
	// 		{
	// 			prettyName: 'Logic',
	// 			name: 'logic',
	// 			// svelte: SetTheory,
	// 			icon: 'logic'
	// 		}
	// 	]
	// }
	// {
	// 	prettyName: 'Interactive Systems',
	// 	name: 'interactive-systems',
	// 	color: '#bf81ea',
	// 	topics: [
	// 		{
	// 			prettyName: 'Sweep Line Collision Detection',
	// 			name: 'sweep-line',
	// 			feature: 3,
	// 			svelte: SweepLine
	// 		}
	// 	]
	// },
	// {
	// 	prettyName: 'Operating Systems',
	// 	name: 'op-systems',
	// 	color: '#ba4a78',
	// 	topics: [
	// 		{
	// 			prettyName: 'Processes',
	// 			name: 'processes',
	// 			article: processes
	// 		}
	// 	]
	// }
];

export const svgs = import.meta.glob('./icons/*.svg', { as: 'raw' });
