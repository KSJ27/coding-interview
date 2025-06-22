// MinHeap은 부모 노드가 자식 노드보다 값이 작다는 조건을 가진 이진 트리이다.
// 힙의 루트 노드에는 항상 가장 작은 값이 저장된다.
// 힙은 Priority Queue(dequeue 시 가장 높은 우선순위를 반환 = 힙의 루트를 반환)를 효율적으로 구현할 수 있는 대표적인 방법이다.
// 힙 생성: O(N) 삽입: O(logN) 삭제: O(logN) 조회: O(1)
// 힙으로 정렬(루트 노드를 빼서 순서대로 두면 된다) 시 시간 복잡도는 O(NlogN) (삭제 연산을 노드 수만큼 실행)

class MinHeap {
  private heap: number[] = [];

  constructor(array: number[] = []) {
    if (array.length > 0) {
      this.buildHeap(array);
    }
  }

  private buildHeap(array: number[]): void {
    this.heap = array.slice();
    const start = Math.floor((this.heap.length - 2) / 2);
    for (let i = start; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  private getParentIndex(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  private getLeftChildIndex(i: number): number {
    return i * 2 + 1;
  }

  private getRightChildIndex(i: number): number {
    return i * 2 + 2;
  }

  private swap(idx1: number, idx2: number): void {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  private heapifyUp(): void {
    let index = this.heap.length - 1;
    while (
      index > 0 &&
      this.heap[this.getParentIndex(index)] > this.heap[index]
    ) {
      this.swap(index, this.getParentIndex(index));
      index = this.getParentIndex(index);
    }
  }

  private heapifyDown(index: number): void {
    const length = this.heap.length;

    while (this.getLeftChildIndex(index) < length) {
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

  insert(value: number): void {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractMin(): number | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    return min;
  }

  peek(): number | undefined {
    return this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }
}
