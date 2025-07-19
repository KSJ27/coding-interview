const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

let idx = 0;
const T = +input[idx++];

function dijkstra(start, graph, n) {
  const dist = Array(n + 1).fill(1_000_000_000);
  dist[start] = 0;
  const pq = [[0, start]];

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift();
    if (d > dist[u]) continue;

    for (const [v, w] of graph[u]) {
      if (dist[v] > dist[u] + w) {
        dist[v] = dist[u] + w;
        pq.push([dist[v], v]);
      }
    }
  }
  return dist;
}

for (let t = 0; t < T; t++) {
  const [n, m, tt] = input[idx++].split(" ").map(Number);
  const [s, g, h] = input[idx++].split(" ").map(Number);

  const graph = Array.from({ length: n + 1 }, () => []);
  let ghDist = null;

  for (let i = 0; i < m; i++) {
    const [a, b, d] = input[idx++].split(" ").map(Number);
    graph[a].push([b, d]);
    graph[b].push([a, d]);
    if ((a === g && b === h) || (a === h && b === g)) {
      ghDist = d;
    }
  }

  const targets = [];
  for (let i = 0; i < tt; i++) {
    targets.push(+input[idx++]);
  }
  targets.sort((a, b) => a - b);

  const distS = dijkstra(s, graph, n);
  const distG = dijkstra(g, graph, n);
  const distH = dijkstra(h, graph, n);

  const result = [];

  for (const x of targets) {
    const viaGH = distS[g] + ghDist + distH[x];
    const viaHG = distS[h] + ghDist + distG[x];
    if (distS[x] === viaGH || distS[x] === viaHG) {
      result.push(x);
    }
  }

  console.log(result.join(" "));
}
