const jwt = require('jsonwebtoken');
const JWT_SECRET = "secretjwtstring"

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send("Please authenticate using a valid token");
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        console.log('data here',data)
        req.user = data.admin;
        next();
    } catch (error) {
        return res.status(401).send("Please authenticate using a valid token");
    }
};

module.exports = fetchuser;
