import * as ps from '$lib/psuedocode';

export const graphSearch = ps.func(
	'Search',
	['G', 'u'],
	[
		ps.generals([`X \\gets \\{ u \\}`]),
		ps.whiles('\\text{there exists a fringe vertex } v', [
			ps.generals([`X \\gets X \\cup \\{ v \\}`])
		])
	]
);

export const breadthFirstSearch = ps.func(
	'BreadthFirstSearch',
	['G', 'u'],
	[
		ps.generals([`F \\gets`, ` new queue`]),
		ps.generals([`X \\gets`, ` new set`]),
		ps.generals([``, `add `, `u`, ` to `, `F`, ` and `, `X`]),
		ps.whiles('|F| > 0', [
			ps.generals([`v \\gets `, ` dequeue from `, `F`]),
			ps.ifs(`v \\not\\in X`, [
				ps.generals([``, `enqueue each of `, `v`, `'s neighbors to `, `F`]),
				ps.generals([`X \\gets X \\cup \\{ v \\}`])
			])
		])
	]
);

export const depthFirstSearch = ps.func(
	'DepthFirstSearch',
	['G', 'u'],
	[
		ps.generals([`F \\gets`, ` new \\underline{stack}`]),
		ps.generals([`X \\gets`, ` new set`]),
		ps.generals([``, `add `, `u`, ` to `, `F`, ` and `, `X`]),
		ps.whiles('|F| > 0', [
			ps.generals([`v \\gets `, ` \\underline{pop} from `, `F`]),
			ps.ifs(`v \\not\\in X`, [
				ps.generals([``, `\\underline{push} each of `, `v`, `'s neighbors to `, `F`]),
				ps.generals([`X \\gets X \\cup \\{ v \\}`])
			])
		])
	]
);
