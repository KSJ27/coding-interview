import { readLines } from "../utils/input";

readLines((lines) => {
  const str1 = lines[0];
  const str2 = lines[1];

  console.log(getLengthOfLCS(str1, str2));
});

function getLengthOfLCS(str1: string, str2: string) {
  const m = str1.length;
  const n = str2.length;

  const dp = Array.from({ length: m + 1 }, () =>
    Array.from({ length: n + 1 }, () => 0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}
