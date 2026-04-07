import confetti from 'canvas-confetti';
import { Tunnel } from './tunnel';

type Message =
	| {
			type: 'return';
			return: unknown;
	  }
	| {
			type: 'ready';
			name: string;
	  }
	| {
			type: 'confetti';
			position: { x: number; y: number };
	  };

type Func = {
	params: unknown;
	return: unknown;
};

export class ZephyrChallenger {
	onReadyHandlers: ((name: string) => void)[] = [];
	nextReturn: (ret: unknown) => void | undefined = undefined;

	constructor(private tunnel: Tunnel) {
		tunnel.onMessage((obj) => this.handleMessage(obj));
	}

	private handleMessage(message: Message) {
		console.log(message);
		switch (message.type) {
			case 'ready': {
				this.onReadyHandlers.forEach((handler) => handler(message.name));
				break;
			}
			case 'return': {
				if (this.nextReturn !== undefined) {
					this.nextReturn(message.return);
				} else {
					console.error('There was a return, but no active call.');
				}
				break;
			}
			case 'confetti': {
				confetti({
					origin: {
						x: message.position.x,
						y: message.position.y
					}
				});
				break;
			}
		}
	}

	getFunc<F extends Func>(name: string): (params: F['params']) => Promise<F['return']> {
		return (params) =>
			new Promise((resolve, _reject) => {
				this.tunnel.send({
					type: 'call',
					name,
					params
				});
				this.nextReturn = (ret) => {
					resolve(ret);
				};
			});
	}

	async waitForFunction<F extends Func>(
		name: string
	): Promise<(params: F['params']) => F['return']> {
		return new Promise((resolve, _reject) => {
			const f = (readiedName: string) => {
				if (readiedName === name) {
					resolve(this.getFunc<F>(name));
				}
			};
			this.onReadyHandlers.push(f);
		});
	}
}

// tunnel.onMessage((obj: ResponseType) => {
// 	if (obj.type === 'ready') {
// 		tunnel.send({
// 			type: 'call',
// 			name: 'product',
// 			params: { x, y }
// 		});
// 	} else if (obj.type === 'return') {
// 		result = obj.return;
// 	} else if (obj.type === 'confetti') {
// 		confetti({
// 			origin: {
// 				x: obj.position.x,
// 				y: obj.position.y
// 			}
// 		});
// 	}
// });
