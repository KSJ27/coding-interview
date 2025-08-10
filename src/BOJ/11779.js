const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = Number(input[0]);
const m = Number(input[1]);
const adjList = Array.from({ length: n + 1 }, () => []);

for (let i = 2; i < m + 2; i++) {
  const [u, v, w] = input[i].split(" ").map(Number);
  adjList[u].push([v, w]);
}

const [start, end] = input[m + 2].split(" ").map(Number);

function dijkstra(start, adjList, n) {
  const dist = Array(n + 1).fill(1_000_000_000);
  const prev = Array(n + 1).fill(-1);
  dist[start] = 0;
  const pq = [[start, 0]]; // [vertex, dist]

  while (pq.length) {
    pq.sort((a, b) => a[1] - b[1]); // 거리 기준 오름차순
    const [vertex, weight] = pq.shift();
    if (weight > dist[vertex]) continue;

    for (const [v, w] of adjList[vertex]) {
      if (dist[v] > dist[vertex] + w) {
        dist[v] = dist[vertex] + w;
        prev[v] = vertex;
        pq.push([v, dist[v]]);
      }
    }
  }
  return [dist, prev];
}

const [dist, prev] = dijkstra(start, adjList, n);
// 경로 복원
const path = [];
let cur = end;
while (cur !== -1) {
  path.push(cur);
  cur = prev[cur];
}
path.reverse();

// 출력: 최소비용, 경로 길이, 경로
let out = "";
out += dist[end] + "\n";
out += path.length + "\n";
out += path.join(" ");
console.log(out);
