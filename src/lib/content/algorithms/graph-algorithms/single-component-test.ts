import { article, fig, h1 } from '$lib/components/article/article';
import BFS from '$lib/content/algorithms/graph-algorithms/bfs.svelte';
import DfsDirected from './dfs-directed.svelte';
import DFS from './dfs.svelte';

export default article('Graph Algorithms', ({ figMan, algMan: _ }) => {
	const figure = figMan.newFigure('figure');

	return [
		h1(`Introduction`),
		fig(figure, DfsDirected, `Depth First Search`, 'Click to advance.'),
		fig(figure, BFS, `Breadth First Search`, 'Click to advance.'),
		fig(figure, DFS, `Depth First Search`, 'Click to advance.')
	];
});
