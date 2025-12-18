function getSortedResults() {
  let data = JSON.parse(localStorage.getItem("dailyResults")) || [];
  return data.sort((a, b) => b.score - a.score);
}

function showBest(n) {
  const data = getSortedResults();

  if (data.length < n) {
    alert(`Total fixtures not up to ${n}. You have only ${data.length}.`);
    return;
  }

  const selected = data.slice(0, n);
  let text = "";

  selected.forEach((d, i) => {
    text += `${i + 1}. ${d.fixture}\n`;
    text += `   Draw Probability: ${(d.drawProbability * 100).toFixed(1)}%\n`;
    text += `   Confidence: ${d.confidence.toFixed(1)}%\n\n`;
  });

  document.getElementById("output").textContent = text;
}

function exportTxt() {
  const text = document.getElementById("output").textContent;
  if (!text) {
    alert("No results to export");
    return;
  }

  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "best_draws.txt";
  a.click();
}

function resetDay() {
  localStorage.removeItem("dailyResults");
  alert("Daily results cleared");
  document.getElementById("output").textContent = "";
}

function addNew() {
  window.location.href = "index.html";
}
