function solution(friends, gifts) {
  const friendsLength = friends.length;
  const result = Array.from({ length: friendsLength }, () => 0);
  const indexOfFriend = {};
  for (let i = 0; i < friendsLength; i++) {
    indexOfFriend[friends[i]] = i;
  }

  const adj = Array.from({ length: friendsLength }, () =>
    Array.from({ length: friendsLength }, () => 0)
  );

  const scores = {};
  for (const friend of friends) {
    scores[friend] = {
      give: 0,
      receive: 0,
      score: 0,
    };
  }

  for (const gift of gifts) {
    const [giver, receiver] = gift.split(" ");
    adj[indexOfFriend[giver]][indexOfFriend[receiver]] += 1;
    scores[giver]["give"] += 1;
    scores[receiver]["receive"] += 1;
  }

  for (const friend of Object.keys(scores)) {
    scores[friend]["score"] =
      scores[friend]["give"] - scores[friend]["receive"];
  }

  for (let i = 0; i < friendsLength; i++) {
    for (let j = i + 1; j < friendsLength; j++) {
      if (adj[i][j] > adj[j][i]) {
        result[i] += 1;
      } else if (adj[i][j] < adj[j][i]) {
        result[j] += 1;
      } else {
        if (scores[friends[i]].score > scores[friends[j]].score) {
          result[i] += 1;
        } else if (scores[friends[i]].score < scores[friends[j]].score) {
          result[j] += 1;
        } else {
          continue;
        }
      }
    }
  }

  return Math.max(...result);
}
