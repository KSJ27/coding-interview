/*
  2 ≤ N ≤  5, 1 ≤ B ≤ 100,000,000,000

  지수의 크기가 크기 때문에, O(N) 이상은 불가, O(logN) 이하로 풀어야 함.
  행렬을 N번 곱해야하는데, 연산 수는 logN 이하로 문제를 풀려면?
*/

const fs = require("fs");

const lines = fs
  .readFileSync("./dev/stdin")
  .toString()
  .split("\n")
  .map((line) => line.trim().split(" ").map(Number));

const [N, EXPONENT] = lines[0];
const matrix = lines.slice(1);
const DIVISOR = 1_000;

/**
 * 두 행렬의 곱연산 결과를 반환합니다.
 */
function multiply(m1, m2) {
  const result = Array.from({ length: N }, () => new Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < N; k++) {
        result[i][j] += m1[i][k] * m2[k][j];
      }

      result[i][j] %= DIVISOR;
    }
  }

  return result;
}

/**
 * 행렬의 N 제곱 결과를 반환합니다.
 */
function power(base, exponent) {
  let result = Array.from({ length: N }, (_, i) =>
    Array.from({ length: N }, (_, j) => (i === j ? 1 : 0))
  );

  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = multiply(result, base);
    }

    base = multiply(base, base);
    exponent = Math.floor(exponent / 2);
  }

  return result;
}

let answer = power(matrix, EXPONENT);

answer = answer.map((row) => row.join(" "));

console.log(answer.join("\n"));
