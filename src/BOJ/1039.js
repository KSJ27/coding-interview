const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim().split(" ");

const [N, K] = input;

if (N.length < 2 || (N.length === 2 && N.includes("0") && N[1] === "0")) {
  console.log(-1);
  process.exit();
}

const answer = solve(N, parseInt(K));
console.log(answer);

function solve(N, K) {
  const queue = [];
  const visited = Array.from({ length: K + 1 }, () => new Set());

  queue.push([N, 0]);
  visited[0].add(N);

  let maxResult = -1;

  while (queue.length > 0) {
    const [cur, cnt] = queue.shift();

    if (cnt === K) {
      maxResult = Math.max(maxResult, parseInt(cur));
      continue;
    }

    const curArr = cur.split("");
    const len = curArr.length;

    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const tmp = [...curArr];
        [tmp[i], tmp[j]] = [tmp[j], tmp[i]];

        if (tmp[0] === "0") continue;

        const swapped = tmp.join("");
        if (!visited[cnt + 1].has(swapped)) {
          queue.push([swapped, cnt + 1]);
          visited[cnt + 1].add(swapped);
        }
      }
    }
  }

  return maxResult;
}
