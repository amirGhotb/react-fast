type typeEnum = 'session' | 'local';

class Store {

    public type: typeEnum;

    constructor(type: typeEnum = 'local') {
        this.type = type
    }

    get(key: string): any {
        let result = null
        if (this.type === 'session') {
            result = sessionStorage.getItem(key);
        } else {
            result = localStorage.getItem(key)
        }
        return result ? JSON.parse(result) : {};
    }

    async store(key: string, parameters: { [key: string]: any }) {
        try {
            if (this.type === 'session') {
                await sessionStorage.setItem(key, JSON.stringify(parameters));
            } else {
                await localStorage.setItem(key, JSON.stringify(parameters));
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    async remove(key: string) {
        try {
            if (this.type === 'session') {
                await sessionStorage.removeItem(key);
            } else {
                await localStorage.removeItem(key);
            }
            return true;
        } catch (e) {
            return false;
        }
    }

}

export default Store;
