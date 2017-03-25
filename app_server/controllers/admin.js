/* GET admin page. */
module.exports.taskList = function (req, res) {
    res.render('index', { title: 'Admin Task List' });
};