const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = parseInt(input[0]);
const map = input.slice(1).map((line) => line.split(""));

const dirs = [
  [-1, 0], // 위
  [1, 0], // 아래
  [0, -1], // 왼쪽
  [0, 1], // 오른쪽
];

let doors = [];

// 문 위치 찾기
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === "#") {
      doors.push([i, j]);
    }
  }
}

const [sy, sx] = doors[0];
const [ey, ex] = doors[1];

// visited[y][x][dir] = 최소 거울 개수
const visited = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => Array(4).fill(Infinity))
);

const deque = [];
for (let d = 0; d < 4; d++) {
  visited[sy][sx][d] = 0;
  deque.push([sy, sx, d, 0]);
}

while (deque.length > 0) {
  const [y, x, dir, cnt] = deque.shift();

  const [dy, dx] = dirs[dir];
  const ny = y + dy;
  const nx = x + dx;

  if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
  if (map[ny][nx] === "*") continue;
  if (visited[ny][nx][dir] <= cnt) continue;

  visited[ny][nx][dir] = cnt;

  // 현재 방향으로 직진 (거울 없음)
  deque.unshift([ny, nx, dir, cnt]);

  // 방향 전환 (거울 설치 가능할 때만)
  if (map[ny][nx] === "!") {
    const turns = getTurnDirs(dir);
    for (const newDir of turns) {
      if (visited[ny][nx][newDir] > cnt + 1) {
        visited[ny][nx][newDir] = cnt + 1;
        deque.push([ny, nx, newDir, cnt + 1]);
      }
    }
  }
}

let answer = Infinity;
for (let i = 0; i < 4; i++) {
  answer = Math.min(answer, visited[ey][ex][i]);
}
console.log(answer);

// 현재 방향에서 가능한 방향 전환 리턴 (거울 설치 시)
function getTurnDirs(dir) {
  if (dir === 0 || dir === 1) return [2, 3]; // 위 or 아래 → 좌 or 우
  else return [0, 1]; // 좌 or 우 → 위 or 아래
}
