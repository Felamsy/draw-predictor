function createMatchInputs(containerId, withToggle) {
  const container = document.getElementById(containerId);
  for (let i = 0; i < 5; i++) {
    container.innerHTML += `
      <div>
        <input placeholder="Score e.g 1-1" class="score">
        ${withToggle ? `
        <select class="venue">
          <option value="home">Home</option>
          <option value="away">Away</option>
        </select>` : ``}
      </div>
    `;
  }
}

createMatchInputs("homeLast5", true);
createMatchInputs("awayLast5", true);
createMatchInputs("homeAtHome", false);
createMatchInputs("awayAtAway", false);

function collect(containerId, withToggle) {
  const div = document.getElementById(containerId);
  const scores = div.querySelectorAll(".score");
  const venues = div.querySelectorAll(".venue");

  let data = [];
  scores.forEach((s, i) => {
    if (s.value.trim()) {
      data.push({
        score: s.value,
        venue: withToggle ? venues[i].value : "fixed"
      });
    }
  });
  return data;
}

function saveCup() {
  const fixtureName = document.getElementById("fixtureName").value.trim();

  if (!fixtureName) {
    alert("Please enter fixture name");
    return;
  }

  // 🔒 LOCK fixture name globally
  localStorage.setItem("currentFixtureName", fixtureName);
  localStorage.setItem("fixtureType", "cup");

  const cupData = {
    fixtureName: fixtureName,
    homeLast5: collect("homeLast5", true),
    awayLast5: collect("awayLast5", true),
    homeAtHome: collect("homeAtHome", false),
    awayAtAway: collect("awayAtAway", false)
  };

  localStorage.setItem("cupData", JSON.stringify(cupData));

  window.location.href = "h2h.html";
}

function goBack() {
  window.location.href = "index.html";
}
