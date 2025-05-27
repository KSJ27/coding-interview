import * as readline from "readline";

export function readLines(callback: (lines: string[]) => void) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const lines: string[] = [];

  rl.on("line", (line) => {
    lines.push(line);
  }).on("close", () => {
    callback(lines);
  });
}
