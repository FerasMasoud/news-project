const { selectUsers } = require('../models/users.model');
 
exports.getUsers = (req, res, next) => {
    //selectUsers
    selectUsers()
    .then((data) => {
        res.send(data);
    })
    .catch(next);
}