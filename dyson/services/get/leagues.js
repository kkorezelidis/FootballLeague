var g = require('dyson-generators');

var leagues = {
    path: '/leagues',
    container: {
      data: [
        {id: 1, name: 'Δευτέρα'},
        {id: 2, name: 'Τρίτη'},
        {id: 3, name: 'Τετάρτη'},
        {id: 4, name: 'Αστυνομικοί'}
      ]
  }
  // status: function(req, res) {
  //     res.status(200)
    // res.status(500).end('Feature not found');
    // next();
  // }
};

module.exports = [leagues];
