var User = require('../models/user');

// Display list of all Users
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: User list');
}

// Display detail page for a specific User
exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
}