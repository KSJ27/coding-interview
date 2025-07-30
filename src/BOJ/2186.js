const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M, K] = input[0].split(" ").map(Number) ;
const board = input.slice(1, 1 + N).map((row) => row.split(""));
const word = input[1 + N];
let result = 0;

const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
]

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (board[i][j] !== word[0]) continue;
        bfs(i, j);
    }
}



function bfs(y, x) {
    const q = [];
    q.push([y, x, word.substring(0, 1)]);


    while (q.length > 0) {
        let [yCur, xCur, wordCur] = q.pop();
        if (wordCur === word) {
            result += 1;
            continue;
        }

        for (const [yDir, xDir] of dirs) {
            for (let i = 1; i <= K; i++) {
                const [yNew, xNew] = [yCur + yDir * i, xCur + xDir * i];
                if (yNew < 0 || yNew >= N || xNew < 0 || xNew >= M) continue;
                if (wordCur + board[yNew][xNew] !== word.substring(0, wordCur.length + 1)) continue;

                q.push([yNew, xNew, wordCur + board[yNew][xNew]]);
            }

        }
    }


}

console.log(result);