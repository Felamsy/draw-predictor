function parseScore(score) {
  const [a, b] = score.split("-").map(Number);
  return { a, b };
}

function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

function poisson(lambda, k) {
  return Math.pow(lambda, k) * Math.exp(-lambda) / factorial(k);
}

function skellam(lambdaH, lambdaA) {
  let p = 0;
  for (let k = 0; k <= 5; k++) {
    p += poisson(lambdaH, k) * poisson(lambdaA, k);
  }
  return p;
}

function dixonColes(p, avgGoals) {
  return p * (1 - 0.08 * avgGoals);
}

function entropy(goals) {
  let total = goals.reduce((a, b) => a + b, 0);
  return goals.reduce((e, g) => {
    let p = g / total;
    return e - (p ? p * Math.log2(p) : 0);
  }, 0);
}

function analyzeFixture() {
  const h2h = JSON.parse(localStorage.getItem("h2hData")) || [];

  let goals = [];
  h2h.forEach(m => {
    const { a, b } = parseScore(m.score);
    goals.push(a + b);
  });

  let avgGoals = goals.reduce((a, b) => a + b, 0) / goals.length;
  let lambda = avgGoals / 2;

  let skellamP = skellam(lambda, lambda);
  let adjustedP = dixonColes(skellamP, avgGoals);
  let ent = entropy(goals);

  let confidence = adjustedP * 100 * (ent < 1.4 ? 1.15 : 0.9);
  let finalScore = confidence * adjustedP;

  const result = {
    fixture: localStorage.getItem("currentFixtureName") || "Unknown Fixture",
    drawProbability: adjustedP,
    confidence: confidence,
    score: finalScore
  };

  localStorage.setItem("lastResult", JSON.stringify(result));

  let daily = JSON.parse(localStorage.getItem("dailyResults")) || [];
  daily.push(result);
  localStorage.setItem("dailyResults", JSON.stringify(daily));
}

analyzeFixture();

function finishToday() {
  clearAllPredictionData();
  window.location.href = 'index.html';
}

function addNewFixture() {
  // remove only the current fixture data
  localStorage.removeItem('currentFixture');
  localStorage.removeItem('leagueData');
  localStorage.removeItem('cupData');
  localStorage.removeItem('h2hData');
  localStorage.removeItem('analysisResults');

  // DO NOT clear saved predictions
  window.location.href = 'index.html';
}
