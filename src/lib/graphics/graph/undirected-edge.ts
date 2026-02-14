export class UndirectedEdge<V> {
	constructor(private from: V, private to: V) {}

	getFrom(): V {
		return this.from;
	}

	getTo(): V {
		return this.to;
	}

	reversed(): UndirectedEdge<V> {
		return new UndirectedEdge(this.to, this.from);
	}

	toString(): string {
		return `${this.from},${this.to}`;
	}

	identical(other: UndirectedEdge<V>) {
		return (
			(this.from == other.from && this.to == other.to) ||
			(this.from == other.to && this.to == other.from)
		);
	}
}
