export default class SvgCache {
    constructor(props) {
    }

    static cache = new Map();

    static put(key, item) {
        this.cache.set(key,item);
    }

    static get(key) {
        //console.log(this.cache.get(key));
        return this.cache.get(key);
    }

    static clear() {
        this.cache.clear()
    }

    static has(key) {
        return this.cache.has(key)
    }
}