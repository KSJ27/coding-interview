/*
case 1
[[1, 2, 4],
[1, 3, 3],
[2, 3, -1],
[3, 1, -2]]

[0, 4, 3]

case 2
  [[1, 2, 4],
  [1, 3, 3],
  [2, 3, -4],
  [3, 1, -2]]

  -1 // 음의 순환
*/
const N = 3;
const edges = [
  [1, 2, 4],
  [1, 3, 3],
  [2, 3, -1],
  [3, 1, -2],
];

const INF = Infinity;
const dist = new Array(N + 1).fill(INF);

let hasNegativeCycle = false;

// 하나의 출발 노드에서 다른 노드까지 최단 거리를 구한다.
const bf = (start: number): number[] | -1 => {
  dist[start] = 0;

  // 최단 경로를 안정적으로 계산하려면 n - 1번 반복해서 거리 정보를 업데이트해야 한다.
  for (let i = 1; i <= N; i++) {
    for (const [u, v, cost] of edges) {
      // 현재 u로 도달하는 경로가 존재하는 경우 & u를 거쳐서 v로 가는 경로가 현재 u로 도달하는 경로보다 더 짧은 경우
      if (dist[u] !== INF && dist[v] > dist[u] + cost) {
        dist[v] = dist[u] + cost;
        // n번째 반복 시에도 거리 정보가 업데이트된다면, 음의 순환이 발생한다고 본다.
        if (i === N) {
          hasNegativeCycle = true;
        }
      }
    }
  }

  if (hasNegativeCycle) {
    return -1;
  } else {
    return dist;
  }
};

console.log(bf(1));
