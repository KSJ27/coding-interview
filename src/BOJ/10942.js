/*
  N (1 ≤ N ≤ 2,000)
  M (1 ≤ M ≤ 1,000,000)
  가장 쉬운 방법은 펠린드롬을 찾는데 (1/2)N, 질문 개수 M -> N*M은 10억이기 때문에 시간 초과 예상.
  고려해본 것 1. 각 질문을  O(N) 미만으로 푸는 알고리즘이 있다면 활용. 2. 메모이제이션
  
  dp
  dp[start][end] = dp[start+1][end-1] && sequence[start] === sequence[end]
  dp[k][k] = true;
*/

const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().split("\n");

const N = Number(input[0]);
const sequence = [0, ...input[1].split(" ").map(Number)];
const M = Number(input[2]);
const questions = input
  .slice(3)
  .map((question) => question.split(" ").map(Number));

const dp = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

// 길이 1
for (let i = 1; i <= N; i++) {
  dp[i][i] = 1;
}

// 길이 2
for (let i = 1; i < N; i++) {
  if (sequence[i] === sequence[i + 1]) dp[i][i + 1] = 1;
}

// 길이 3 이상
for (let len = 3; len <= N; len++) {
  for (let s = 1; s <= N - len + 1; s++) {
    let e = s + len - 1;
    if (sequence[s] === sequence[e] && dp[s + 1][e - 1] === 1) {
      dp[s][e] = 1;
    }
  }
}

// 질문 처리
const result = [];
for (const [s, e] of questions) {
  result.push(dp[s][e]);
}

console.log(result.join("\n"));

// 첫 시도: 재귀
// const dp = Array.from({ length: N + 1 }, (_, i) =>
//   Array.from({ length: N + 1 }, (_, j) => (i === j ? true : false))
// );

// const isChecked = Array.from({ length: N + 1 }, (_, i) =>
//   Array.from({ length: N + 1 }, (_, j) => (i === j ? true : false))
// );

// const result = [];

// const checkPalindrom = (s, e) => {
//   if (s > e) return true;

//   if (!isChecked[s][e]) {
//     isChecked[s][e] = true;
//     dp[s][e] = sequence[s] === sequence[e] && checkPalindrom(s + 1, e - 1);
//   }

//   return dp[s][e];
// };

// for (let [start, end] of questions) {
//   const res = checkPalindrom(start, end) ? 1 : 0;
//   result.push(res);
// }

// console.log(result.join("\n"));
