/*
  1,000,000 -> NlogN 이하
  이항 계수의 정의: n! / (k!*(n-k)!)
  기본 O(N)

  연산이 다시 쓰이는 게 뭐가 있을까
  이항 계수는 세개의 팩토리얼로 연산하는 거다 -> 팩토리얼 연산 결과를 기억해놓고, 필요할 때 쓰면 된다.
  ((A mod C) * (B mod C)) mod C ≡ (A * B) mod C

  나누기는 어떻게 하지?
  -> 페르마의 소정리: a^(p-1) ≡ 1 (mod p) <=> a^(p-2) ≡ a^(-1) (mod p)
*/

const fs = require("fs");
const [N, K] = fs
  .readFileSync("./dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const DIVISOR = 1000000007n; // BigInt로 변환

function power(base, exponent) {
  let result = 1n;
  base = BigInt(base) % DIVISOR;
  exponent = BigInt(exponent);

  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % DIVISOR;
    }
    exponent = exponent / 2n;
    base = (base * base) % DIVISOR;
  }

  return result;
}

const factorial = Array(N + 1)
  .fill()
  .map((_, i) => (i === 0 ? 1n : 0n));

for (let i = 1; i <= N; i++) {
  factorial[i] = (factorial[i - 1] * BigInt(i)) % DIVISOR;
}

const numerator = factorial[N];
const denominator = (factorial[K] * factorial[N - K]) % DIVISOR;
const denominatorInverse = power(denominator, DIVISOR - 2n);

const result = (numerator * denominatorInverse) % DIVISOR;

console.log(Number(result));
