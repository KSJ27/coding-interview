const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

let T = parseInt(input[0]);
let idx = 1;

for (let t = 0; t < T; t++) {
  const K = parseInt(input[idx]);
  const files = input[idx + 1].split(" ").map(Number);

  const sum = Array(K + 1).fill(0);
  for (let i = 1; i <= K; i++) {
    sum[i] = sum[i - 1] + files[i - 1];
  }

  const dp = Array.from({ length: K }, () => Array(K).fill(0));

  for (let len = 2; len <= K; len++) {
    for (let i = 0; i <= K - len; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;

      for (let k = i; k < j; k++) {
        const cost = dp[i][k] + dp[k + 1][j] + (sum[j + 1] - sum[i]);
        dp[i][j] = Math.min(dp[i][j], cost);
      }
    }
  }

  console.log(dp[0][K - 1]);
  idx += 2;
}
