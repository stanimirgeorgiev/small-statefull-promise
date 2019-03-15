let resolvePromise, rejectPromise, status, promise;
class Prom {
	constructor() {
		status = {};
		this.instance = () => this;
	}

	getStatus() {
		return status;
	}

	getPromise() {
		promise = null;
		promise = new Promise((resolve) => {
			status = { pending: true };
			resolvePromise = resolve;
		}, (reject) => {rejectPromise = reject;});
		return promise;
	}

	then(resolve, reject = () => {}) {
		return Promise.resolve(promise).then(() => {
			if(stat.pending || stat.cancel) {
				rejectPromise(reject);
				return () => {};
			}
			return resolve;
		}).then(resolve, reject);
	}

	cancel() {
		status.cancel = true;
	}

	resolve(...args) {
		if(status.resolved) {
			throw new Error('You have tryed to access resolved promise');
		}
		status.resolved = true;
		status.pending = false;
		status.rejected = false;
		resolvePromise(...args);
	}

	reject(...args) {
		if(status.rejected) {
			throw new Error('You have tryed to access rejected promise');
		}
		status.rejected = true;
		status.pending = false;
		status.resolved = false;
		rejectPromise(...args);
	}
}

export default new Prom();
