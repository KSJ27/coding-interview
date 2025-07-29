const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((line) => line.trim().split("").map(Number));

const areaSize = []; // 각 영역의 크기
const areaId = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => -1)
);
const result = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => 0)
);

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function bfs(startY, startX, id) {
  const q = [[startY, startX]];
  areaId[startY][startX] = id;
  let size = 1;
  let index = 0;

  while (index < q.length) {
    const [y, x] = q[index++];

    for (const [dirY, dirX] of dirs) {
      const [newY, newX] = [y + dirY, x + dirX];
      if (newY < 0 || newY >= N || newX < 0 || newX >= M) continue;
      if (areaId[newY][newX] !== -1) continue;
      if (board[newY][newX] !== 0) continue;

      q.push([newY, newX]);
      areaId[newY][newX] = id;
      size++;
    }
  }

  return size;
}

// 모든 0 영역의 크기 계산
let currentId = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 0 && areaId[i][j] === -1) {
      const size = bfs(i, j, currentId);
      areaSize.push(size);
      currentId++;
    }
  }
}

// 각 벽에 대해 계산
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] !== 1) continue;

    let sum = 1;
    const visitedIds = new Set();

    for (const [dirY, dirX] of dirs) {
      const [adjY, adjX] = [i + dirY, j + dirX];
      if (adjY < 0 || adjY >= N || adjX < 0 || adjX >= M) continue;
      if (areaId[adjY][adjX] === -1) continue;

      const id = areaId[adjY][adjX];
      if (!visitedIds.has(id)) {
        visitedIds.add(id);
        sum += areaSize[id];
      }
    }
    result[i][j] = sum % 10;
  }
}

console.log(result.map((row) => row.join("")).join("\n"));
