const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString();

const N = BigInt(input);
const DIVISOR = 1_000_000n;

function multiply(a, b) {
  return [
    [
      (a[0][0] * b[0][0] + a[0][1] * b[1][0]) % DIVISOR,
      (a[0][0] * b[0][1] + a[0][1] * b[1][1]) % DIVISOR,
    ],
    [
      (a[1][0] * b[0][0] + a[1][1] * b[1][0]) % DIVISOR,
      (a[1][0] * b[0][1] + a[1][1] * b[1][1]) % DIVISOR,
    ],
  ];
}

function power(base, exponent) {
  let result = [
    [1n, 0n],
    [0n, 1n],
  ];

  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = multiply(result, base);
    }
    base = multiply(base, base);
    exponent = exponent / 2n;
  }

  return result;
}

function fibonacci(N) {
  if (N === 0) return 0;
  const baseMatrix = [
    [1n, 1n],
    [1n, 0n],
  ];
  const result = power(baseMatrix, N - 1n);
  return result[0][0];
}

console.log(fibonacci(N).toString());
