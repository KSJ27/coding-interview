// Linked List로 구현한 Queue

class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class Queue<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  size: number = 0;

  constructor() {}

  push(value: T): void {
    const newNode = new ListNode(value);

    if (this.head === null) {
      this.head = this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }

    this.size += 1;
  }

  pop(): T | undefined {
    if (this.head === null) {
      return undefined;
    }

    const value = this.head.value;
    this.head = this.head.next;

    if (this.head === null) {
      this.tail = null;
    }

    this.size -= 1;

    return value;
  }

  peek(): T | undefined {
    return this.head === null ? undefined : this.head.value;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
}
