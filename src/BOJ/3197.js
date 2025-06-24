class ListNode {
  value;
  next = null;

  constructor(value) {
    this.value = value;
  }
}

class Queue {
  head = null;
  tail = null;
  size = 0;

  constructor() {}

  push(value) {
    const newNode = new ListNode(value);

    if (this.head === null) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size += 1;
  }

  pop() {
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

  isEmpty() {
    return this.size === 0;
  }
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [R, C] = input.shift().split(" ").map(Number);
const lake = input.map((row) => row.split(""));
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const swans = [];
const waterQueue = new Queue();
const waterVisited = Array.from({ length: R }, () => Array(C).fill(false));
const swansQueue = new Queue();
const swansVisited = Array.from({ length: R }, () => Array(C).fill(false));

const waterNextDay = new Queue(); // 다음날 녹일 얼음 탐색 시작점을 오늘 녹는 빙판으로 설정해서 탐색 범위를 줄이기 위해, 오늘 녹는 빙판을 저장한 변수
const swanNextDay = new Queue(); // 다음날 상대 백조 탐색 시작점을 오늘 녹는 빙판으로 설정해서 탐색 범위를 줄이기 위해, 오늘 녹는 빙판을 저장한 변수

for (let x = 0; x < R; x++) {
  for (let y = 0; y < C; y++) {
    if (lake[x][y] === "L") {
      swans.push([x, y]);
      lake[x][y] = ".";
      waterQueue.push([x, y]);
      waterVisited[x][y] = true;
    }
    if (lake[x][y] === ".") {
      waterQueue.push([x, y]);
      waterVisited[x][y] = true;
    }
  }
}

const [swanA, swanB] = swans;
swansQueue.push(swanA);
swansVisited[swanA[0]][swanA[1]] = true;

function meltIce() {
  while (!waterQueue.isEmpty()) {
    const [x, y] = waterQueue.pop();
    waterVisited[x][y] = true;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= R || ny >= C || waterVisited[nx][ny])
        continue;

      waterVisited[nx][ny] = true;

      if (lake[nx][ny] === "X") {
        lake[nx][ny] = ".";
        waterNextDay.push([nx, ny]);
      }
    }
  }
  while (!waterNextDay.isEmpty()) {
    waterQueue.push(waterNextDay.pop());
  }
}

function matchSwans() {
  while (!swansQueue.isEmpty()) {
    const [x, y] = swansQueue.pop();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= R || ny >= C || swansVisited[nx][ny])
        continue;

      if (nx === swanB[0] && ny === swanB[1]) {
        return true;
      }

      if (lake[nx][ny] === ".") {
        swansQueue.push([nx, ny]);
      } else if (lake[nx][ny] === "X") {
        swanNextDay.push([nx, ny]);
      }

      swansVisited[nx][ny] = true;
    }
  }

  while (!swanNextDay.isEmpty()) {
    const [x, y] = swanNextDay.pop();
    swansQueue.push([x, y]);
  }

  return false;
}

function run() {
  let day = 0;

  while (true) {
    if (matchSwans()) {
      return day;
    }

    meltIce();
    day++;
  }
}

console.log(run());
