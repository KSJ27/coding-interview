const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = Number(input[0]);
const grid = input.slice(1).map((line) => line.split(" ").map(Number));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function isPossible(diff) {
  for (let min = 0; min <= 200; min++) {
    const max = min + diff;
    if (grid[0][0] < min || grid[0][0] > max) continue;

    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    const queue = [];
    queue.push([0, 0]);
    visited[0][0] = true;

    while (queue.length) {
      const [x, y] = queue.shift();
      if (x === n - 1 && y === n - 1) return true;

      for (let d = 0; d < 4; d++) {
        const nx = x + dx[d];
        const ny = y + dy[d];

        if (
          nx >= 0 &&
          nx < n &&
          ny >= 0 &&
          ny < n &&
          !visited[nx][ny] &&
          grid[nx][ny] >= min &&
          grid[nx][ny] <= max
        ) {
          visited[nx][ny] = true;
          queue.push([nx, ny]);
        }
      }
    }
  }
  return false;
}

function solve() {
  let left = 0;
  let right = 200;
  let answer = 200;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (isPossible(mid)) {
      answer = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  console.log(answer);
}

solve();
