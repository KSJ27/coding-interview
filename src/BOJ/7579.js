const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const m = input[1].split(" ").map(Number);
const c = input[2].split(" ").map(Number);

const maxCost = c.reduce((prev, cur) => prev + cur, 0);
const dp = Array.from({ length: maxCost + 1 }, () => 0);

for (let i = 0; i < N; i++) {
  for (let j = maxCost; j >= c[i]; j--) {
    dp[j] = Math.max(dp[j], dp[j - c[i]] + m[i]);
  }
}

for (let i = 0; i <= maxCost; i++) {
  if (dp[i] >= M) {
    console.log(i);
    break;
  }
}
