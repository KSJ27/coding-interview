/*
optimal substructure? : (1~N-1 비용의 최소값 + N의 비용) 중 최소값 (이때 N은 RGB 중 하나의 색깔을 가짐) = 1~N 비용 최소값
overlapping subproblem? : 1~i 비용은 1~i+1, 1~i+2, ... 비용에 재사용됨. 
DP를 만족. 

점화식
f(i, colorR, startColor) = min(...[f(i, not-colorR, startColor)]) + cost(i, colorR)
f(0, startColor, startColor) = cost(i, startColor)

f(1, r, b) = min(f(0, b, b) + cost(1, r), f(0, g, b) + cost(1, r))
*/

// 첫번째 풀이: http://boj.kr/9911b26135364f28b2eae5f8518a31ec

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const costs = input.slice(1).map((line) => line.split(" ").map(Number));

let answer = Infinity;

for (let startColor = 0; startColor < 3; startColor++) {
  let prev = [Infinity, Infinity, Infinity];
  prev[startColor] = costs[0][startColor];

  for (let i = 1; i < N; i++) {
    const curr = [0, 0, 0];
    curr[0] = Math.min(prev[1], prev[2]) + costs[i][0];
    curr[1] = Math.min(prev[0], prev[2]) + costs[i][1];
    curr[2] = Math.min(prev[0], prev[1]) + costs[i][2];
    prev = curr;
  }

  // 마지막 집은 startColor와 다른 색만 허용
  for (let endColor = 0; endColor < 3; endColor++) {
    if (endColor !== startColor) {
      answer = Math.min(answer, prev[endColor]);
    }
  }
}

console.log(answer);
