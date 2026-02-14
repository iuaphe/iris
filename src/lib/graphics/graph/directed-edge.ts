export class DirectedEdge<V> {
	constructor(private from: V, private to: V) {}

	getFrom(): V {
		return this.from;
	}

	getTo(): V {
		return this.to;
	}

	reversed(): DirectedEdge<V> {
		return new DirectedEdge(this.to, this.from);
	}

	toString(): string {
		return `${this.from}->${this.to}`;
	}

	identical(other: DirectedEdge<V>) {
		return this.from == other.from && this.to == other.to;
	}
}
