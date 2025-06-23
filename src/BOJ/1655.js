const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  const N = Number(input[0]);
  const numbers = Array.from({ length: N }, (_, i) => Number(input[i + 1]));
  const result = [];
  const left = new MaxHeap();
  const right = new MinHeap();

  numbers.forEach((number) => {
    if (left.size() === 0 || number <= left.peek()) {
      left.insert(number);
    } else {
      right.insert(number);
    }

    if (left.size() < right.size()) {
      left.insert(right.extractMin());
    } else if (left.size() > right.size() + 1) {
      right.insert(left.extractMax());
    }

    result.push(left.peek());
  });

  console.log(result.join("\n"));

  process.exit();
});

class MinHeap {
  heap = [];

  getLeftChildIndex(i) {
    return i * 2 + 1;
  }

  getRightChildIndex(i) {
    return i * 2 + 2;
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  bubbleUp(i) {
    let index = i;

    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.heap[parentIndex] < this.heap[index]) break;

      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  bubbleDown(i) {
    let index = i;
    const length = this.heap.length;

    while (true) {
      let smallest = index;
      const left = this.getLeftChildIndex(index);
      const right = this.getRightChildIndex(index);

      if (left < length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }

      if (right < length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest === index) break;

      this.swap(index, smallest);
      index = smallest;
    }
  }

  insert(num) {
    this.heap.push(num);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return min;
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  toString() {
    return this.heap;
  }
}

class MaxHeap {
  heap = [];

  getLeftChildIndex(i) {
    return i * 2 + 1;
  }

  getRightChildIndex(i) {
    return i * 2 + 2;
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  bubbleUp(i) {
    let index = i;

    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.heap[parentIndex] > this.heap[index]) break;

      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  bubbleDown(i) {
    let index = i;
    const length = this.heap.length;

    while (true) {
      let largest = index;
      const left = this.getLeftChildIndex(index);
      const right = this.getRightChildIndex(index);

      if (left < length && this.heap[left] > this.heap[largest]) {
        largest = left;
      }

      if (right < length && this.heap[right] > this.heap[largest]) {
        largest = right;
      }

      if (largest === index) break;

      this.swap(index, largest);
      index = largest;
    }
  }

  insert(num) {
    this.heap.push(num);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMax() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return max;
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  get() {
    return this.heap;
  }
}
