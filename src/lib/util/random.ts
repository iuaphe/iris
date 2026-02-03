export const randomIndex = <T>(ts: T[]) => Math.floor(Math.random() * ts.length);
export const randomChoice = <T>(ts: T[]) => ts[randomIndex(ts)];
