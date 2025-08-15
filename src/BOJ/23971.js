const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim();

const [H, W, N, M] = input.split(" ").map(Number);

const row = Math.ceil(H / (N + 1));
const col = Math.ceil(W / (M + 1));

console.log(row * col);
