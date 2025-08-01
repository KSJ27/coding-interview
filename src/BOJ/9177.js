const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const T = Number(input[0]);
const result = [];

const canMake = (word1, word2, word3) => {
  const results = [];

  const make = (w1, w2, i, j, curWord) => {
    if (i === w1.length && j === w2.length) {
      results.push(curWord);
      return;
    }

    if (i < w1.length) {
      make(w1, w2, i + 1, j, curWord + w1[i]);
    }

    if (j < w2.length) {
      make(w1, w2, i, j + 1, curWord + w2[j]);
    }
  };

  make(word1, word2, 0, 0, "");
  return results.find((word) => word === word3);
};

console.log(canMake("cat", "tree", "cattree"));

for (let i = 1; i <= T; i++) {
  const [word1, word2, target] = input[i].split(" ");
  result.push(`Data set ${i}: ${canMake(word1, word2, target) ? "yes" : "no"}`);
}

console.log(result.join("\n"));
