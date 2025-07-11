const fs = require("fs");

const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

class Stack {
  stack = [];

  constructor() {}

  push(item) {
    return this.stack.push(item);
  }

  pop() {
    return this.stack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  isEmpty() {
    return this.stack.length === 0;
  }
}

for (let line of input) {
  if (line === "0") break;

  const tokens = line.trim().split(" ").map(Number);
  const n = tokens[0];
  const heights = tokens.slice(1);

  console.log(largestRectangleArea(heights));
}

function largestRectangleArea(heights) {
  const stack = new Stack();
  let maxArea = 0;
  heights.push(0);

  for (let i = 0; i < heights.length; i++) {
    while (!stack.isEmpty() && heights[stack.top()] > heights[i]) {
      const top = stack.pop();
      const height = heights[top];
      const width = stack.isEmpty() ? i : i - stack.top() - 1;
      maxArea = Math.max(maxArea, height * width);
    }

    stack.push(i);
  }

  return maxArea;
}
