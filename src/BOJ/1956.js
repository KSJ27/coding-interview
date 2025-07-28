const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const [V, E] = input[0].trim().split(" ").map(Number);
const INF = 10_001 * E;
const adj = Array.from({ length: V + 1 }, (_, i) =>
  Array.from({ length: V + 1 }, (_, j) => (i === j ? 0 : INF))
);
for (let i = 1; i <= E; i++) {
  const [u, v, d] = input[i].trim().split(" ").map(Number);
  adj[u][v] = d;
}

for (let k = 1; k <= V; k++) {
  for (let i = 1; i <= V; i++) {
    for (let j = 1; j <= V; j++) {
      adj[i][j] = Math.min(adj[i][j], adj[i][k] + adj[k][j]);
    }
  }
}

let minCycleDistance = INF;
for (let i = 1; i <= V; i++) {
  for (let j = 1; j <= V; j++) {
    if (i === j) continue;
    minCycleDistance = Math.min(minCycleDistance, adj[i][j] + adj[j][i]);
  }
}

console.log(minCycleDistance !== INF ? minCycleDistance : -1);
