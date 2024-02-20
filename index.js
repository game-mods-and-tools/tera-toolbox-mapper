let inCombat = false;

exports.NetworkMod = class {
	constructor(mod) {
		this.lastReceivedCode = -1;
		
		mod.hook("*", "raw", (code, buf, incoming, fake) => {
			if (code === this.lastReceivedCode) return;
			
			console.log({ code, name: mod.dispatch.protocolMap.code.get(code) });
			this.lastReceivedCode = code;
		});
	}
}
