const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().split("\r\n");

const [R, C] = input[0].split(" ").map(Number);
const cave = input.slice(1, 1 + R).map((row) => row.split(""));
const N = Number(input[input.length - 2]);
const heights = input[input.length - 1]
  .split(" ")
  .map((height) => R - Number(height)); // 막대(창)를 던지는 높이와 cave 배열의 인덱스를 맞춰줌.

class Node {
  value;
  next = null;

  constructor(value) {
    this.value = value;
  }
}

class Queue {
  head = null;
  tail = null;
  size = 0;

  constructor() {}

  push(value) {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      if (this.tail !== null) {
        this.tail.next = newNode;
        this.tail = this.tail.next;
      }
    }

    this.size += 1;
  }

  pop() {
    if (this.head === null) {
      return undefined;
    }

    const value = this.head.value;
    this.head = this.head.next;

    this.size -= 1;
    return value;
  }

  isEmpty() {
    return this.size === 0;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
}

function throwSpear(turn, height) {
  const startingPoint = turn % 2 === 0 ? "L" : "R";

  if (startingPoint === "L") {
    for (let i = 0; i < C; i++) {
      if (cave[height][i] !== "x") continue;

      cave[height][i] = ".";
      break;
    }
  }

  if (startingPoint === "R") {
    for (let i = C - 1; i >= 0; i--) {
      if (cave[height][i] !== "x") continue;

      cave[height][i] = ".";
      break;
    }
  }
}

const xDir = [1, -1, 0, 0];
const yDir = [0, 0, 1, -1];
const isVisited = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => false)
);
const q = new Queue();

function cleanup(height) {
  // 떨어지는 클러스터인지 아닌지 어떻게 구분할 수 있을까? - 섬 찾기: 4개 방향으로 이어지지 않는 클러스터 찾기. 섬의 가장 아래 미네랄이 가장 아래에 위치하지 않다면 떨어져야하는 클러스터이다.
  // 클러스터의 모양을 유지한 채로 떨어지는 걸 어떻게 구현할까?

  const clusters = [];
  let clusterNumber = 0;
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      isVisited[i][j] = false;
    }
  }
  q.clear();

  function findFell() {
    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C; j++) {
        if (isVisited[i][j] || cave[i][j] === ".") continue;

        q.push([i, j]);
        isVisited[i][j] = true;
        clusters[clusterNumber] = [[i, j]];

        while (!q.isEmpty()) {
          const [x, y] = q.pop();

          for (let k = 0; k < 4; k++) {
            let [newX, newY] = [x + xDir[k], y + yDir[k]];

            if (
              newX < 0 ||
              newX >= R ||
              newY < 0 ||
              newY >= C ||
              isVisited[newX][newY]
            )
              continue;

            if (cave[newX][newY] === ".") continue;

            const newPosition = [newX, newY];
            clusters[clusterNumber].push(newPosition);
            q.push(newPosition);
            isVisited[newX][newY] = true;
          }
        }

        clusterNumber += 1;
      }
    }
  }

  findFell();

  function dropCluster(cluster) {
    let maxDrop = R;

    for (const [x, y] of cluster) {
      let dropDistance = 0;
      for (let newX = x + 1; newX < R; newX++) {
        if (
          cave[newX][y] === "x" &&
          !cluster.some((pos) => pos[0] === newX && pos[1] === y)
        ) {
          break; // 다른 미네랄에 막힘
        }
        dropDistance++;
        if (newX === R - 1) break; // 바닥에 도달
      }
      maxDrop = Math.min(maxDrop, dropDistance);
    }

    if (maxDrop > 0) {
      // 기존 위치에서 미네랄 제거
      cluster.forEach(([x, y]) => {
        cave[x][y] = ".";
      });

      // 새 위치에 미네랄 배치
      cluster.forEach((position) => {
        position[0] += maxDrop;
        cave[position[0]][position[1]] = "x";
      });
    }
  }

  // 각 클러스터가 떨어져야 하는지 확인하고 떨어뜨리기
  for (const cluster of clusters) {
    const touchesGround = cluster.some(([x, y]) => x === R - 1);
    if (!touchesGround) {
      dropCluster(cluster);
    }
  }
}

/* 
반복
  1. 창 던지기
  2. 미네랄 파괴
  3. 클러스터 정리
*/

for (let i = 0; i < N; i++) {
  throwSpear(i, heights[i]);
  cleanup(heights[i]);
}

console.log(cave.map((row) => row.join("")).join("\n"));

/* solution
const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");
const [R, C] = input[0].split(" ").map(Number);
const cave = input.slice(1, 1 + R).map(row => row.split(''));
const N = Number(input[1 + R]);
const heights = input[2 + R].split(' ').map(h => R - Number(h));

// 던질 때마다 해당 높이에서 가장 가까운 미네랄을 제거
function throwSpear(turn, height) {
  if (turn % 2 === 0) { // 왼쪽에서
    for (let y = 0; y < C; y++) {
      if (cave[height][y] === 'x') {
        cave[height][y] = '.';
        break;
      }
    }
  } else { // 오른쪽에서
    for (let y = C - 1; y >= 0; y--) {
      if (cave[height][y] === 'x') {
        cave[height][y] = '.';
        break;
      }
    }
  }
}

// 중력 적용: 바닥과 연결된 미네랄 표시 후, 떠 있는 모든 조각만 떨굼
function applyGravity() {
  // 1) 바닥 연결된 미네랄 방문 표시
  const visited = Array.from({ length: R }, () => Array(C).fill(false));
  const queue = [];
  // 바닥 행에서 시작
  for (let y = 0; y < C; y++) {
    if (cave[R - 1][y] === 'x') {
      visited[R - 1][y] = true;
      queue.push([R - 1, y]);
    }
  }
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (queue.length) {
    const [x, y] = queue.shift();
    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= R || ny < 0 || ny >= C) continue;
      if (!visited[nx][ny] && cave[nx][ny] === 'x') {
        visited[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }
  }

  // 2) 떠 있는 클러스터 수집 및 제거
  const floating = [];
  for (let x = 0; x < R; x++) {
    for (let y = 0; y < C; y++) {
      if (cave[x][y] === 'x' && !visited[x][y]) {
        floating.push([x, y]);
        cave[x][y] = '.';
      }
    }
  }
  if (floating.length === 0) return;

  // 3) 최소 떨어질 거리 계산
  let maxDrop = R;
  for (const [x, y] of floating) {
    let drop = 0;
    while (true) {
      const nx = x + drop + 1;
      if (nx >= R) break;              // 바닥
      if (cave[nx][y] === 'x') break; // 다른 미네랄
      drop++;
    }
    maxDrop = Math.min(maxDrop, drop);
  }

  // 4) 클러스터 다시 배치
  for (const [x, y] of floating) {
    cave[x + maxDrop][y] = 'x';
  }
}

// 메인 루프
for (let i = 0; i < N; i++) {
  throwSpear(i, heights[i]);
  applyGravity();
}

// 결과 출력
const output = cave.map(row => row.join('')).join('\n');
console.log(output);


*/
