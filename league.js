function saveLeague() {
  const fixtureName = document.getElementById("fixtureName").value.trim();

  if (!fixtureName) {
    alert("Please enter fixture name");
    return;
  }

  // 🔒 LOCK fixture name globally
  localStorage.setItem("currentFixtureName", fixtureName);
  localStorage.setItem("fixtureType", "league");

  const leagueData = {
    fixtureName: fixtureName,
    leagueSize: Number(document.getElementById("leagueSize").value),
    homePosition: Number(document.getElementById("homePosition").value),
    awayPosition: Number(document.getElementById("awayPosition").value),

    homeGoalsFor: Number(document.getElementById("homeGoalsFor").value),
    homeGoalsAgainst: Number(document.getElementById("homeGoalsAgainst").value),
    awayGoalsFor: Number(document.getElementById("awayGoalsFor").value),
    awayGoalsAgainst: Number(document.getElementById("awayGoalsAgainst").value),

    homeHomeGoalsFor: Number(document.getElementById("homeHomeGoalsFor").value),
    homeHomeGoalsAgainst: Number(document.getElementById("homeHomeGoalsAgainst").value),
    awayAwayGoalsFor: Number(document.getElementById("awayAwayGoalsFor").value),
    awayAwayGoalsAgainst: Number(document.getElementById("awayAwayGoalsAgainst").value)
  };

  localStorage.setItem("leagueData", JSON.stringify(leagueData));

  window.location.href = "h2h.html";
}

function goBack() {
  window.location.href = "index.html";
}
