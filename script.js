function createHashMap(initialCapacity = 10, loadFactor = 0.75) {
    const bucket = new Array(initialCapacity);
    let size = 0;

    function hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) % bucket.length;
        }
        return hashCode;
    }

    function set(key, value) {
        const index = hash(key);
        if (!bucket[index]) {
            bucket[index] = [];
        }
        for (let pair of bucket[index]) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }
        bucket[index].push([key, value]);
        size++;
        if (size > bucket.length * loadFactor) {
            grow();
        }
    }

    function get(key) {
        const index = hash(key);
        if (!bucket[index]) return null;
        for (let pair of bucket[index]) {
            if (pair[0] === key) {
                return pair[1];
            }
        }
        return null;
    }

    function has(key) {
        const index = hash(key);
        if (!bucket[index]) return false;
        for (let pair of bucket[index]) {
            if (pair[0] === key) {
                return true;
            }
        }
        return false;
    }

    function remove(key) {
        const index = hash(key);
        if (!bucket[index]) return false;
        for (let i = 0; i < bucket[index].length; i++) {
            if (bucket[index][i][0] === key) {
                bucket[index].splice(i, 1);
                size--;
                return true;
            }
        }
        return false;
    }

    function length() {
        return size;
    }

    function clear() {
        bucket.fill(undefined);
        size = 0;
    }

    function keys() {
        const keysArray = [];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i]) {
                for (let pair of bucket[i]) {
                    keysArray.push(pair[0]);
                }
            }
        }
        return keysArray;
    }

    function values() {
        const valuesArray = [];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i]) {
                for (let pair of bucket[i]) {
                    valuesArray.push(pair[1]);
                }
            }
        }
        return valuesArray;
    }

    function entries() {
        const entriesArray = [];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i]) {
                for (let pair of bucket[i]) {
                    entriesArray.push(pair);
                }
            }
        }
        return entriesArray;
    }

    function grow() {
        const newCapacity = bucket.length * 2;
        const newBucket = new Array(newCapacity);
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i]) {
                for (let pair of bucket[i]) {
                    const newIndex = hash(pair[0]);
                    if (!newBucket[newIndex]) {
                        newBucket[newIndex] = [];
                    }
                    newBucket[newIndex].push(pair);
                }
            }
        }
        bucket.length = newBucket.length;
        for (let i = 0; i < newBucket.length; i++) {
            bucket[i] = newBucket[i];
        }
    }

    return {
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries,
    };
}

// Example usage:
const map = createHashMap();
map.set("key1", "value1");
map.set("key2", "value2");
console.log(map.get("key1")); // Output: value1
console.log(map.has("key2")); // Output: true
console.log(map.remove("key1")); // Output: true
console.log(map.length()); // Output: 1
console.log(map.keys()); // Output: ["key2"]
console.log(map.values()); // Output: ["value2"]
console.log(map.entries()); // Output: [["key2", "value2"]]
map.clear();
console.log(map.length()); // Output: 0
