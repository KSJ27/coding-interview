const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");
let line = 0;

class Queue {
  queue = [];
  front = 0;
  rear = 0;

  constructor() {}

  push(value) {
    this.queue.push(value);
    this.rear += 1;
  }

  pop() {
    if (this.front === this.rear) return undefined;
    return this.queue[this.front++];
  }

  isEmpty() {
    return this.front === this.rear;
  }
}

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

while (line < input.length - 1) {
  const [W, H] = input[line].split(" ").map(Number);
  line += 1;
  const room = input.slice(line, line + H).map((row) => row.trim().split(""));
  line += H;

  const startPoint = [];
  const dirtyPoints = [];
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (room[i][j] === "o") startPoint.push([i, j]);
      if (room[i][j] === "*") dirtyPoints.push([i, j]);
    }
  }
  const points = startPoint.concat(dirtyPoints);

  const adj = Array.from({ length: points.length }, () =>
    Array.from({ length: points.length }, () => Infinity)
  );

  const queue = new Queue();

  for (let i = 0; i < points.length; i++) {
    const isVisited = Array.from({ length: H }, () =>
      Array.from({ length: W }, () => false)
    );
    const roomCost = Array.from({ length: H }, () =>
      Array.from({ length: W }, () => Infinity)
    );

    const [x, y] = points[i];
    queue.push([x, y, 0]);
    isVisited[x][y] = true;
    roomCost[x][y] = 0;

    while (!queue.isEmpty()) {
      const [curX, curY, dist] = queue.pop();

      for (const [dx, dy] of dirs) {
        const [nx, ny] = [curX + dx, curY + dy];

        if (nx < 0 || nx >= H || ny < 0 || ny >= W) continue;
        if (isVisited[nx][ny] || room[nx][ny] === "x") continue;

        roomCost[nx][ny] = dist + 1;
        queue.push([nx, ny, dist + 1]);
        isVisited[nx][ny] = true;
      }
    }

    for (let j = i; j < points.length; j++) {
      const [targetX, targetY] = points[j];
      adj[i][j] = adj[j][i] = roomCost[targetX][targetY];
    }
  }

  const N = adj.length;
  const dp = Array.from({ length: N }, () => Array(1 << N).fill(-1));

  function tsp(cur, visited) {
    if (visited === (1 << N) - 1) return 0;

    if (dp[cur][visited] !== -1) return dp[cur][visited];

    let minCost = Infinity;

    for (let next = 0; next < N; next++) {
      if ((visited & (1 << next)) === 0 && adj[cur][next] !== Infinity) {
        const cost = adj[cur][next] + tsp(next, visited | (1 << next));
        minCost = Math.min(minCost, cost);
      }
    }

    return (dp[cur][visited] = minCost);
  }

  const result = tsp(0, 1 << 0);
  console.log(result === Infinity ? -1 : result);
}
