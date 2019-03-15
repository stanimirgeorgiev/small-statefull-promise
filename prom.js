let res, rej, stat, prom;
class Prom {	
	constructor() {
		stat = {};
		this.instance = () => this;
    }

	getStatus() {
    	return stat;
	}
	
	getPromise() {
		prom = null;
		prom = new Promise((resolve) => {
			stat = {pending: true};
			res = resolve;
		}, (reject) => {rej = reject;});
		return prom;    
	}
	
	then(resolve, reject = () => {}) {
		return Promise.resolve(prom).then(() => {
			if(stat.pending || stat.cancel) {
				rej(reject);
				return () => {};
            }        
			return resolve;
		}).then(resolve, reject);
    }
	
	cancel() {
		stat.cancel = true;
    }

	resolve(...args) {
		if(stat.resolved) {
			throw new Error('You have tryed to access resolved promise');
        }
		stat.resolved = true;
		stat.pending = false;
		stat.rejected = false;
		res(...args);
    }

	reject(...args) {
		if(stat.resolved) {
			throw new Error('You have tryed to access rejected promise');
        }
		stat.rejected = true;
		stat.pending = false;
		stat.resolved = false;
		stat.cancel = false;
		rej(...args);
    }

}

export default new Prom();
