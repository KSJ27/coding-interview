const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().split("\n");

const N = Number(input[0]);
const M = Number(input[1]);

const edges = [];

for (let i = 2; i < M + 2; i++) {
  edges.push(input[i].split(" ").map(Number));
}

const costs = Array.from({ length: N }, (_, i) =>
  Array.from({ length: N }, (_, j) => (i === j ? 0 : Number.MAX_VALUE))
);

for (const [start, end, cost] of edges) {
  const from = start - 1;
  const to = end - 1;
  costs[from][to] = Math.min(costs[from][to], cost);
}

for (let k = 0; k < N; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (costs[i][j] > costs[i][k] + costs[k][j])
        costs[i][j] = costs[i][k] + costs[k][j];
    }
  }
}

for (let i = 0; i < N; i++) {
  const row = costs[i].map((cost) => (cost === Number.MAX_VALUE ? 0 : cost));
  console.log(row.join(" "));
}
