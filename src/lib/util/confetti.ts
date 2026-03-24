import confetti from 'canvas-confetti';

export const superConfetti = () => {
	for (let i = 0; i < 10; i++) {
		setTimeout(() => {
			confetti({
				origin: {
					x: Math.random() * 0.6 + 0.2,
					y: Math.random() * 0.6 + 0.2
				},
				angle: Math.random() * 360,
				spread: 360
			});
		}, i * 200 + Math.random() * 100);
	}
};
