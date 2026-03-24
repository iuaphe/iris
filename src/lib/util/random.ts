/**
 * Returns a uniform random integer in [a, b].
 */
export const randomInRangeIncl = (a: number, b: number): number => {
	return a + Math.floor(Math.random() * (b - a + 1));
};

export const randomIndex = <T>(ts: T[]) => Math.floor(Math.random() * ts.length);
export const randomChoice = <T>(ts: T[]) => ts[randomIndex(ts)];
export const randomized = <T>(ts: T[]): T[] => {
	let result = [];
	result = [...ts];
	for (let i = 0; i < result.length - 1; i++) {
		const j = randomInRangeIncl(i, result.length - 1);
		if (i !== j) {
			/* swap :) */
			const temp = result[i];
			result[i] = result[j];
			result[j] = temp;
		}
	}
	return result;
};
