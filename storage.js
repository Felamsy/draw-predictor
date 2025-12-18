function clearAllPredictionData() {
  const keys = [
    'currentFixture',
    'fixtures',
    'leagueData',
    'cupData',
    'h2hData',
    'analysisResults',
    'savedPredictions'
  ];

  keys.forEach(key => localStorage.removeItem(key));

  console.log('✅ All prediction data cleared');
}
