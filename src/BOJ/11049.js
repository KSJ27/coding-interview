const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const N = +input[0];
const dims = input.slice(1).map((line) => line.split(" ").map(Number));

const dp = Array.from({ length: N }, () => Array(N).fill(0));

for (let len = 2; len <= N; len++) {
  for (let i = 0; i <= N - len; i++) {
    const j = i + len - 1;
    dp[i][j] = Infinity;

    for (let k = i; k < j; k++) {
      const cost =
        dp[i][k] + dp[k + 1][j] + dims[i][0] * dims[k][1] * dims[j][1];
      dp[i][j] = Math.min(dp[i][j], cost);
    }
  }
}

console.log(dp[0][N - 1]);
