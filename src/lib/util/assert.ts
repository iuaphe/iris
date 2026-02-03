export const assert = (b: boolean) => {
	if (!b) throw new Error('Assertion failed! :(');
};
