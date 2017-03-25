/* GET API Help page */
module.exports.show = function (req, res) {
    res.render('index', { title: 'API Help' });
};