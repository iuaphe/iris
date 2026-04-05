export class Tunnel {
	private callbacks: ((obj: any) => void)[] = [];

	private constructor(private ws: WebSocket) {
		ws.onmessage = (e) => {
			this.callbacks.forEach((callback) => callback(JSON.parse(e.data)));
		};
	}

	static async create(tunnelName: string): Promise<Tunnel> {
		const ws = await new Promise<WebSocket>((resolve, reject) => {
			const ws = new WebSocket(`http://localhost:3001/connect?tunnelName=${tunnelName}`);
			ws.onopen = (_e) => {
				resolve(ws);
			};
			ws.onerror = (e) => reject(e);
		});
		return new Tunnel(ws);
	}

	onMessage(callback: (obj: any) => void) {
		this.callbacks.push(callback);
	}

	send(obj: any) {
		this.ws.send(JSON.stringify(obj));
	}
}

export const newTunnel = async (): Promise<[Tunnel, string]> => {
	const { name } = await fetch('http://localhost:3001/create-tunnel').then((r) => r.json());
	const tunnel = await Tunnel.create(name);
	return [tunnel, name];
};
