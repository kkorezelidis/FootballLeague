var events = {
  path: '/events/:leagueId',
  container: [
    {
      id: 1,
      homeTeam: {
        id: 1,
        name: 'Ολυμπιακός'
      },
      awayTeam: {
        id: 2,
        name: 'Παναθηναικός'
      },
      homeGoals: 2,
      awayGoals: 0
    },
    {
      id: 2,
      homeTeam: {
        id: 1,
        name: 'Ολυμπιακός'
      },
      awayTeam: {
        id: 3,
        name: 'ΑΕΚ'
      },
      homeGoals: 1,
      awayGoals: 1
    },
    {
      id: 3,
      homeTeam: {
        id: 2,
        name: 'Παναθηναικός'
      },
      awayTeam: {
        id: 3,
        name: 'ΑΕΚ'
      }
    },
    {
      id: 4,
      homeTeam: {
        id: 2,
        name: 'Παναθηναικός'
      },
      awayTeam: {
        id: 1,
        name: 'Ολυμπιακός'
      }
    },
    {
      id: 5,
      homeTeam: {
        id: 3,
        name: 'ΑΕΚ'
      },
      awayTeam: {
        id: 1,
        name: 'Ολυμπιακός'
      }
    },
    {
      id: 6,
      homeTeam: {
        id: 3,
        name: 'ΑΕΚ'
      },
      awayTeam: {
        id: 2,
        name: 'Παναθηναικός'
      }
    }
  ]
  // status: function(req, res) {
  //     res.status(200)
  // res.status(500).end('Feature not found');
  // next();
  // }
};

module.exports = [events];
