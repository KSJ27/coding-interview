/*
  호수의 크기: 1 - 1500^2 (1,000,000) 
  최대 NlogN
  백조는 어느 길로 가든 만나기만 하면됨(길을 특정할 수 없음.)
  물과 가로/세로로 접촉한 빙판은 1일만에 녹음.
  
  쉽게 떠오르는 건 빙판이 언제 녹는지 빙판 칸에 표시하는 거

  1. 호수로 이뤄진 섬에서 반복해서 빙판에 남은 날짜를 표시한다.
    섬에서 가장 가까운 빙판부터 1 -> 이어진 가장 먼 빙판까지 녹을 날짜를 표시
  2. 녹이기 시작
    날짜 0에서 백조 하나를 기준으로 다른 백조로 어떻게든 도착할 수 있는지 여부를 확인
    못찾으면 날짜 +1, 그에 해당하는 빙판 녹임
    또 탐색
    ...
*/

// class Point {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }

//   toString() {
//     return `(${this.x}, ${this.y})`;
//   }
// }

// const dx = [1, 0, -1, 0];
// const dy = [0, 1, 0, -1];

// function bfs(current, board, isVisited) {
//   const q = new Queue();
//   let cur = current;
//   const xSize = board.length;
//   const ySize = board.length;

//   q.push(cur);
//   isVisited[cur.x][cur.y] = true;

//   while (!q.isEmpty()) {
//     cur = q.dequeue();

//     for (let i = 0; i < 4; i++) {
//       if (
//         cur.x + dx[i] < 0 ||
//         cur.x >= xSize ||
//         cur.y + dy[i] < 0 ||
//         cur.y >= ySize
//       )
//         continue;

//       if (isVisited[cur.x + dx[i]][cur.y + dy[i]]) continue;

//       q.enqueue(new Point(current.x + dx[i], current.y + dy[j]));
//       isVisited[cur.x + dx[i]][cur.y + dy[i]] = true;
//     }
//   }
// }

// class Queue {
//   constructor() {
//     this.queue = [];
//     this.front = 0;
//     this.rear = 0;
//   }

//   push(item) {
//     this.queue.push(item);
//     this.rear += 1;
//   }

//   pop() {
//     if (this.isEmpty()) {
//       return undefined;
//     }

//     // 메모리 효율성을 위해 큐 정리
//     if (this.front > 100) {
//       this.queue = this.queue.slice(this.front);
//       this.rear -= this.front;
//       this.front = 0;
//     }

//     return this.queue[this.front++];
//   }

//   isEmpty() {
//     return this.rear === this.front;
//   }

//   size() {
//     return this.rear - this.front;
//   }
// }

class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(item) {
    const node = new Node(item);
    if (this.head == null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.length++;
  }

  pop() {
    if (this.length === 0) return null;
    const popItem = this.head.item;
    this.head = this.head.next;
    this.length--;
    return popItem;
  }

  isEmpty() {
    return this.length === 0;
  }
}

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const [R, C] = input.shift().split(" ").map(Number);
  const lake = input.map((row) => row.split(""));
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const visited = Array.from({ length: R }, () => Array(C).fill(false));
  const swansVisited = Array.from({ length: R }, () => Array(C).fill(false));
  const swans = [];
  const waterQueue = new Queue();
  const swanQueue = new Queue();
  const swanTemp = new Queue();

  for (let x = 0; x < R; x++) {
    for (let y = 0; y < C; y++) {
      if (lake[x][y] === "L") {
        swans.push([x, y]);
        lake[x][y] = ".";
        waterQueue.push([x, y]);
      }
      if (lake[x][y] === ".") {
        waterQueue.push([x, y]);
      }
    }
  }

  swanQueue.push(swans[0]);
  swansVisited[swans[0][0]][swans[0][1]] = true;

  function meltIce() {
    const newQueue = new Queue();

    while (!waterQueue.isEmpty()) {
      const [x, y] = waterQueue.pop();
      visited[x][y] = true;

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || ny < 0 || nx >= R || ny >= C || visited[nx][ny]) continue;

        visited[nx][ny] = true;

        if (lake[nx][ny] === "X") {
          lake[nx][ny] = ".";
          newQueue.push([nx, ny]);
        }
      }
    }
    while (!newQueue.isEmpty()) {
      waterQueue.push(newQueue.pop());
    }
  }

  function swansMeet() {
    while (!swanQueue.isEmpty()) {
      const [x, y] = swanQueue.pop();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || ny < 0 || nx >= R || ny >= C || swansVisited[nx][ny])
          continue;

        if (nx === swans[1][0] && ny === swans[1][1]) {
          return true;
        }

        if (lake[nx][ny] === ".") {
          swanQueue.push([nx, ny]);
        } else if (lake[nx][ny] === "X") {
          swanTemp.push([nx, ny]);
        }

        swansVisited[nx][ny] = true;
      }
    }

    while (!swanTemp.isEmpty()) {
      const [x, y] = swanTemp.pop();
      swanQueue.push([x, y]);
    }
    return false;
  }

  function BFS() {
    let day = 0;

    while (true) {
      if (swansMeet()) {
        return day;
      }

      meltIce();
      day++;
    }
  }

  console.log(BFS());

  process.exit();
});
