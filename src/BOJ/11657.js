const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const edges = [];

for (let i = 1; i <= m; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  edges.push([a, b, c]);
}

const INF = Infinity;
const dist = new Array(n + 1).fill(INF);
dist[1] = 0;

let hasNegativeCycle = false;

for (let i = 1; i <= n; i++) {
  for (const [u, v, cost] of edges) {
    if (dist[u] !== INF && dist[v] > dist[u] + cost) {
      dist[v] = dist[u] + cost;
      if (i === n) {
        hasNegativeCycle = true;
      }
    }
  }
}

if (hasNegativeCycle) {
  console.log(-1);
} else {
  for (let i = 2; i <= n; i++) {
    console.log(dist[i] === INF ? -1 : dist[i]);
  }
}
