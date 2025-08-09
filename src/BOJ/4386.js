const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const n = Number(input[0]);
const stars = input.slice(1).map((line) => line.split(" ").map(Number));

const adj = Array.from({ length: n }, () => Array(n).fill(Infinity));

for (let i = 0; i < n - 1; i++) {
  for (let j = i + 1; j < n; j++) {
    const dist = Math.sqrt(
      Math.pow(stars[i][0] - stars[j][0], 2) +
        Math.pow(stars[i][1] - stars[j][1], 2)
    );
    adj[i][j] = dist;
    adj[j][i] = dist;
  }
}

const visited = new Set([0]);
let starSize = 0;

while (visited.size < n) {
  let minDist = Infinity;
  let minDistV = null;

  for (const v of visited) {
    for (let i = 0; i < n; i++) {
      if (visited.has(i)) continue;

      if (adj[v][i] < minDist) {
        minDist = adj[v][i];
        minDistV = i;
      }
    }
  }

  visited.add(minDistV);
  starSize += minDist;
}

console.log(starSize.toFixed(2));
