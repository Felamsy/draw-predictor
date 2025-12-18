const container = document.getElementById("h2hMatches");

for (let i = 0; i < 10; i++) {
  container.innerHTML += `
    <div>
      <input placeholder="Score e.g 0-0" class="score">
      <select class="venue">
        <option value="home">Home Ground</option>
        <option value="away">Away Ground</option>
      </select>
    </div>
  `;
}

function saveH2H() {
  const scores = document.querySelectorAll(".score");
  const venues = document.querySelectorAll(".venue");

  let h2h = [];
  scores.forEach((s, i) => {
    if (s.value.trim() !== "") {
      h2h.push({
        score: s.value,
        venue: venues[i].value
      });
    }
  });

  if (h2h.length < 3) {
    alert("Minimum 3 H2H required");
    return;
  }

  localStorage.setItem("h2hData", JSON.stringify(h2h));
  window.location.href = "analyze.html";
}

function goBack() {
  const type = localStorage.getItem("fixtureType");
  window.location.href = type === "cup" ? "cup.html" : "league.html";
}
