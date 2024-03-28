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

    function set(key, value) {
        const keyIndex = hash(key);
        if (typeof buckets[keyIndex] === "undefined") {
            buckets[keyIndex] = value;
        } else if (typeof buckets[keyIndex] === "string") {
            const keyLinkedList = linkedList();
            const currentNode = node(value, null);
            const headNode = node(buckets[keyIndex]);
            keyLinkedList.append(headNode);
            keyLinkedList.append(currentNode);
            buckets[keyIndex] = keyLinkedList.getHead();
        } else {
        }
    }

    return { buckets, hash, set };
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
    };
};

const name1 = "Ghazaleh";

const myHashMap = hashMap();

console.log(myHashMap.buckets);

myHashMap.set(name1, "the best player");

myHashMap.set(name1, "the best player");

console.log(myHashMap.buckets);
