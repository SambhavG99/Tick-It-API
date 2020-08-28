
module.exports.admin = function (req,res,next) {
    isAdmin = req.user.isAdmin;
    if(!isAdmin) return res.status(403).send('Access Denied');
    next();
}