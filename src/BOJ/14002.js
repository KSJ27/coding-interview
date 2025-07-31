const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");
const N = Number(input[0]);
const A = input[1].split(" ").map(Number);

const dp = Array(N).fill(1);
const prev = Array(N).fill(-1);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (A[j] < A[i] && dp[j] + 1 > dp[i]) {
      dp[i] = dp[j] + 1;
      prev[i] = j;
    }
  }
}

let maxLen = 0;
let endIdx = 0;
for (let i = 0; i < N; i++) {
  if (dp[i] > maxLen) {
    maxLen = dp[i];
    endIdx = i;
  }
}

const result = [];
while (endIdx !== -1) {
  result.push(A[endIdx]);
  endIdx = prev[endIdx];
}

console.log(maxLen);
console.log(result.reverse().join(" "));
