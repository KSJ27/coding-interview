const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = 8;
let board = input.map((line) => line.split(""));

// 8방향 + 제자리
const dx = [-1, -1, -1, 0, 0, 0, 1, 1, 1];
const dy = [-1, 0, 1, -1, 0, 1, -1, 0, 1];

function moveWalls(b) {
  let newBoard = Array.from({ length: N }, () => Array(N).fill("."));
  for (let i = N - 2; i >= 0; i--) {
    for (let j = 0; j < N; j++) {
      if (b[i][j] === "#") {
        newBoard[i + 1][j] = "#";
      }
    }
  }
  return newBoard;
}

function isSafe(x, y, b) {
  return x >= 0 && x < N && y >= 0 && y < N && b[x][y] === ".";
}

function bfs() {
  let queue = [];
  queue.push([7, 0]);
  let boardNow = board;

  for (let time = 0; time < 100; time++) {
    let nextQueue = [];
    let visited = Array.from({ length: N }, () => Array(N).fill(false));

    while (queue.length) {
      const [x, y] = queue.shift();

      if (boardNow[x][y] === "#") continue;
      if (x === 0 && y === 7) return 1;

      for (let d = 0; d < 9; d++) {
        const nx = x + dx[d];
        const ny = y + dy[d];
        if (isSafe(nx, ny, boardNow) && !visited[nx][ny]) {
          visited[nx][ny] = true;
          nextQueue.push([nx, ny]);
        }
      }
    }

    boardNow = moveWalls(boardNow);
    queue = nextQueue;
    if (queue.length === 0) return 0;
  }

  return 0;
}

console.log(bfs());
