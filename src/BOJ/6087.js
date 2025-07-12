const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const [W, H] = input[0].split(" ").map(Number);
const map = input.slice(1).map((line) => line.trim().split(""));

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

const cPoints = [];
for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (map[i][j] === "C") cPoints.push([i, j]);
  }
}

const [sx, sy] = cPoints[0];
const [ex, ey] = cPoints[1];

const visited = Array.from({ length: H }, () =>
  Array.from({ length: W }, () => Array(4).fill(Infinity))
);

const deque = [];

for (let dir = 0; dir < 4; dir++) {
  visited[sx][sy][dir] = 0;
  deque.push([sx, sy, dir, 0]); // [x, y, direction, mirrorCount]
}

while (deque.length > 0) {
  const [x, y, dir, mirrors] = deque.shift();

  const nx = x + dx[dir];
  const ny = y + dy[dir];

  if (0 <= nx && nx < H && 0 <= ny && ny < W && map[nx][ny] !== "*") {
    if (visited[nx][ny][dir] > mirrors) {
      visited[nx][ny][dir] = mirrors;
      deque.unshift([nx, ny, dir, mirrors]);
    }
  }

  for (let nd = 0; nd < 4; nd++) {
    if (nd === dir || (nd + 2) % 4 === dir) continue;
    const nx2 = x + dx[nd];
    const ny2 = y + dy[nd];

    if (0 <= nx2 && nx2 < H && 0 <= ny2 && ny2 < W && map[nx2][ny2] !== "*") {
      if (visited[nx2][ny2][nd] > mirrors + 1) {
        visited[nx2][ny2][nd] = mirrors + 1;
        deque.push([nx2, ny2, nd, mirrors + 1]);
      }
    }
  }
}

const result = Math.min(...visited[ex][ey]);
console.log(result);
