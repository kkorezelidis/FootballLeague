var g = require('faker');

var leagues = {
	path: '/rankings/:leagueId',
	method: 'GET',
	template: function () {
    var rankings = [];
    for(var count = 0; count < g.random.number({'min': 5, 'max': 10}); count++){
      rankings.push({
        teamId: g.random.number({'max': 20}),
        teamName: g.name.firstName,
        matchesPlayed: g.random.number({'max': 20}),
        points: g.random.number({'max': 50}),
        wins: g.random.number({'max': 5}),
        draws: g.random.number({'max': 5}),
        loss: g.random.number({'max': 5}),
        goalsFor: g.random.number({'max': 10}),
        goalsAgainst: g.random.number({'max': 10})
      })
    }
    return rankings;
  }
	// status: function(req, res) {
	//     res.status(200)
	// res.status(500).end('Feature not found');
	// next();
	// }
};

module.exports = [leagues];
