exports.NetworkMod = class {
	constructor(mod) {
		this.lastReceivedCode = -1;
		
		mod.hook("*", "raw", (code, buf, incoming, fake) => {
			if (code === this.lastReceivedCode) return;

			const name = mod.dispatch.protocolMap.code.get(code);
			
			let data = null;
			if (name) {
				try {
					data = mod.dispatch.fromRaw(name, "*", buf);
				} catch {
					// missing def
				}
			}
			
			console.log({ code, name, data });
			this.lastReceivedCode = code;
		});
	}
}
