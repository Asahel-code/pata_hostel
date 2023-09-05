const verifyLandLordRole = (req, res, next) => {
    if (!req.isLandLord) return res.status(403).json({ message: "You are forbidden to access!" });
    next();
}

module.exports = verifyLandLordRole