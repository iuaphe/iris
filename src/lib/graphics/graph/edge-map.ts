import { UndirectedEdge } from './undirected-edge';

export class UndirectedEdgeMap<V, T> {
	directedMap: Map<string, T>;

	constructor() {
		this.directedMap = new Map();
	}

	has(edge: UndirectedEdge<V>): boolean {
		return this.directedMap.has(edge.toString());
	}

	set(edge: UndirectedEdge<V>, item: T): void {
		this.directedMap.set(edge.toString(), item);
		this.directedMap.set(edge.reversed().toString(), item);
	}

	get(edge: UndirectedEdge<V>): T | undefined {
		return this.directedMap.get(edge.toString());
	}

	delete(edge: UndirectedEdge<V>) {
		this.directedMap.delete(edge.toString());
		this.directedMap.delete(edge.reversed().toString());
	}
}
