var g = require('dyson-generators');

var leagues = {
    path: '/leagues',
    container: {
      data: [
        {id: 1, name: 'Monday'},
        {id: 2, name: 'Tuesday'},
        {id: 3, name: 'Wednesday'},
        {id: 4, name: 'Thursday'},
        {id: 5, name: 'Friday'},
        {id: 6, name: 'Saturday'},
        {id: 7, name: 'Sunday'}
      ]
  }
  // status: function(req, res) {
  //     res.status(200)
    // res.status(500).end('Feature not found');;
    // next();
  // }
};

module.exports = [leagues];
