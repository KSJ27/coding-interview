const fs = require("fs");
const lines = fs.readFileSync("./dev/stdin").toString().split("\n");

class MinHeap {
  heap = [];

  constructor() {}

  getParentIndex(currentIndex) {
    return Math.floor((currentIndex - 1) / 2);
  }

  getLeftChildIndex(currentIndex) {
    return currentIndex * 2 + 1;
  }

  getRightChildIndex(currentIndex) {
    return currentIndex * 2 + 2;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  bubbleUp(currentIndex) {
    while (currentIndex > 0) {
      const parentIndex = this.getParentIndex(currentIndex);
      if (this.heap[currentIndex] < this.heap[parentIndex]) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  bubbleDown(currentIndex) {
    while (true) {
      const leftChildIndex = this.getLeftChildIndex(currentIndex);

      if (leftChildIndex >= this.heap.length) break;

      const rightChildIndex = this.getRightChildIndex(currentIndex);
      let smallest = currentIndex;

      if (this.heap[leftChildIndex] < this.heap[smallest]) {
        smallest = leftChildIndex;
      }

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] < this.heap[smallest]
      ) {
        smallest = rightChildIndex;
      }

      if (smallest === currentIndex) break;

      this.swap(currentIndex, smallest);
      currentIndex = smallest;
    }
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const ret = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);

    return ret;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }
}

const [N, M] = lines[0].split(" ").map(Number);
const pairs = lines.slice(1).map((pair) => pair.split(" ").map(Number));

const adj = Array.from({ length: N + 1 }, () => []);
const inDegree = Array.from({ length: N + 1 }, () => 0);

for (const [start, end] of pairs) {
  adj[start].push(end);
  inDegree[end] += 1;
}

const heap = new MinHeap();

for (let i = 1; i < N + 1; i++) {
  if (inDegree[i] === 0) {
    heap.push(i);
  }
}

const result = [];

while (!heap.isEmpty()) {
  const current = heap.pop();
  result.push(current);

  for (const neighbor of adj[current]) {
    inDegree[neighbor] -= 1;
    if (inDegree[neighbor] === 0) {
      heap.push(neighbor);
    }
  }
}

console.log(result.join(" "));
