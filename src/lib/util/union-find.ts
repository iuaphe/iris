import { assert } from './assert';

export type SetId = number;

export interface UnionFind<T> {
	/**
	 * Make a set with a single element, `t`.
	 */
	makeSet(t: T): void;
	/**
	 * Takes the two sets containing `t1` and `t2`, respectively, and
	 * union them, such that find(t1) === find(t2) afterwards. This assumes
	 * that both `t1` and `t2` are each in some set associated with this
	 * structure.
	 */
	union(t1: T, t2: T): void;
	/**
	 * Returns the set identifier associated with `t`. This assumes that
	 * `t` is in some set associated with this structure.
	 */
	find(t: T): SetId;
}

export class NaiveUnionFind<T> implements UnionFind<T> {
	private nextSetId: SetId;
	private setIdMap: Map<T, SetId>;
	constructor() {
		this.nextSetId = 0;
		this.setIdMap = new Map();
	}

	makeSet(t: T): void {
		const setId = this.nextSetId;
		this.setIdMap.set(t, setId);
		this.nextSetId++;
	}

	/* O(n) :( */
	union(t1: T, t2: T): void {
		const setId1 = this.setIdMap.get(t1);
		const setId2 = this.setIdMap.get(t2);
		for (const key of this.setIdMap.keys()) {
			if (this.setIdMap.get(key) === setId2) {
				this.setIdMap.set(key, setId1);
			}
		}
	}

	find(t: T): SetId {
		const result = this.setIdMap.get(t);
		assert(result !== undefined);
		return result;
	}
}
