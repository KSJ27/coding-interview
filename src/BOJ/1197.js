const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [V, E] = input[0].split(" ").map(Number);

const adj = Array.from({ length: V + 1 }, () => []);

for (let i = 1; i <= E; i++) {
  const [u, v, w] = input[i].split(" ").map(Number);
  adj[u].push([v, w]);
  adj[v].push([u, w]);
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(item) {
    this.heap.push(item);
    this._bubbleUp();
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown();
    return top;
  }

  _bubbleUp() {
    let i = this.heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent][0] <= this.heap[i][0]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  _bubbleDown() {
    let i = 0;
    const len = this.heap.length;
    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < len && this.heap[left][0] < this.heap[smallest][0])
        smallest = left;
      if (right < len && this.heap[right][0] < this.heap[smallest][0])
        smallest = right;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const visited = Array(V + 1).fill(false);
const heap = new MinHeap();

heap.push([0, 1]); // (weight, vertex)

let totalWeight = 0;

while (!heap.isEmpty()) {
  const [weight, u] = heap.pop();
  if (visited[u]) continue;

  visited[u] = true;
  totalWeight += weight;

  for (const [v, w] of adj[u]) {
    if (!visited[v]) {
      heap.push([w, v]);
    }
  }
}

console.log(totalWeight);
