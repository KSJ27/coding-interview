import { readLines } from "../utils/input";

// readLines((lines) => {
//   const nums = lines[0];

//   console.log(getLengthOfLIS(nums));
// });

function getLengthOfLIS(nums: Number[]) {
  // nums의 최대 길이: 1000
  // nums의 요소: 정수 N, -1000 <= N <= 1000인
  // 수의 크기가 증가하는 부분 수열 중 길이가 가장 긴 경우의 길이 구하기
  // DP 가능? -> 1. optimal substructure: abcd의 최적해는 abc의 최적해에 d를 더하냐마냐임  2. overlapping subproblems: abc의 부분 수열이 abcd의 부분 수열을 구하는데 쓰임.
  // 0~i 수열의 LIS는 0~i-1 수열의 LIS에서 그 LIS의 마지막 수가 nums[i]보다 작으면 i가 포함. 아니면 미포함

  // 메모이제이션을 위한 배열 dp 생성. 배열의 크기는 nums와 동일함.
  // dp[0] = 1
  // dp[i] = 0 <= k < i, nums[k] < nums[i] 인 경우 dp[k] + 1. 아니면 dp[k]. 이 중 max를 dp[i]에 저장
  //

  const n = nums.length;
  const dp = Array.from({ length: n }, () => 1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}

const TEST_CASE_1 = [1, 4, 2, 3, 1, 5, 7, 3]; // [1, 2, 3, 5, 7] => 5
const TEST_CASE_2 = [3, 2, 1]; // [3] or [2] or [1] => 1
const TEST_CASE_3 = [1, 2, 3, 2, 3, 2]; // [1,2,3]  => 3
const TEST_CASE_4 = [3, 2, 1, 3, 2, 4]; // [1,2,4] or [2,3,4] => 3

console.log(getLengthOfLIS(TEST_CASE_1));
console.log(getLengthOfLIS(TEST_CASE_2));
console.log(getLengthOfLIS(TEST_CASE_3));
console.log(getLengthOfLIS(TEST_CASE_4));
