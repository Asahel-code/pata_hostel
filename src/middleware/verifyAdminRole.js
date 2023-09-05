
const verifyAdminRole = (req, res, next) => {
    if (!req.isAdmin) return res.status(403).json({ message: "You are forbidden to access!" });
    next();
}

module.exports = verifyAdminRole;