function hashMap() {
    let buckets = new Array(16);

    function hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % 16;
    }

    function set(key, innerValue) {
        const keyIndex = hash(key);
        const keyNode = node({ key, innerValue });
        if (typeof buckets[keyIndex] === "undefined") {
            buckets[keyIndex] = keyNode;
        } else {
            const keyLinkedList = linkedList();
            keyLinkedList.append(buckets[keyIndex]);
            if (
                keyLinkedList.overValue(
                    keyNode.value.key,
                    keyNode.value.innerValue
                )
            ) {
                return;
            }
            keyLinkedList.append(keyNode);
        }
    }

    function get(key) {
        const keyIndex = hash(key);
        const headNode = buckets[keyIndex];
        if (headNode) {
            const keyLinkedList = linkedList();
            keyLinkedList.append(headNode);
            const valueOfKey = keyLinkedList.getValueOfKey(key);
            return valueOfKey;
        }
        return "we don't have any data for requested key!";
    }

    return { buckets, hash, set, get };
}

const node = (value = null, next = null) => {
    return { value, next };
};

const linkedList = () => {
    let head = null;
    let tail = null;
    let size = 0;

    function getHead() {
        return head;
    }

    function getTail() {
        return tail;
    }

    function getSize() {
        return size;
    }

    function append(node) {
        const newTail = node;
        let currentNode = getHead();
        if (currentNode === null) {
            currentNode = newTail;
            head = currentNode;
            tail = currentNode;
        } else {
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = newTail;
            tail = newTail;
        }
        size++;
    }

    function prepend(node) {
        const newHead = node;
        let currentNode = getHead();
        if (currentNode === null) {
            currentNode = newHead;
            head = currentNode;
            tail = currentNode;
        } else {
            newHead.next = currentNode;
            head = newHead;
        }
        size++;
    }

    function getNodeAt(index) {
        if (index > getSize() - 1 || index < 0) return null;
        let currentNode = getHead();
        for (let i = 1; i <= index; i++) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }

    function popNode() {
        let tailNode = getTail();
        let currentNode = getHead();
        if (tailNode === null) return;
        else {
            while (currentNode.next !== tailNode) {
                currentNode = currentNode.next;
            }
            currentNode.next = null;
            tail = currentNode;
            size--;
        }
    }

    function containsValue(recValue) {
        let currentNode = getHead();
        while (currentNode) {
            if (currentNode.value === recValue) return true;
            currentNode = currentNode.next;
        }
        return false;
    }

    function containsKey(reqKey) {
        let currentNode = getHead();
        while (currentNode) {
            if (currentNode.value.key === reqKey) return true;
            currentNode = currentNode.next;
        }
        return false;
    }

    function overValue(reqKey, reqValue) {
        let currentNode = getHead();
        let checker = false;
        while (currentNode) {
            if (currentNode.value.key === reqKey) {
                currentNode.value.innerValue = reqValue;
                checker = true;
            }
            currentNode = currentNode.next;
        }
        return checker;
    }

    function getValueOfKey(reqKey) {
        let currentNode = getHead();
        while (currentNode) {
            if (currentNode.value.key === reqKey) {
                return currentNode.value.innerValue;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    function findIndex(recValue) {
        let currentNode = getHead();
        let recIndex = 0;
        while (currentNode) {
            recIndex++;
            if (currentNode.value === recValue) return recIndex - 1;
            currentNode = currentNode.next;
        }
        return null;
    }

    function toString() {
        let currentNode = getHead();
        let nodeString = "";
        if (currentNode === null) {
            nodeString = "Empty Node!";
            return nodeString;
        }
        while (currentNode) {
            if (currentNode === getHead()) nodeString += "(head)";
            nodeString += `(${currentNode.value})`;
            if (currentNode === getTail()) nodeString += "(tail)";
            nodeString += " -> ";
            currentNode = currentNode.next;
        }
        nodeString += "null";
        return nodeString;
    }

    return {
        append,
        prepend,
        getHead,
        getTail,
        getSize,
        getNodeAt,
        popNode,
        containsValue,
        findIndex,
        toString,
        containsKey,
        overValue,
        getValueOfKey,
    };
};

const name1 = "Ghazaleh";
const name2 = "Ghazaleh";
const name3 = "gHazaleH";
const name4 = "Ghazaleh";
const name5 = "Sina";
const name6 = "Ghazaleh";

const myHashMap = hashMap();

myHashMap.set(name1, "the best player");
myHashMap.set(name2, "the best player of all time");
myHashMap.set(name3, "the goat");
myHashMap.set(name4, "new one");
myHashMap.set(name5, "the programmer");
myHashMap.set(name6, "new GOAT");

console.log(myHashMap.get(name1));
